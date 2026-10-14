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
      (scheduledLayer && map.hasLayer(scheduledLayer) ? '<span><i class="cm-hatch"></i>Fifth Schedule area</span>' : "");
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

  fetch(el.getAttribute("data-src"))
    .then(function (r) { return r.json(); })
    .then(function (json) {
      data = json;
      legend.addTo(map);
      buildScheduled();
      render();
      fit();
      /* The page fades sections in, so the map may first be measured at the wrong size */
      if (window.ResizeObserver) new ResizeObserver(fit).observe(el);
      else window.addEventListener("resize", fit);
    })
    .catch(function () { el.innerHTML = '<p class="note" style="padding:20px">The map data could not be loaded.</p>'; });
})();
