/* Ways of Seeing: Counter-Mapping story map.
   One page, three Leaflet maps, each driven by narrative cards as they scroll past.
   Map 1 (From Above): Sentinel-2 / Esri imagery, free zoom: the "god trick", on purpose.
   Map 2 (The Camera): films at district scale over muted imagery, coloured by theme or funder.
   Map 3 (Overlaps):   no tiles; state figures, mining, movements, and films on paper.
   Data: assets/data/jharkhand-districts.geojson, jharkhand-extraction.json, films-map.json
   (films-map.json is built by _tools/build-films-map.py from the catalog and film-places.json).
   Maps 2 and 3 never go finer than a district. */
(function () {
  "use strict";
  if (!window.L) return;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var narrow = function () { return window.matchMedia && window.matchMedia("(max-width: 860px)").matches; };
  var JH_BOUNDS = L.latLngBounds([21.95, 83.3], [25.35, 87.95]);
  var INDIA = L.latLngBounds([6.5, 68.0], [35.6, 97.4]);
  var PAPER = "#efe6d4";

  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var WORDS = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  var TENS = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
  function words(n) { if (n < 20) return WORDS[n]; var t = Math.floor(n / 10), u = n % 10; return TENS[t] + (u ? "-" + WORDS[u] : ""); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- data ---------- */
  var cache = {};
  function getJSON(url) { if (!cache[url]) cache[url] = fetch(url).then(function (r) { if (!r.ok) throw new Error(url); return r.json(); }); return cache[url]; }
  function loadAll() {
    return Promise.all([getJSON("assets/data/jharkhand-districts.geojson"), getJSON("assets/data/jharkhand-extraction.json"), getJSON("assets/data/films-map.json")])
      .then(function (r) { return { geo: r[0], ext: r[1], fm: r[2] }; });
  }
  var centers = null;
  function districtCenters(geo) {
    if (centers) return centers;
    centers = {};
    L.geoJSON(geo).eachLayer(function (l) { centers[l.feature.properties.name] = l.getBounds().getCenter(); });
    return centers;
  }
  function boundsOf(geo, names) {
    var b = null;
    L.geoJSON(geo, { filter: function (f) { return names.indexOf(f.properties.name) >= 0; } }).eachLayer(function (l) { b = b ? b.extend(l.getBounds()) : L.latLngBounds(l.getBounds().getSouthWest(), l.getBounds().getNorthEast()); });
    return b;
  }

  /* ---------- shared map chrome ---------- */
  function move(map, target, zoomOrOpts) {
    if (target instanceof L.LatLngBounds) {
      var o = L.extend({ padding: [24, 24], maxZoom: map.getMaxZoom() }, zoomOrOpts || {});
      var leg = map.getContainer().parentNode.querySelector(".sm-legend");
      if (leg && !narrow()) { delete o.padding; o.paddingTopLeft = [Math.min(240, leg.offsetWidth + 24), 20]; o.paddingBottomRight = [20, 20]; }
      if (narrow()) o.paddingBottomRight = [10, 10];
      if (reduce) map.fitBounds(target, o); else map.flyToBounds(target, L.extend({ duration: 1.4 }, o));
    } else {
      if (reduce) map.setView(target, zoomOrOpts); else map.flyTo(target, zoomOrOpts, { duration: 1.6 });
    }
  }
  function infoPanel(media) {
    var box = media.querySelector(".sm-info");
    return {
      show: function (html) {
        box.innerHTML = '<button type="button" class="sm-info-close" aria-label="Close">&times;</button>' + html;
        box.hidden = false;
        box.querySelector(".sm-info-close").addEventListener("click", function () { box.hidden = true; });
      },
      hide: function () { box.hidden = true; }
    };
  }
  function setInteractive(map, on) {
    ["dragging", "touchZoom", "doubleClickZoom", "boxZoom", "keyboard"].forEach(function (h) { if (map[h]) on ? map[h].enable() : map[h].disable(); });
  }
  function wireExpand(media, map, onToggle) {
    var key = media.querySelector("[data-key]");
    if (key) key.addEventListener("click", function () { var on = !media.classList.contains("show-key"); media.classList.toggle("show-key", on); key.setAttribute("aria-pressed", String(on)); });
    var btn = media.querySelector("[data-full]");
    if (!btn) return;
    function set(full) {
      media.classList.toggle("is-full", full);
      btn.textContent = full ? "Close full screen" : "Expand map";
      document.body.style.overflow = full ? "hidden" : "";
      setTimeout(function () { map.invalidateSize(); }, 60);
      if (onToggle) onToggle(full);
    }
    btn.addEventListener("click", function () { set(!media.classList.contains("is-full")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && media.classList.contains("is-full")) set(false); });
  }

  /* ---------- story engine ---------- */
  function story(section, build) {
    var media = section.querySelector(".sm-media");
    var steps = Array.prototype.slice.call(section.querySelectorAll(".sm-step"));
    var ctl = null, pending = null, started = false;
    function activate(stepEl) {
      steps.forEach(function (s) { s.classList.toggle("is-active", s === stepEl); });
      var name = stepEl.getAttribute("data-step");
      if (ctl) ctl.step(name); else pending = name;
    }
    function start() {
      if (started) return; started = true;
      build(section, media).then(function (c) {
        ctl = c;
        if (window.ResizeObserver) new ResizeObserver(function () { c.map.invalidateSize(); }).observe(media);
        c.step(pending || steps[0].getAttribute("data-step"));
      }).catch(function (err) {
        media.querySelector(".sm-map").innerHTML = '<p style="padding:20px;color:#ece5d6;font-family:sans-serif">The map could not be loaded.</p>';
        if (window.console) console.warn(err);
      });
    }
    if (!("IntersectionObserver" in window)) { start(); activate(steps[0]); return; }
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) start(); }); }, { rootMargin: "100% 0px" }).observe(section);
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) activate(e.target); });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    steps.forEach(function (s) { io.observe(s); });
  }

  /* =====================================================================
     MAP 1: From Above
     ===================================================================== */
  function buildAbove(section, media) {
    return loadAll().then(function (d) {
      var el = media.querySelector(".sm-map");
      var map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25, minZoom: 3, maxZoom: 18, worldCopyJump: false, attributionControl: true });
      map.attributionControl.setPrefix(false);
      var s2 = L.tileLayer("https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2024_3857/default/g/{z}/{y}/{x}.jpg", {
        maxNativeZoom: 14, maxZoom: 18,
        attribution: 'Sentinel-2 cloudless 2024 by <a href="https://s2maps.eu" target="_blank" rel="noopener">EOX IT Services GmbH</a> (modified Copernicus Sentinel data 2024)'
      }).addTo(map);
      var hi = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 19, attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community"
      });
      L.control.layers({ "Sentinel-2 (10 m, 2024)": s2, "High-resolution imagery (Esri)": hi }, null, { position: "topleft", collapsed: true }).addTo(map);
      map.fitBounds(INDIA);
      var hl = [];
      var districts = L.geoJSON(d.geo, {
        style: function (f) { var on = hl.indexOf(f.properties.name) >= 0; return { color: on ? "#ffd166" : "#f3ede0", weight: on ? 3 : 1.2, opacity: 0.95, fill: true, fillColor: "#ffd166", fillOpacity: on ? 0.12 : 0.01 }; },
        onEachFeature: function (f, layer) {
          layer.bindTooltip(f.properties.name.replace(/ \(.*\)/, ""), { sticky: true, className: "sm-tip-small" });
          layer.on("mouseover", function () { layer.setStyle({ weight: 2.6, color: "#ffd166" }); });
          layer.on("mouseout", function () { districts.resetStyle(layer); });
        }
      });
      function highlight(names) { hl = names; districts.setStyle(districts.options.style); }
      var mobileLocked = narrow();
      setInteractive(map, !mobileLocked);
      wireExpand(media, map, function (full) { if (narrow()) setInteractive(map, full); });
      return {
        map: map,
        step: function (name) {
          if (name === "india") { map.removeLayer(districts); highlight([]); move(map, INDIA); }
          if (name === "jharkhand") { districts.addTo(map); highlight([]); move(map, JH_BOUNDS); }
          if (name === "plateau") { districts.addTo(map); highlight(["Lohardaga", "Gumla", "Latehar"]); move(map, boundsOf(d.geo, ["Lohardaga", "Gumla", "Latehar"])); }
          if (name === "jharia") { districts.addTo(map); highlight(["Dhanbad"]); move(map, L.latLng(23.76, 86.40), 12.5); }
          if (name === "explore") { districts.addTo(map); highlight([]); move(map, JH_BOUNDS); }
        }
      };
    });
  }

  /* =====================================================================
     MAP 2: Where the Camera Went
     ===================================================================== */
  var DECADES = ["1990s", "2000s", "2010s", "2020s"];
  function decadeOf(f) { return f.year ? String(f.year).slice(0, 3) + "0s" : null; }
  function thumbHTML(f, cls) { return f.thumb ? '<img src="' + esc(f.thumb) + '" alt="" loading="lazy"' + (cls ? ' class="' + cls + '"' : "") + ">" : ""; }

  function filmInfoHTML(fm, f) {
    var th = fm.themes[f.theme], fu = fm.funders[f.funder];
    var where = f.districts.length ? f.districts.map(function (n) { return n.replace(/ \(.*\)/, ""); }).join(", ") + " district" + (f.districts.length > 1 ? "s" : "") : "";
    var beyond = f.points && f.points.length ? f.points.map(function (p) { return p.name; }).join("; ") : (f.beyond || "");
    var inst = f.institution ? fm.institutions.filter(function (i) { return i.key === f.institution; })[0] : null;
    var links = [];
    if (f.url) links.push('<a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.urlLabel || "Watch") + "</a>");
    if (f.catalog) links.push('<a href="' + esc(f.catalog) + '">Catalog record</a>');
    return thumbHTML(f) +
      "<h4>" + esc(f.title) + (f.year ? " (" + esc(f.year) + ")" : "") + "</h4>" +
      '<span class="sm-meta">' + esc(f.creator || fm.groups[f.group]) + "</span>" +
      '<span class="sm-tag" style="background:' + th.color + '">' + esc(th.label) + "</span>" +
      '<span class="sm-tag" style="background:' + fu.color + '">' + esc(fu.label) + "</span>" +
      "<p>" + esc(f.description || "") + "</p>" +
      (where ? '<span class="sm-meta">Placed at: ' + esc(where) + (f.provisional ? ' <span class="sm-prov">provisional</span>' : "") + "</span>" : "") +
      (beyond ? '<span class="sm-meta">Beyond Jharkhand: ' + esc(beyond) + "</span>" : "") +
      (inst ? '<span class="sm-meta">Funded or commissioned by: ' + esc(inst.name) + "</span>" : "") +
      (!where && !beyond ? '<span class="sm-meta">Not placed on the map: no district named in the film&rsquo;s record yet.</span>' : "") +
      (links.length ? '<div class="sm-links">' + links.join("") + "</div>" : "");
  }

  function buildCamera(section, media) {
    return loadAll().then(function (d) {
      var fm = d.fm, C = districtCenters(d.geo);
      var el = media.querySelector(".sm-map");
      media.classList.add("sm-muted");
      var map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25, minZoom: 4, maxZoom: 9, attributionControl: true, maxBounds: L.latLngBounds([0, 60], [40, 105]) });
      map.attributionControl.setPrefix(false);
      L.tileLayer("https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2024_3857/default/g/{z}/{y}/{x}.jpg", {
        maxZoom: 9, attribution: 'Sentinel-2 cloudless 2024 by <a href="https://s2maps.eu" target="_blank" rel="noopener">EOX</a>; districts: DataMeet'
      }).addTo(map);
      map.fitBounds(L.latLngBounds([10.5, 76], [28.5, 96]));
      L.geoJSON(d.geo, { style: { color: "#f3ede0", weight: 0.8, opacity: 0.55, fill: false }, interactive: false }).addTo(map);
      var info = infoPanel(media);
      var legend = media.querySelector("[data-legend]");

      var state = { mode: "theme", themes: null, group: null, decade: null, arcs: false, inst: false, flows: false };
      var marks = [];   // {f, base: LatLng, m}
      var filmsLayer = L.layerGroup().addTo(map), arcLayer = L.layerGroup(), instLayer = L.layerGroup(), flowLayer = L.layerGroup();

      fm.films.forEach(function (f) {
        var spots = [];
        if (f.districts.length && C[f.districts[0]]) spots.push(C[f.districts[0]]);
        (f.points || []).forEach(function (p) { spots.push(L.latLng(p.lat, p.lng)); });
        spots.forEach(function (ll) {
          var m = L.circleMarker(ll, { radius: 7, weight: 2, fillOpacity: 0.95, className: "sm-film-pt" });
          var blurb = f.description || ""; if (blurb.length > 120) blurb = blurb.slice(0, 115).replace(/\s+\S*$/, "") + "…";
          m.bindTooltip(thumbHTML(f) + "<b>" + esc(f.title) + (f.year ? " (" + esc(f.year) + ")" : "") + "</b>" +
            '<span class="sm-meta">' + esc(fm.groups[f.group]) + " &middot; " + esc(fm.themes[f.theme].label) + "</span>" + esc(blurb),
            { className: "sm-tip", direction: "auto", opacity: 1 });
          m.on("click", function (e) { L.DomEvent.stop(e); info.show(filmInfoHTML(fm, f)); });
          m.addTo(filmsLayer);
          marks.push({ f: f, base: ll, m: m });
        });
      });

      /* spread points that share a place into a small ring, in screen pixels, at every zoom */
      function layout() {
        var groups = {};
        marks.forEach(function (k) { var key = k.base.lat.toFixed(3) + "," + k.base.lng.toFixed(3); (groups[key] = groups[key] || []).push(k); });
        Object.keys(groups).forEach(function (key) {
          var g = groups[key], n = g.length;
          var p0 = map.latLngToLayerPoint(g[0].base);
          g.forEach(function (k, i) {
            if (n === 1) { k.m.setLatLng(k.base); return; }
            var r = 9 + 3 * n, a = (2 * Math.PI * i) / n - Math.PI / 2;
            k.m.setLatLng(map.layerPointToLatLng(L.point(p0.x + r * Math.cos(a), p0.y + r * Math.sin(a))));
          });
        });
      }
      map.on("zoomend", layout);

      function visible(f) {
        if (state.themes && state.themes.indexOf(f.theme) < 0) return false;
        if (state.group && f.group !== state.group) return false;
        if (state.decade && decadeOf(f) !== state.decade) return false;
        return true;
      }
      function paint() {
        marks.forEach(function (k) {
          var f = k.f, col = state.mode === "funder" ? fm.funders[f.funder].color : fm.themes[f.theme].color, on = visible(f);
          k.m.setStyle({ color: on ? (f.provisional ? col : "#f3ede0") : "#f3ede0", fillColor: f.provisional ? "#f3ede0" : col,
            dashArray: f.provisional ? "3 3" : null, opacity: on ? 1 : 0.15, fillOpacity: on ? 0.95 : 0.12, weight: f.provisional ? 2.4 : 1.6 });
          if (on) k.m.bringToFront();
        });
        if (state.arcs) arcLayer.addTo(map); else map.removeLayer(arcLayer);
        if (state.inst) instLayer.addTo(map); else map.removeLayer(instLayer);
        if (state.flows) flowLayer.addTo(map); else map.removeLayer(flowLayer);
        drawLegend();
      }
      function drawLegend() {
        var dict = state.mode === "funder" ? fm.funders : fm.themes, rows = [];
        Object.keys(dict).forEach(function (k) { rows.push('<span><i class="dot" style="background:' + dict[k].color + '"></i>' + esc(dict[k].label) + "</span>"); });
        rows.push('<span><i class="hollow"></i>District still to be confirmed</span>');
        if (state.inst) rows.push('<span><i style="background:#262422"></i>Funder or venue (click)</span><span class="sm-meta">Off the map: Adivasi-Koordination, Germany; UCLA Library, Los Angeles</span>');
        if (state.arcs) rows.push('<span><i style="background:none;border:0;border-top:2px dashed #7fd1c7;height:0"></i>Migration</span>');
        legend.innerHTML = "<strong>" + (state.mode === "funder" ? "Who paid for the camera" : "What the film is about") + "</strong>" + rows.join("");
      }

      /* migration arcs from Ranchi */
      var origin = C["Ranchi"];
      function arc(a, b) {
        var pts = [], mx = (a.lat + b.lat) / 2, my = (a.lng + b.lng) / 2, dx = b.lng - a.lng, dy = b.lat - a.lat;
        var cx = mx - dx * 0.18, cy = my + dy * 0.18;
        cx = mx + (-dy) * 0.25; cy = my + dx * 0.25;
        for (var t = 0; t <= 1.0001; t += 0.05) {
          var u = 1 - t;
          pts.push([u * u * a.lat + 2 * u * t * cx + t * t * b.lat, u * u * a.lng + 2 * u * t * cy + t * t * b.lng]);
        }
        return pts;
      }
      fm.films.filter(function (f) { return f.theme === "migration"; }).forEach(function (f) {
        (f.points || []).forEach(function (p) {
          L.polyline(arc(origin, L.latLng(p.lat, p.lng)), { color: "#7fd1c7", weight: 2, dashArray: "6 6", opacity: 0.9, interactive: false }).addTo(arcLayer);
        });
      });

      /* institutions: squares; funding flows to the films they paid for */
      var instMarks = [];
      function layoutInst() {
        var groups = {};
        instMarks.forEach(function (k) { var key = Math.round(k.base.lat * 2) + "," + Math.round(k.base.lng * 2); (groups[key] = groups[key] || []).push(k); });
        Object.keys(groups).forEach(function (key) {
          var g = groups[key], n = g.length, p0 = map.latLngToLayerPoint(g[0].base);
          g.forEach(function (k, i) {
            if (n === 1) { k.m.setLatLng(k.base); return; }
            k.m.setLatLng(map.layerPointToLatLng(L.point(p0.x + (i - (n - 1) / 2) * 20, p0.y)));
          });
        });
      }
      map.on("zoomend", layoutInst);
      fm.institutions.forEach(function (inst) {
        var col = fm.funders[inst.kind] ? fm.funders[inst.kind].color : "#262422";
        var funded = fm.films.filter(function (f) { return f.institution === inst.key; });
        var mk = L.marker([inst.lat, inst.lng], { icon: L.divIcon({ className: "", html: '<div class="sm-inst" style="background:' + col + '"></div>', iconSize: [14, 14], iconAnchor: [7, 7] }), keyboard: true, title: inst.name });
        mk.bindTooltip("<b>" + esc(inst.name) + "</b>" + esc(inst.city), { className: "sm-tip", direction: "top" });
        mk.on("click", function (e) {
          L.DomEvent.stop(e);
          info.show("<h4>" + esc(inst.name) + '</h4><span class="sm-meta">' + esc(inst.city) + "</span><p>" + esc(inst.role) + "</p>" +
            (funded.length ? '<span class="sm-meta">Films in this collection:</span><ul class="sm-shelf">' + funded.map(function (f) { return '<li><button type="button" class="sm-linkbtn" data-film="' + esc(f.id) + '"><em>' + esc(f.title) + "</em></button></li>"; }).join("") + "</ul>" : "") +
            (inst.catalog ? '<div class="sm-links"><a href="catalog.html#' + esc(inst.catalog) + '">Catalog record</a></div>' : ""));
        });
        mk.addTo(instLayer);
        instMarks.push({ base: L.latLng(inst.lat, inst.lng), m: mk });
        funded.forEach(function (f) {
          var to = f.districts.length && C[f.districts[0]] ? C[f.districts[0]] : (f.points && f.points[0] ? L.latLng(f.points[0].lat, f.points[0].lng) : null);
          if (to) L.polyline([[inst.lat, inst.lng], to], { color: col, weight: 1.6, opacity: 0.75, dashArray: "2 5", interactive: false }).addTo(flowLayer);
        });
      });
      media.addEventListener("click", function (e) {
        var b = e.target.closest && e.target.closest("[data-film]");
        if (!b) return;
        var f = fm.films.filter(function (x) { return x.id === b.getAttribute("data-film"); })[0];
        if (f) info.show(filmInfoHTML(fm, f));
      });

      /* shelf of unplaced films (in the "memory" card) */
      var unplaced = fm.films.filter(function (f) { return !f.districts.length && !(f.points && f.points.length); });
      var shelf = section.querySelector('[data-shelf="unplaced"]');
      if (shelf) shelf.innerHTML = unplaced.map(function (f) { return '<li><button type="button" class="sm-linkbtn" data-film-open="' + esc(f.id) + '"><em>' + esc(f.title) + "</em></button>" + (f.year ? " (" + esc(f.year) + ")" : "") + ' <span class="sm-meta">' + esc(fm.themes[f.theme].label) + "</span></li>"; }).join("");
      section.addEventListener("click", function (e) {
        var b = e.target.closest && e.target.closest("[data-film-open]");
        if (!b) return;
        var f = fm.films.filter(function (x) { return x.id === b.getAttribute("data-film-open"); })[0];
        if (f) info.show(filmInfoHTML(fm, f));
      });

      /* explore filters */
      var fbox = section.querySelector('[data-filters="camera"]');
      if (fbox) {
        var h = '<span class="sm-verb">Colour by</span><button type="button" class="sm-btn" data-mode="theme" aria-pressed="true">Theme</button><button type="button" class="sm-btn" data-mode="funder" aria-pressed="false">Funder</button>';
        h += '<span class="sm-verb">Theme</span>' + Object.keys(fm.themes).map(function (k) { return '<button type="button" class="sm-btn" data-theme="' + k + '" aria-pressed="false">' + esc(fm.themes[k].label) + "</button>"; }).join("");
        h += '<span class="sm-verb">Maker</span>' + Object.keys(fm.groups).map(function (k) { return '<button type="button" class="sm-btn" data-group="' + k + '" aria-pressed="false">' + esc(fm.groups[k]) + "</button>"; }).join("");
        h += '<span class="sm-verb">Decade</span>' + DECADES.map(function (k) { return '<button type="button" class="sm-btn" data-decade="' + k + '" aria-pressed="false">' + k + "</button>"; }).join("");
        h += '<span class="sm-verb"></span><button type="button" class="sm-btn" data-reset>Show everything</button>';
        fbox.innerHTML = h;
        fbox.addEventListener("click", function (e) {
          var b = e.target.closest("button"); if (!b) return;
          if (b.hasAttribute("data-mode")) { state.mode = b.getAttribute("data-mode"); state.inst = state.flows = state.mode === "funder"; }
          if (b.hasAttribute("data-theme")) { var t = b.getAttribute("data-theme"); var cur = state.themes || []; var i = cur.indexOf(t); if (i >= 0) cur.splice(i, 1); else cur.push(t); state.themes = cur.length ? cur : null; state.arcs = !!(state.themes && state.themes.indexOf("migration") >= 0); }
          if (b.hasAttribute("data-group")) { var g = b.getAttribute("data-group"); state.group = state.group === g ? null : g; }
          if (b.hasAttribute("data-decade")) { var dd = b.getAttribute("data-decade"); state.decade = state.decade === dd ? null : dd; }
          if (b.hasAttribute("data-reset")) { state.themes = state.group = state.decade = null; state.arcs = false; }
          syncFilters(); paint();
        });
      }
      function syncFilters() {
        if (!fbox) return;
        fbox.querySelectorAll("[data-mode]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === state.mode)); });
        fbox.querySelectorAll("[data-theme]").forEach(function (b) { b.setAttribute("aria-pressed", String(!!(state.themes && state.themes.indexOf(b.getAttribute("data-theme")) >= 0))); });
        fbox.querySelectorAll("[data-group]").forEach(function (b) { b.setAttribute("aria-pressed", String(state.group === b.getAttribute("data-group"))); });
        fbox.querySelectorAll("[data-decade]").forEach(function (b) { b.setAttribute("aria-pressed", String(state.decade === b.getAttribute("data-decade"))); });
      }

      function fitTo(extra) {
        var b = L.latLngBounds(JH_BOUNDS.getSouthWest(), JH_BOUNDS.getNorthEast());
        (extra || []).forEach(function (ll) { b.extend(ll); });
        move(map, b, { padding: [30, 30] });
      }
      var P = {}; fm.films.forEach(function (f) { (f.points || []).forEach(function (p) { P[p.key] = L.latLng(p.lat, p.lng); }); });

      setInteractive(map, !narrow());
      wireExpand(media, map, function (full) { if (narrow()) setInteractive(map, full); });
      layout(); layoutInst(); paint();

      return {
        map: map,
        step: function (name) {
          info.hide();
          if (name === "all") { L.extend(state, { mode: "theme", themes: null, group: null, decade: null, arcs: true, inst: false, flows: false }); move(map, L.latLngBounds([10.5, 76], [28.5, 96]), { padding: [16, 16] }); }
          if (name === "extraction") { L.extend(state, { mode: "theme", themes: ["extraction"], arcs: false, inst: false, flows: false }); fitTo([P.rourkela]); }
          if (name === "displacement") { L.extend(state, { mode: "theme", themes: ["displacement", "selfrule"], arcs: false, inst: false, flows: false }); fitTo([P.rayagada, P.jagdalpur]); }
          if (name === "memory") { L.extend(state, { mode: "theme", themes: ["memory"], arcs: false, inst: false, flows: false }); fitTo([]); }
          if (name === "migration") { L.extend(state, { mode: "theme", themes: ["migration"], arcs: true, inst: false, flows: false }); fitTo([P.jalpaiguri, P.dibrugarh, P.andaman]); }
          if (name === "funders") { L.extend(state, { mode: "funder", themes: null, arcs: false, inst: true, flows: true }); move(map, L.latLngBounds([12, 72], [29, 89]), { padding: [16, 16] }); }
          if (name === "explore") { L.extend(state, { themes: null, group: null, decade: null, arcs: false }); state.inst = state.flows = state.mode === "funder"; move(map, L.latLngBounds([10.5, 72], [29, 96]), { padding: [16, 16] }); }
          syncFilters(); paint();
        }
      };
    });
  }

  /* full film list under Map 2, grouped by theme */
  function filmList(fm) {
    var box = document.getElementById("sm-films-all");
    if (!box) return;
    var html = "<h3>Every film on this map</h3>";
    Object.keys(fm.themes).forEach(function (k) {
      var fs = fm.films.filter(function (f) { return f.theme === k; });
      if (!fs.length) return;
      html += "<details><summary>" + esc(fm.themes[k].label) + " (" + fs.length + ")</summary>" + fs.map(function (f) {
        var links = [];
        if (f.url) links.push('<a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.urlLabel || "Watch") + "</a>");
        if (f.catalog) links.push('<a href="' + esc(f.catalog) + '">Catalog record</a>');
        return '<div class="sm-filmrow">' + (f.thumb ? '<img src="' + esc(f.thumb) + '" alt="" loading="lazy">' : '<span class="sm-noimg"></span>') +
          "<div><b>" + esc(f.title) + "</b>" + (f.year ? " (" + esc(f.year) + ")" : "") + '<span class="sm-meta">' + esc(f.creator || fm.groups[f.group]) + " &middot; " + esc(fm.funders[f.funder].label) + "</span>" +
          "<p>" + esc(f.description || "") + "</p>" + (links.length ? '<div class="sm-links">' + links.join("") + "</div>" : "") + "</div></div>";
      }).join("") + "</details>";
    });
    box.innerHTML = html;
  }

  /* =====================================================================
     MAP 3: Where It All Overlaps
     ===================================================================== */
  var BASES = {
    st: { label: "Scheduled Tribe population (% of district, Census 2011)", key: "st_pct", stops: [10, 20, 30, 40, 50, 60], colors: ["#efe6d4", "#e4c9a6", "#d6a57a", "#c37f53", "#a4502f", "#7a3520", "#4e1f12"] },
    forest: { label: "Forest cover (% of area, ISFR 2023)", key: "forest_pct", stops: [10, 20, 30, 40, 50], colors: ["#efe9d8", "#d3dcb5", "#a9c08a", "#7a9f63", "#4f7a45", "#2f5530"] }
  };
  function shade(v, cfg) { if (v == null || v === "") return "#cfc3ab"; for (var i = 0; i < cfg.stops.length; i++) if (v < cfg.stops[i]) return cfg.colors[i]; return cfg.colors[cfg.colors.length - 1]; }

  function buildOverlap(section, media) {
    return loadAll().then(function (d) {
      var fm = d.fm, ext = d.ext, C = districtCenters(d.geo);
      var el = media.querySelector(".sm-map");
      var map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25, minZoom: 6, maxZoom: 9, attributionControl: false, maxBounds: JH_BOUNDS.pad(0.6) });
      map.fitBounds(JH_BOUNDS, { padding: [10, 10] });
      var info = infoPanel(media), legend = media.querySelector("[data-legend]");
      var S = { base: "none", schedule: true, extract: false, resist: false, films: false, overlap: false };

      /* overlap: Scheduled Area + mining reported + a movement or a film */
      var moveBy = {}, filmBy = {};
      fm.movements.forEach(function (m) { m.districts.forEach(function (n) { (moveBy[n] = moveBy[n] || []).push(m); }); });
      fm.films.forEach(function (f) { f.districts.forEach(function (n) { (filmBy[n] = filmBy[n] || []).push(f); }); });
      var overlap = d.geo.features.filter(function (f) {
        var p = f.properties, x = ext.districts[p.name];
        return (p.scheduled === "full" || p.scheduled === "partial") && x && x.mined.length && (moveBy[p.name] || filmBy[p.name]);
      }).map(function (f) { return f.properties.name; });
      var ol = section.querySelector("[data-overlap-list]");
      if (ol) ol.textContent = cap(words(overlap.length)) + " districts: " + overlap.map(function (n) { return n.replace(/ \(.*\)/, ""); }).join(", ") + ".";

      function districtInfo(p) {
        var x = ext.districts[p.name] || { mined: [], coalfields: [], occur: [] };
        var sched = { full: "Wholly a Scheduled Area", partial: "Partly a Scheduled Area", none: "Not a Scheduled Area" }[p.scheduled] || "";
        var mv = moveBy[p.name] || [], fs = filmBy[p.name] || [];
        return "<h4>" + esc(p.name) + "</h4>" +
          '<span class="sm-meta">Scheduled Tribe share ' + esc(p.st_pct) + "% &middot; forest cover " + esc(p.forest_pct) + "% &middot; " + esc(sched) + "</span>" +
          "<p>" + (x.mined.length ? "<b>Mined:</b> " + esc(x.mined.join(", ")) : "No major mineral reported mined.") + (x.coalfields.length ? "<br><b>Coalfields:</b> " + esc(x.coalfields.join(", ")) : "") + "</p>" +
          (mv.length ? "<p><b>Movements:</b> " + mv.map(function (m) { return esc(m.name) + " (" + esc(m.when) + ")"; }).join("; ") + "</p>" : "") +
          (fs.length ? '<span class="sm-meta">Films placed here:</span><ul class="sm-shelf">' + fs.map(function (f) { return "<li><em>" + esc(f.title) + "</em>" + (f.year ? " (" + esc(f.year) + ")" : "") + (f.catalog ? ' &middot; <a href="' + esc(f.catalog) + '">record</a>' : "") + "</li>"; }).join("") + "</ul>" : "") +
          (overlap.indexOf(p.name) >= 0 ? '<span class="sm-tag" style="background:#a4502f">Overlap</span>' : "");
      }

      var baseLayer = L.geoJSON(d.geo, {
        style: function (f) { return { fillColor: S.base === "none" ? PAPER : shade(f.properties[BASES[S.base].key], BASES[S.base]), fillOpacity: 0.9, color: "#262422", weight: 0.7, opacity: 0.6 }; },
        onEachFeature: function (f, layer) {
          layer.bindTooltip(f.properties.name.replace(/ \(.*\)/, ""), { sticky: true, className: "sm-tip-small" });
          layer.on("click", function () { info.show(districtInfo(f.properties)); });
        }
      }).addTo(map);
      var schedLayer = L.geoJSON(d.geo, {
        filter: function (f) { return f.properties.scheduled === "full" || f.properties.scheduled === "partial"; },
        style: function (f) { return { fill: false, color: "#262422", weight: f.properties.scheduled === "full" ? 2.8 : 1.8, dashArray: f.properties.scheduled === "full" ? null : "6 5", opacity: 0.95 }; },
        interactive: false
      });
      var extractLayer = L.layerGroup();
      L.geoJSON(d.geo, {
        filter: function (f) { var x = ext.districts[f.properties.name]; return x && x.mined.length; },
        style: { fillColor: "#262422", fillOpacity: 0.28, color: "#262422", weight: 0, className: "sm-hatch" }, interactive: false
      }).addTo(extractLayer);
      Object.keys(ext.districts).forEach(function (n) {
        var x = ext.districts[n]; if (!x.mined.length || !C[n]) return;
        L.marker([C[n].lat + 0.08, C[n].lng], { icon: L.divIcon({ className: "sm-label", html: esc(x.mined.map(function (m) { return ext.symbols[m] || m; }).join(" ")), iconSize: null }), interactive: false }).addTo(extractLayer);
      });
      var resistLayer = L.layerGroup();
      fm.movements.forEach(function (m) {
        m.districts.forEach(function (n, i) {
          if (!C[n]) return;
          var mk = L.marker([C[n].lat - 0.05, C[n].lng - 0.12 + 0.07 * (i % 2)], { icon: L.divIcon({ className: "", html: '<div class="sm-dia' + (m.provisional ? " prov" : "") + '"></div>', iconSize: [13, 13], iconAnchor: [7, 7] }), title: m.name });
          mk.bindTooltip("<b>" + esc(m.name) + "</b>" + esc(m.when), { className: "sm-tip", direction: "top" });
          mk.on("click", function (e) {
            L.DomEvent.stop(e);
            var fs = (m.films || []).map(function (id) { return fm.films.filter(function (f) { return f.id === id; })[0]; }).filter(Boolean);
            info.show("<h4>" + esc(m.name) + '</h4><span class="sm-meta">' + esc(m.when) + " &middot; " + esc(m.districts.map(function (x) { return x.replace(/ \(.*\)/, ""); }).join(", ")) + (m.provisional ? ' &middot; <span class="sm-prov">provisional</span>' : "") + "</span><p>" + esc(m.what) + "</p>" +
              (m.source ? '<span class="sm-meta">Source: ' + esc(m.source) + "</span>" : "") +
              (fs.length ? '<span class="sm-meta">Films that witness it:</span><ul class="sm-shelf">' + fs.map(function (f) { return "<li><em>" + esc(f.title) + "</em>" + (f.year ? " (" + esc(f.year) + ")" : "") + (f.url ? ' &middot; <a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.urlLabel || "watch") + "</a>" : "") + "</li>"; }).join("") + "</ul>" : ""));
          });
          mk.addTo(resistLayer);
        });
      });
      var filmLayer = L.layerGroup();
      var byD = {};
      fm.films.forEach(function (f) { if (f.districts.length) (byD[f.districts[0]] = byD[f.districts[0]] || []).push(f); });
      Object.keys(byD).forEach(function (n) {
        if (!C[n]) return;
        byD[n].forEach(function (f, i) {
          var a = (2 * Math.PI * i) / byD[n].length, r = byD[n].length > 1 ? 0.07 : 0;
          var col = fm.themes[f.theme].color;
          var m = L.circleMarker([C[n].lat + 0.04 + r * Math.sin(a), C[n].lng + 0.1 + r * Math.cos(a)], { radius: 5, color: f.provisional ? col : "#f3ede0", weight: f.provisional ? 2 : 1.2, fillColor: f.provisional ? "#f3ede0" : col, fillOpacity: 1, dashArray: f.provisional ? "2 2" : null });
          m.bindTooltip("<b>" + esc(f.title) + "</b>" + (f.year ? esc(f.year) : ""), { className: "sm-tip", direction: "top" });
          m.on("click", function (e) { L.DomEvent.stop(e); info.show(filmInfoHTML(fm, f)); });
          m.addTo(filmLayer);
        });
      });
      var overlapLayer = L.geoJSON(d.geo, {
        filter: function (f) { return overlap.indexOf(f.properties.name) >= 0; },
        style: { fill: false, color: "#d4552b", weight: 4.5, opacity: 1 }, interactive: false
      });

      function apply() {
        baseLayer.setStyle(baseLayer.options.style);
        [[schedLayer, S.schedule], [extractLayer, S.extract], [overlapLayer, S.overlap], [resistLayer, S.resist], [filmLayer, S.films]].forEach(function (p) { if (p[1]) p[0].addTo(map); else map.removeLayer(p[0]); });
        if (S.overlap) overlapLayer.bringToFront();
        var rows = [];
        if (S.base !== "none") { var cfg = BASES[S.base]; rows.push("<strong>" + esc(cfg.label) + "</strong>"); cfg.colors.forEach(function (c, i) { var lo = i ? cfg.stops[i - 1] : 0, hi = cfg.stops[i]; rows.push('<span><i style="background:' + c + '"></i>' + (hi === undefined ? lo + "%+" : lo + "&ndash;" + hi + "%") + "</span>"); }); }
        else rows.push("<strong>Jharkhand, 24 districts</strong>");
        if (S.schedule) rows.push('<span><i style="background:none;border:2.5px solid #262422"></i>Wholly Scheduled Area</span><span><i style="background:none;border:2px dashed #262422"></i>Partly Scheduled Area</span>');
        if (S.extract) rows.push('<span><i style="background:rgba(38,36,34,0.35)"></i>Mining reported (IBM 2022)</span>');
        if (S.resist) rows.push('<span><i class="dia" style="background:#8a2f2f"></i>Movement the films witness</span>');
        if (S.films) rows.push('<span><i class="dot" style="background:#a4502f"></i>Film (colour = theme)</span>');
        if (S.overlap) rows.push('<span><i style="background:none;border:3px solid #d4552b"></i>All three overlap</span>');
        legend.innerHTML = rows.join("");
        section.querySelectorAll("[data-base]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-base") === S.base)); });
        section.querySelectorAll("[data-layer]").forEach(function (b) { b.setAttribute("aria-pressed", String(!!S[b.getAttribute("data-layer")])); });
      }
      section.querySelectorAll("[data-base]").forEach(function (b) { b.addEventListener("click", function () { S.base = b.getAttribute("data-base"); apply(); }); });
      section.querySelectorAll("[data-layer]").forEach(function (b) { b.addEventListener("click", function () { var k = b.getAttribute("data-layer"); S[k] = !S[k]; apply(); }); });

      setInteractive(map, !narrow());
      wireExpand(media, map, function (full) { if (narrow()) setInteractive(map, full); });
      apply();
      var STEPS = {
        schedule: { base: "none", schedule: true, extract: false, resist: false, films: false, overlap: false },
        count: { base: "st", schedule: true, extract: false, resist: false, films: false, overlap: false },
        extract: { base: "st", schedule: true, extract: true, resist: false, films: false, overlap: false },
        resist: { base: "st", schedule: true, extract: true, resist: true, films: false, overlap: false },
        films: { base: "st", schedule: true, extract: true, resist: true, films: true, overlap: false },
        overlapnow: { base: "none", schedule: true, extract: true, resist: true, films: true, overlap: true },
        explore: { base: "st", schedule: true, extract: true, resist: true, films: true, overlap: true }
      };
      return {
        map: map,
        step: function (name) { info.hide(); if (STEPS[name]) { L.extend(S, STEPS[name]); apply(); } move(map, JH_BOUNDS, { padding: [10, 10] }); }
      };
    });
  }

  /* ---------- page-level wiring ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    /* chapter bar: highlight the chapter in view */
    var links = Array.prototype.slice.call(document.querySelectorAll(".sm-chapters a"));
    var secs = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            var on = a.getAttribute("href") === "#" + e.target.id;
            a.classList.toggle("active", on);
            if (on && a.scrollIntoView && narrow()) a.scrollIntoView({ block: "nearest", inline: "center" });
          });
        });
      }, { rootMargin: "-35% 0px -60% 0px" });
      secs.forEach(function (s) { spy.observe(s); });
    }

    /* screening strip pause */
    var strip = document.querySelector(".cm-strip"), sbtn = document.querySelector("[data-strip-pause]");
    if (strip && sbtn) {
      var paused = reduce;
      var applyStrip = function () { strip.classList.toggle("is-paused", paused); sbtn.textContent = paused ? "Play" : "Pause"; sbtn.setAttribute("aria-pressed", String(paused)); };
      sbtn.addEventListener("click", function () { paused = !paused; applyStrip(); });
      applyStrip();
    }

    /* counts in the prose come from the data, not from the page */
    getJSON("assets/data/films-map.json").then(function (fm) {
      var n = { total: fm.films.length, placed: fm.films.filter(function (f) { return f.districts.length; }).length, outside: fm.films.filter(function (f) { return f.points && f.points.length; }).length };
      document.querySelectorAll("[data-sm-count]").forEach(function (s) {
        var v = n[s.getAttribute("data-sm-count")]; if (v == null) return;
        var w = words(v);
        s.textContent = (s.textContent.charAt(0) === s.textContent.charAt(0).toUpperCase()) ? cap(w) : w;
      });
      filmList(fm);
    });

    var builders = { above: buildAbove, camera: buildCamera, overlap: buildOverlap };
    document.querySelectorAll(".sm-sidecar[data-story]").forEach(function (sec) {
      var b = builders[sec.getAttribute("data-story")];
      if (b) story(sec, b);
    });
  });
})();
