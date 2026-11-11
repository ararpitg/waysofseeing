/* Montage diagram: switch its layers on and off */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-montage]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var g = document.querySelector('.cm-montage [data-layer="' + btn.getAttribute("data-montage") + '"]');
      if (!g) return;
      var on = btn.getAttribute("aria-pressed") !== "true";
      g.style.display = on ? "" : "none";
      btn.setAttribute("aria-pressed", String(on));
    });
  });
});

/* Counter-Mapping page: Jharkhand by district, from open aggregate data.
   Reads assets/data/jharkhand-districts.geojson, whose features carry:
   name, st_pct (Census 2011), forest_pct (ISFR), scheduled ("full" | "partial" | "none").
   District-level only, by design: no village, site, or person is located on this map. */
(function () {
  "use strict";
  var el = document.getElementById("cm-map");
  if (!el || !window.L) return;

  var LAYERS = {
    st: {
      label: "Scheduled Tribe population (% of district, Census 2011)",
      value: function (p) { return p.st_pct; },
      stops: [10, 20, 30, 40, 50, 60],
      colors: ["#efe6d4", "#e4c9a6", "#d6a57a", "#c37f53", "#a4502f", "#7a3520", "#4e1f12"]
    },
    forest: {
      label: "Forest cover (% of geographical area, ISFR)",
      value: function (p) { return p.forest_pct; },
      stops: [10, 20, 30, 40, 50],
      colors: ["#efe9d8", "#d3dcb5", "#a9c08a", "#7a9f63", "#4f7a45", "#2f5530"]
    }
  };

  /* No basemap tiles: the districts sit on the page itself, and no third-party tile server is called. */
  var map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25, attributionControl: false });

  var current = "st", geo, data, scheduledLayer;
  var narrow = window.matchMedia && window.matchMedia("(max-width: 640px)").matches;
  var legend = L.control({ position: narrow ? "topright" : "bottomright" });
  var info = document.getElementById("cm-info");

  function colorFor(v, cfg) {
    if (v === null || v === undefined || v === "") return "#cfc3ab";
    for (var i = 0; i < cfg.stops.length; i++) if (v < cfg.stops[i]) return cfg.colors[i];
    return cfg.colors[cfg.colors.length - 1];
  }

  function style(f) {
    var cfg = LAYERS[current];
    return { fillColor: colorFor(cfg.value(f.properties), cfg), fillOpacity: 0.82,
             color: "#262422", weight: 0.8, opacity: 0.7 };
  }

  function fmt(v) { return (v === null || v === undefined || v === "") ? "not available" : (Math.round(v * 10) / 10) + "%"; }

  function describe(p) {
    var sched = { full: "Fully a Scheduled Area (Fifth Schedule)", partial: "Partly a Scheduled Area (Fifth Schedule)",
                  none: "Not a Scheduled Area" }[p.scheduled] || "Scheduled Area status not available";
    return "<strong>" + p.name + "</strong><br>Scheduled Tribe population: " + fmt(p.st_pct) +
      "<br>Forest cover: " + fmt(p.forest_pct) + "<br>" + sched +
      (p.scheduled_note ? " (" + p.scheduled_note + ")" : "");
  }

  legend.onAdd = function () {
    this._div = L.DomUtil.create("div", "cm-legend");
    this.update();
    return this._div;
  };
  legend.update = function () {
    if (!this._div) return;
    var cfg = LAYERS[current], rows = [];
    for (var i = 0; i < cfg.colors.length; i++) {
      var lo = i === 0 ? 0 : cfg.stops[i - 1], hi = cfg.stops[i];
      rows.push('<span><i style="background:' + cfg.colors[i] + '"></i>' + (hi === undefined ? lo + "%+" : lo + "–" + hi + "%") + "</span>");
    }
    this._div.innerHTML = "<strong>" + cfg.label + "</strong>" + rows.join("") +
      (scheduledLayer && map.hasLayer(scheduledLayer) ? '<span><i class="cm-hatch"></i>Fifth Schedule area</span>' : "") + regionLegend();
  };

  function render() {
    if (geo) map.removeLayer(geo);
    geo = L.geoJSON(data, {
      style: style,
      onEachFeature: function (f, layer) {
        layer.bindTooltip(f.properties.name, { sticky: true, className: "cm-tip" });
        layer.on("click", function () { if (info) info.innerHTML = describe(f.properties); });
        layer.on("mouseover", function () { layer.setStyle({ weight: 2.2, color: "#a4502f" }); layer.bringToFront(); });
        layer.on("mouseout", function () { geo.resetStyle(layer); });
      }
    }).addTo(map);
    if (scheduledLayer && map.hasLayer(scheduledLayer)) scheduledLayer.bringToFront();
    if (regionLayer && regionsOn) regionLayer.bringToFront();
    legend.update();
  }

  function fit() {
    if (!geo) return;
    map.invalidateSize();
    /* On phones the legend is a strip along the top, so leave room above the state */
    map.fitBounds(geo.getBounds(), narrow ? { paddingTopLeft: [8, 120], paddingBottomRight: [8, 8] } : { padding: [12, 12] });
  }

  function buildScheduled() {
    scheduledLayer = L.geoJSON(data, {
      filter: function (f) { return f.properties.scheduled === "full" || f.properties.scheduled === "partial"; },
      style: function (f) {
        return { fill: false, color: "#262422", weight: f.properties.scheduled === "full" ? 2.6 : 1.6,
                 dashArray: f.properties.scheduled === "full" ? null : "5 5", opacity: 0.95 };
      },
      interactive: false
    });
  }

  document.querySelectorAll("[data-cm-layer]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-cm-layer");
      if (key === "films") return; /* handled by the documentary-regions toggle below */
      if (key === "scheduled") {
        var on = !map.hasLayer(scheduledLayer);
        if (on) scheduledLayer.addTo(map); else map.removeLayer(scheduledLayer);
        btn.setAttribute("aria-pressed", String(on));
        legend.update();
        return;
      }
      current = key;
      document.querySelectorAll('[data-cm-layer="st"], [data-cm-layer="forest"]').forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render();
    });
  });


  /* Documentary regions: where Akhra's films have gone, at district level.
     Reads assets/data/akhra-films.json, generated from the Akhra film dataset by _tools/build-films-json.py.
     A region is a set of districts named in the films themselves; nothing finer is located. Regions whose
     districts are still to be confirmed against the films are drawn dashed and labelled provisional. */
  /* Kept away from the choropleth's rusts and greens so a region never reads as a high value. */
  var REGION_COLORS = { R1: "#2f5f8a", R2: "#1f7a7a", R3: "#6a4f7a", R4: "#4a5e6a", R5: "#8a2f5f", R6: "#7a6a2f", R7: "#556b2f" };
  var films = null, regionLayer = null, regionsOn = false, byDistrict = {};
  var regionList = document.getElementById("cm-regions");

  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function filmLine(f) {
    var t = "<em>" + esc(f.title) + "</em>" + (f.english ? " (" + esc(f.english) + ")" : "") + (f.year ? ", " + esc(f.year) : "");
    if (f.url) t = '<a href="' + esc(f.url) + '">' + t + "</a>";
    var meta = [f.phase, f.districts && f.districts.length ? f.districts.join(", ") : null, f.provisional ? "provisional" : null].filter(Boolean).join(" · ");
    return "<li>" + t + (meta ? ' <span class="cm-film-meta">' + esc(meta) + "</span>" : "") +
      (f.right ? '<span class="cm-film-right">' + esc(f.right) + "</span>" : "") + "</li>";
  }

  function regionFilms(g) { return films.films.filter(function (f) { return f.region === g.code; }); }

  function showRegion(g) {
    if (!info) return;
    var where = g.districts.length ? g.districts.join(", ") : "beyond the frame of this map";
    info.innerHTML = '<strong style="color:' + REGION_COLORS[g.code] + '">' + esc(g.code + " · " + g.name) + "</strong>" +
      (g.provisional ? ' <span class="cm-prov">provisional</span>' : "") + "<br>" + esc(g.maps) + "<br>" +
      "<span class=\"cm-film-meta\">District level: " + esc(where) + ".</span>" +
      '<ul class="cm-films">' + regionFilms(g).map(filmLine).join("") + "</ul>";
  }

  function buildRegionLayer() {
    byDistrict = {};
    films.regions.forEach(function (g) {
      g.districts.forEach(function (d) { (byDistrict[d] = byDistrict[d] || []).push(g); });
    });
    regionLayer = L.geoJSON(data, {
      filter: function (f) { return !!byDistrict[f.properties.name]; },
      style: function (f) {
        var g = byDistrict[f.properties.name][0], c = REGION_COLORS[g.code];
        return { fillColor: c, fillOpacity: 0.42, color: c, weight: 2.4, opacity: 1, dashArray: g.provisional ? "6 5" : null };
      },
      onEachFeature: function (f, layer) {
        var gs = byDistrict[f.properties.name];
        layer.bindTooltip(gs.map(function (g) { return g.name; }).join(" / ") + " · " + f.properties.name, { sticky: true, className: "cm-tip" });
        layer.on("click", function (e) { L.DomEvent.stop(e); showRegion(gs[0]); });
        layer.on("keypress", function (e) { if (e.originalEvent.key === "Enter") showRegion(gs[0]); });
      }
    });
  }

  function regionLegend() {
    if (!regionsOn || !films) return "";
    return films.regions.filter(function (g) { return g.districts.length; }).map(function (g) {
      return '<span><i style="background:' + REGION_COLORS[g.code] + ';border:2px ' + (g.provisional ? "dashed" : "solid") + " " + REGION_COLORS[g.code] + '"></i>' + esc(g.name) + (g.provisional ? " (provisional)" : "") + "</span>";
    }).join("") + '<span class="cm-legend-note">Dashed: districts still to be confirmed from the films.</span>';
  }

  function renderRegionList() {
    if (!regionList || !films) return;
    var onMap = films.regions.filter(function (g) { return g.districts.length; });
    var beyond = films.regions.filter(function (g) { return !g.districts.length; });
    var unplaced = films.films.filter(function (f) { return !f.region; });
    function card(g) {
      return '<article class="cm-region" style="--rc:' + REGION_COLORS[g.code] + '">' +
        "<h4>" + esc(g.code) + " · " + esc(g.name) + (g.provisional ? ' <span class="cm-prov">provisional</span>' : "") + "</h4>" +
        "<p>" + esc(g.maps) + "</p>" +
        '<p class="cm-film-meta">' + esc(g.districts.length ? "Districts: " + g.districts.join(", ") : g.districts_note) + " · " + esc(g.status) + "</p>" +
        (g.districts.length ? '<button type="button" class="cm-btn cm-btn-small" data-cm-region="' + esc(g.code) + '">Show on map</button>' : "") +
        '<ul class="cm-films">' + regionFilms(g).map(filmLine).join("") + "</ul></article>";
    }
    regionList.innerHTML =
      "<h3>On the map</h3><div class=\"cm-region-grid\">" + onMap.map(card).join("") + "</div>" +
      "<h3>Beyond the frame</h3><p class=\"cm-film-meta\">Regions the Jharkhand map cannot hold, or whose districts are not yet confirmed. They are listed, not drawn.</p>" +
      '<div class="cm-region-grid">' + beyond.map(card).join("") + "</div>" +
      (unplaced.length ? '<h3>Not yet placed</h3><ul class="cm-films">' + unplaced.map(filmLine).join("") + "</ul>" : "") +
      '<p class="cm-sources-inline">Regions and films: Akhra film dataset v1 (' + esc(films.generated) + "), built from the dissertation filmography and the archive’s catalog records. " + esc(films.note) + "</p>";
    regionList.hidden = false;
    regionList.querySelectorAll("[data-cm-region]").forEach(function (b) {
      b.addEventListener("click", function () {
        var g = films.regions.filter(function (x) { return x.code === b.getAttribute("data-cm-region"); })[0];
        if (!regionsOn) toggleRegions(true);
        showRegion(g);
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  function toggleRegions(on) {
    regionsOn = on;
    var btn = document.querySelector('[data-cm-layer="films"]');
    if (btn) btn.setAttribute("aria-pressed", String(on));
    if (!regionLayer) return;
    if (on) { regionLayer.addTo(map); regionLayer.bringToFront(); if (info) info.innerHTML = "Click a region for its films."; }
    else { map.removeLayer(regionLayer); if (info) info.innerHTML = "Click a district."; }
    legend.update();
  }

  var filmsBtn = document.querySelector('[data-cm-layer="films"]');
  if (filmsBtn) filmsBtn.addEventListener("click", function () { toggleRegions(!regionsOn); });

  function loadFilms() {
    var src = el.getAttribute("data-films");
    if (!src) return;
    fetch(src).then(function (r) { return r.json(); }).then(function (json) {
      films = json;
      buildRegionLayer();
      renderRegionList();
      if (filmsBtn) filmsBtn.disabled = false;
    }).catch(function () { if (filmsBtn) filmsBtn.disabled = true; });
  }

  fetch(el.getAttribute("data-src"))
    .then(function (r) { return r.json(); })
    .then(function (json) {
      data = json;
      legend.addTo(map);
      buildScheduled();
      render();
      fit();
      loadFilms();
      /* The page fades sections in, so the map may first be measured at the wrong size */
      if (window.ResizeObserver) new ResizeObserver(fit).observe(el);
      else window.addEventListener("resize", fit);
    })
    .catch(function () { el.innerHTML = '<p class="note" style="padding:20px">The map data could not be loaded.</p>'; });
})();
