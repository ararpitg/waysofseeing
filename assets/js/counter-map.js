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

/* Screening strip: pause button and reduced-motion respect (the motion itself is CSS) */
document.addEventListener("DOMContentLoaded", function () {
  var strip = document.querySelector(".cm-strip");
  var btn = document.querySelector("[data-strip-pause]");
  if (!strip || !btn) return;
  var paused = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function apply() { strip.classList.toggle("is-paused", paused); btn.textContent = paused ? "Play" : "Pause"; btn.setAttribute("aria-pressed", String(paused)); }
  btn.addEventListener("click", function () { paused = !paused; apply(); });
  apply();
});

/* Counter-Mapping page: Jharkhand by district, in four layers.
   Count   assets/data/jharkhand-districts.geojson  (Census 2011, ISFR 2023, Fifth Schedule)
   Extract assets/data/jharkhand-extraction.json     (IBM Indian Minerals Yearbook 2022, by district)
   Resist  assets/data/films-map.json  movements      (as the films witness them, by district)
   Film    assets/data/films-map.json  films          (catalog records placed at district level)
   District level only, by design: no village, site, or person is located on this map.
   Build films-map.json with _tools/build-films-map.py after editing the catalog or film-places.json. */
(function () {
  "use strict";
  var el = document.getElementById("cm-map");
  if (!el || !window.L) return;

  var LAYERS = {
    st: { label: "Scheduled Tribe population (% of district, Census 2011)", value: function (p) { return p.st_pct; },
          stops: [10, 20, 30, 40, 50, 60], colors: ["#efe6d4", "#e4c9a6", "#d6a57a", "#c37f53", "#a4502f", "#7a3520", "#4e1f12"] },
    forest: { label: "Forest cover (% of geographical area, ISFR)", value: function (p) { return p.forest_pct; },
              stops: [10, 20, 30, 40, 50], colors: ["#efe9d8", "#d3dcb5", "#a9c08a", "#7a9f63", "#4f7a45", "#2f5530"] }
  };
  var GROUP_COLORS = { akhra: "#2f5f8a", kritika: "#6a4f7a", curator: "#2f7a5a", other: "#5c5346" };
  var MOVE_COLOR = "#8a2f2f", EXTRACT_COLOR = "#262422";

  /* No basemap tiles: the districts sit on the page itself, and no third-party tile server is called. */
  var map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25, attributionControl: false });
  var narrow = window.matchMedia && window.matchMedia("(max-width: 640px)").matches;
  var legend = L.control({ position: narrow ? "topright" : "bottomright" });
  var info = document.getElementById("cm-info");
  var listEl = document.getElementById("cm-film-list");

  var current = "st", geo, data, scheduledLayer, centers = {};
  var extract = null, extractLayer = null, extractOn = false;
  var fm = null, moveLayer = null, moveOn = false, filmLayer = null, filmsOn = false;

  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fmt(v) { return (v === null || v === undefined || v === "") ? "not available" : (Math.round(v * 10) / 10) + "%"; }
  function colorFor(v, cfg) {
    if (v === null || v === undefined || v === "") return "#cfc3ab";
    for (var i = 0; i < cfg.stops.length; i++) if (v < cfg.stops[i]) return cfg.colors[i];
    return cfg.colors[cfg.colors.length - 1];
  }
  function style(f) {
    var cfg = LAYERS[current];
    return { fillColor: colorFor(cfg.value(f.properties), cfg), fillOpacity: 0.82, color: "#262422", weight: 0.8, opacity: 0.7 };
  }
  function setInfo(html) { if (info) info.innerHTML = html; }

  /* ---------- Count ---------- */
  function describe(p) {
    var sched = { full: "Fully a Scheduled Area (Fifth Schedule)", partial: "Partly a Scheduled Area (Fifth Schedule)", none: "Not a Scheduled Area" }[p.scheduled] || "Scheduled Area status not available";
    var x = extract && extract.districts[p.name];
    var ex = x ? "<br>" + (x.mined.length ? "Mined: " + x.mined.join(", ") : "No major mineral reported mined") + (x.coalfields.length ? " · Coalfields: " + x.coalfields.join(", ") : "") : "";
    var fs = fm ? fm.films.filter(function (f) { return f.districts.indexOf(p.name) >= 0; }) : [];
    var fl = fs.length ? '<ul class="cm-films">' + fs.map(filmLine).join("") + "</ul>" : "";
    return "<strong>" + esc(p.name) + "</strong><br>Scheduled Tribe population: " + fmt(p.st_pct) + "<br>Forest cover: " + fmt(p.forest_pct) + "<br>" + sched +
      (p.scheduled_note ? " (" + esc(p.scheduled_note) + ")" : "") + ex + fl;
  }

  legend.onAdd = function () { this._div = L.DomUtil.create("div", "cm-legend"); this.update(); return this._div; };
  legend.update = function () {
    if (!this._div) return;
    var cfg = LAYERS[current], rows = [];
    for (var i = 0; i < cfg.colors.length; i++) {
      var lo = i === 0 ? 0 : cfg.stops[i - 1], hi = cfg.stops[i];
      rows.push('<span><i style="background:' + cfg.colors[i] + '"></i>' + (hi === undefined ? lo + "%+" : lo + "–" + hi + "%") + "</span>");
    }
    var extra = "";
    if (scheduledLayer && map.hasLayer(scheduledLayer)) extra += '<span><i class="cm-hatch"></i>Fifth Schedule area</span>';
    if (extractOn) extra += '<span><i class="cm-lg-extract"></i>Mining reported (IBM 2022)</span><span><i class="cm-lg-occur"></i>Minerals occur, not reported mined</span>';
    if (moveOn) extra += '<span><i class="cm-lg-move"></i>Movement the films witness</span>';
    if (filmsOn && fm) {
      Object.keys(fm.groups).forEach(function (g) { extra += '<span><i class="cm-lg-film" style="background:' + GROUP_COLORS[g] + '"></i>' + esc(fm.groups[g]) + "</span>"; });
      extra += '<span><i class="cm-lg-film cm-lg-prov"></i>Hollow: district still to be confirmed</span>';
    }
    this._div.innerHTML = "<strong>" + cfg.label + "</strong>" + rows.join("") + extra;
  };

  function render() {
    if (geo) map.removeLayer(geo);
    geo = L.geoJSON(data, {
      style: style,
      onEachFeature: function (f, layer) {
        centers[f.properties.name] = layer.getBounds().getCenter();
        layer.bindTooltip(f.properties.name, { sticky: true, className: "cm-tip" });
        layer.on("click", function () { setInfo(describe(f.properties)); });
        layer.on("mouseover", function () { layer.setStyle({ weight: 2.2, color: "#a4502f" }); layer.bringToFront(); liftOverlays(); });
        layer.on("mouseout", function () { geo.resetStyle(layer); });
      }
    }).addTo(map);
    liftOverlays();
    legend.update();
  }
  function lift(layer) { if (!layer) return; if (layer.bringToFront) layer.bringToFront(); else if (layer.eachLayer) layer.eachLayer(function (l) { if (l.bringToFront) l.bringToFront(); }); }
  function liftOverlays() {
    if (scheduledLayer && map.hasLayer(scheduledLayer)) lift(scheduledLayer);
    if (extractLayer && extractOn) lift(extractLayer);
    if (moveLayer && moveOn) lift(moveLayer);
    if (filmLayer && filmsOn) lift(filmLayer);
  }
  function fit() {
    if (!geo) return;
    map.invalidateSize();
    map.fitBounds(geo.getBounds(), narrow ? { paddingTopLeft: [8, 150], paddingBottomRight: [8, 8] } : { padding: [12, 12] });
  }
  function buildScheduled() {
    scheduledLayer = L.geoJSON(data, {
      filter: function (f) { return f.properties.scheduled === "full" || f.properties.scheduled === "partial"; },
      style: function (f) { return { fill: false, color: "#262422", weight: f.properties.scheduled === "full" ? 2.6 : 1.6, dashArray: f.properties.scheduled === "full" ? null : "5 5", opacity: 0.95 }; },
      interactive: false
    });
  }

  /* ---------- Extract ---------- */
  function symbolsFor(d) { return d.mined.map(function (m) { return extract.symbols[m] || m; }).join(" "); }
  function describeExtract(name) {
    var d = extract.districts[name];
    if (!d) return "<strong>" + esc(name) + "</strong><br>No entry.";
    return "<strong>" + esc(name) + "</strong><br>" +
      (d.mined.length ? "<b>Mined:</b> " + esc(d.mined.join(", ")) : "<b>No major mineral reported mined.</b>") +
      (d.coalfields.length ? "<br><b>Coalfields:</b> " + esc(d.coalfields.join(", ")) : "") +
      (d.occur.length ? "<br><b>Occurs:</b> " + esc(d.occur.join(", ")) : "") +
      (d.note ? '<br><span class="cm-film-meta">' + esc(d.note) + "</span>" : "") +
      '<br><span class="cm-film-meta">Indian Bureau of Mines, Indian Minerals Yearbook 2022, State Reviews: Jharkhand.</span>';
  }
  function buildExtract() {
    var group = L.layerGroup();
    L.geoJSON(data, {
      filter: function (f) { var d = extract.districts[f.properties.name]; return d && (d.mined.length || d.occur.length); },
      style: function (f) {
        var d = extract.districts[f.properties.name];
        return d.mined.length ? { fillColor: EXTRACT_COLOR, fillOpacity: 0.22, color: EXTRACT_COLOR, weight: 2, opacity: 0.9, className: "cm-extract" }
                              : { fill: false, color: EXTRACT_COLOR, weight: 1.4, dashArray: "2 4", opacity: 0.8 };
      },
      onEachFeature: function (f, layer) {
        var d = extract.districts[f.properties.name];
        layer.bindTooltip(f.properties.name + (d.mined.length ? " · " + d.mined.join(", ") : " · occurrence only"), { sticky: true, className: "cm-tip" });
        layer.on("click", function (e) { L.DomEvent.stop(e); setInfo(describeExtract(f.properties.name)); });
      }
    }).addTo(group);
    Object.keys(extract.districts).forEach(function (name) {
      var d = extract.districts[name], c = centers[name];
      if (!c || !d.mined.length) return;
      L.marker([c.lat + 0.07, c.lng], { icon: L.divIcon({ className: "cm-mineral", html: esc(symbolsFor(d)), iconSize: null }), interactive: false }).addTo(group);
    });
    extractLayer = group;
  }

  /* ---------- Film ---------- */
  function filmLink(f) {
    var a = [];
    if (f.url) a.push('<a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.urlLabel || "Watch") + "</a>");
    if (f.catalog) a.push('<a href="' + esc(f.catalog) + '">Catalog record</a>');
    return a.join(" · ");
  }
  function filmLine(f) {
    var meta = [f.year, fm.groups[f.group], f.districts.length ? f.districts.join(", ") : null, f.provisional ? "provisional" : null].filter(Boolean).join(" · ");
    return '<li><button type="button" class="cm-linkbtn" data-cm-film="' + esc(f.id) + '"><em>' + esc(f.title) + "</em></button>" +
      ' <span class="cm-film-meta">' + esc(meta) + "</span></li>";
  }
  function filmCard(f, full, extra) {
    var d = f.description || "";
    if (!full && d.length > 170) d = d.slice(0, 165).replace(/\s+\S*$/, "") + "…";
    return '<div class="cm-card" style="--rc:' + GROUP_COLORS[f.group] + '">' +
      (f.thumb ? '<img src="' + esc(f.thumb) + '" alt="" loading="lazy">' : "") +
      '<div class="cm-card-body"><strong>' + esc(f.title) + "</strong>" + (f.year ? " (" + esc(f.year) + ")" : "") +
      '<span class="cm-film-meta">' + esc(f.creator || fm.groups[f.group]) + "</span>" +
      "<p>" + esc(d) + "</p>" +
      '<span class="cm-film-meta">' + esc(f.districts.length ? "District level: " + f.districts.join(", ") + (f.provisional ? " (provisional)" : "") : (f.beyond ? "Beyond the frame: " + f.beyond : "Not yet placed")) +
      (f.beyond && f.districts.length ? " · also " + esc(f.beyond) : "") + "</span>" +
      (full ? '<span class="cm-card-links">' + filmLink(f) + "</span>" : "") + (extra || "") + "</div></div>";
  }
  function showFilm(f) {
    setInfo(filmCard(f, true));
    if (f.districts.length && filmsOn && centers[f.districts[0]]) map.panTo(centers[f.districts[0]], { animate: true });
  }
  function buildFilms() {
    var group = L.layerGroup(), byDistrict = {};
    fm.films.forEach(function (f) { if (f.districts.length) (byDistrict[f.districts[0]] = byDistrict[f.districts[0]] || []).push(f); });
    Object.keys(byDistrict).forEach(function (name) {
      var c = centers[name]; if (!c) return;
      var fs = byDistrict[name], n = fs.length;
      fs.forEach(function (f, i) {
        var ang = (2 * Math.PI * i) / n, r = n > 1 ? 0.055 : 0;
        var ll = [c.lat + r * Math.sin(ang) - 0.02, c.lng + r * Math.cos(ang)];
        var col = GROUP_COLORS[f.group];
        var m = L.circleMarker(ll, { radius: 8, color: col, weight: 2.2, fillColor: f.provisional ? "#f3ede0" : col, fillOpacity: 0.95, dashArray: f.provisional ? "3 3" : null, className: "cm-film-pt" });
        var blurb = f.description || "";
        if (blurb.length > 110) blurb = blurb.slice(0, 105).replace(/\s+\S*$/, "") + "…";
        m.bindTooltip('<span class="cm-tip-title">' + esc(f.title) + (f.year ? " (" + esc(f.year) + ")" : "") + "</span><span class=\"cm-film-meta\">" + esc(fm.groups[f.group]) + "</span>" + esc(blurb),
                      { className: "cm-tip cm-tip-card", direction: "auto", offset: [10, 0], opacity: 1 });
        m.on("mouseover", function () { setInfo(filmCard(f, true)); });
        m.on("click", function (e) { L.DomEvent.stop(e); showFilm(f); });
        m.on("keypress", function (e) { if (e.originalEvent.key === "Enter") showFilm(f); });
        m.addTo(group);
      });
    });
    filmLayer = group;
  }

  /* ---------- Resist ---------- */
  function showMove(mv) {
    var films = (mv.films || []).map(function (id) { return fm.films.filter(function (f) { return f.id === id; })[0]; }).filter(Boolean);
    setInfo('<strong style="color:' + MOVE_COLOR + '">' + esc(mv.name) + "</strong> · " + esc(mv.when) + (mv.provisional ? ' <span class="cm-prov">provisional</span>' : "") +
      "<br>" + esc(mv.what) + '<br><span class="cm-film-meta">District level: ' + esc(mv.districts.length ? mv.districts.join(", ") : "statewide") + (mv.source ? " · Source: " + esc(mv.source) : "") + "</span>" +
      (films.length ? '<ul class="cm-films">' + films.map(filmLine).join("") + "</ul>" : ""));
  }
  function buildMoves() {
    var group = L.layerGroup();
    fm.movements.forEach(function (mv) {
      mv.districts.forEach(function (name, i) {
        var c = centers[name]; if (!c) return;
        var m = L.marker([c.lat + 0.045, c.lng - 0.06 - i * 0.0], { icon: L.divIcon({ className: "cm-move" + (mv.provisional ? " cm-move-prov" : ""), html: "", iconSize: [14, 14] }) });
        m.bindTooltip(mv.name + " · " + mv.when + " · " + name, { className: "cm-tip", direction: "top" });
        m.on("click", function (e) { L.DomEvent.stop(e); showMove(mv); });
        m.addTo(group);
      });
    });
    moveLayer = group;
  }

  /* ---------- Film list under the map ---------- */
  function renderList() {
    if (!listEl || !fm) return;
    function section(title, items, note) {
      if (!items.length) return "";
      return "<h3>" + esc(title) + "</h3>" + (note ? '<p class="cm-film-meta">' + esc(note) + "</p>" : "") + '<div class="cm-card-grid">' + items.map(function (f) { return filmCard(f, true, '<button type="button" class="cm-btn cm-btn-small" data-cm-film="' + esc(f.id) + '">' + (f.districts.length ? "Show on map" : "Open above") + "</button>"); }).join("") + "</div>";
    }
    var html = "";
    Object.keys(fm.groups).forEach(function (g) {
      html += section(fm.groups[g], fm.films.filter(function (f) { return f.group === g && f.districts.length; }));
    });
    html += section("Beyond the frame", fm.films.filter(function (f) { return !f.districts.length && f.beyond; }), "Films whose ground lies outside Jharkhand, or whose people the Jharkhand map cannot hold. Listed, not drawn.");
    html += section("Not yet placed", fm.films.filter(function (f) { return !f.districts.length && !f.beyond; }), "Films that have not yet been read closely enough to name a district.");
    listEl.innerHTML = html;
    listEl.hidden = false;
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-cm-film]");
    if (!b || !fm) return;
    var f = fm.films.filter(function (x) { return x.id === b.getAttribute("data-cm-film"); })[0];
    if (!f) return;
    if (f.districts.length && !filmsOn) toggle("films", true);
    showFilm(f);
    if (b.classList.contains("cm-btn")) el.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  /* ---------- Controls ---------- */
  function btnFor(key) { return document.querySelector('[data-cm-layer="' + key + '"]'); }
  function toggle(key, on) {
    var layer = { scheduled: scheduledLayer, extract: extractLayer, resist: moveLayer, films: filmLayer }[key];
    if (!layer) return;
    if (on === undefined) on = !map.hasLayer(layer);
    if (on) layer.addTo(map); else map.removeLayer(layer);
    if (key === "extract") extractOn = on; if (key === "resist") moveOn = on; if (key === "films") filmsOn = on;
    var b = btnFor(key); if (b) b.setAttribute("aria-pressed", String(on));
    liftOverlays(); legend.update();
    if (on && key === "films") setInfo("Hover a film point for its blurb; click it for the record and where to watch.");
    if (on && key === "resist") setInfo("Click a red square for the movement and the films that witness it.");
    if (on && key === "extract") setInfo("Click a shaded district for what is mined there, and what merely occurs.");
  }
  document.querySelectorAll("[data-cm-layer]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-cm-layer");
      if (key === "st" || key === "forest") {
        current = key;
        document.querySelectorAll('[data-cm-layer="st"], [data-cm-layer="forest"]').forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        render(); return;
      }
      toggle(key);
    });
  });
  var presetBtn = document.querySelector("[data-cm-preset]");
  if (presetBtn) presetBtn.addEventListener("click", function () { toggle("extract", true); toggle("resist", true); toggle("films", true); });

  /* ---------- Load ---------- */
  fetch(el.getAttribute("data-src")).then(function (r) { return r.json(); }).then(function (json) {
    data = json;
    legend.addTo(map);
    buildScheduled();
    render();
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(el); else window.addEventListener("resize", fit);
    return Promise.all([
      fetch(el.getAttribute("data-extract")).then(function (r) { return r.json(); }),
      fetch(el.getAttribute("data-films")).then(function (r) { return r.json(); })
    ]);
  }).then(function (res) {
    extract = res[0]; fm = res[1];
    buildExtract(); buildFilms(); buildMoves(); renderList();
    ["extract", "resist", "films"].forEach(function (k) { var b = btnFor(k); if (b) b.disabled = false; });
    if (presetBtn) presetBtn.disabled = false;
  }).catch(function (err) {
    if (!data) el.innerHTML = '<p class="note" style="padding:20px">The map data could not be loaded.</p>';
    else if (window.console) console.warn("Counter-map overlays failed", err);
  });
})();
