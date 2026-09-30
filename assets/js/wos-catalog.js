// Ways of Seeing — catalog renderer. Reads window.WOS_RECORDS (assets/js/wos-data.js).
// Faceted filtering (type / path / region), full-text search, expandable metadata
// records, copy-citation, and deep links (#WOS-012 opens that record).
(function () {
  "use strict";

  var records = window.WOS_RECORDS || [];

  // Citations mark titles with *asterisks*: shown as italics, copied as plain text.
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function citeHtml(s) { return esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>"); }

  /* ---------- Readings: annotated bibliography, grouped by strand ---------- */
  var readingsRoot = document.getElementById("wos-readings");
  if (readingsRoot && records.length) {
    var strands = [];
    var byStrand = {};
    records.forEach(function (r) {
      if (r.type !== "text" || r.curator || !r.strand) return;
      if (!byStrand[r.strand]) { byStrand[r.strand] = []; strands.push(r.strand); }
      byStrand[r.strand].push(r);
    });
    var order = window.WOS_STRANDS || strands;
    order.forEach(function (strand) {
      var items = byStrand[strand];
      if (!items) return;
      items.sort(function (a, b) { return String(a.year).localeCompare(String(b.year)); });
      var group = document.createElement("div");
      group.className = "wos-biblio-group";
      group.id = "strand-" + strand.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
      var h = document.createElement("h3");
      h.textContent = strand;
      group.appendChild(h);
      var ol = document.createElement("ol");
      ol.className = "wos-biblio";
      items.forEach(function (r) {
        var li = document.createElement("li");
        li.id = "read-" + r.id;
        var html = citeHtml(r.citation || r.title);
        if (r.url) html += ' <a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.urlLabel || "Link") + " ↗</a>";
        html += '<span class="wos-annotation">' + esc(r.description) +
          ' <a href="catalog.html#' + r.id + '">Catalog record ' + r.id + "</a></span>";
        li.innerHTML = html;
        ol.appendChild(li);
      });
      group.appendChild(ol);
      readingsRoot.appendChild(group);
    });
    // The list is built after the page loads, so a link to one entry has to be followed by hand
    var wanted = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (wanted) {
      wanted.classList.add("is-target");
      setTimeout(function () { wanted.scrollIntoView({ block: "start" }); }, 60);
    }
  }

  // Live counts, e.g. on the home page: <strong data-wos-count="film"></strong> / data-wos-count="all"
  document.querySelectorAll("[data-wos-count]").forEach(function (span) {
    var k = span.getAttribute("data-wos-count");
    span.textContent = k === "all" ? records.length
      : records.filter(function (r) { return r.type === k; }).length;
  });

  var root = document.getElementById("wos-catalog");
  if (!root || !records.length) return;

  var TYPE_LABELS = {
    film: "Film & Video",
    collective: "Collective / Organization",
    platform: "Archive / Platform",
    text: "Text",
    framework: "Protocol / Framework",
    festival: "Festival",
    library: "Library / Repository",
    audio: "Audio",
    document: "Document / State publication"
  };
  var PATH_LABELS = {
    culture: "Indigeneity & Culture",
    nature: "Indigeneity & Nature",
    youth: "Indigeneity & Youth",
    archives: "Archives & Memory",
    method: "Method & Governance"
  };
  var ACCESS_LABELS = {
    open: "Open access",
    request: "Access by request",
    institutional: "Institutional / library access",
    purchase: "Published — library or purchase"
  };

  var state = { type: null, path: null, region: null, curator: false, q: "" };

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function matches(r) {
    if (state.type && r.type !== state.type) return false;
    if (state.path && (r.paths || []).indexOf(state.path) === -1) return false;
    if (state.region && r.region !== state.region) return false;
    if (state.curator && !r.curator) return false;
    if (state.q) {
      var hay = [r.title, r.creator, r.description, r.note, r.region, r.coverage, r.language, (r.subjects || []).join(" ")]
        .join(" ").toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }

  function countBy(key, value) {
    return records.filter(function (r) {
      if (key === "path") return (r.paths || []).indexOf(value) !== -1;
      return r[key] === value;
    }).length;
  }

  /* ---------- Facet chips ---------- */
  function chipGroup(label, key, options) {
    var group = el("div", { class: "wos-facet", role: "group", "aria-label": label });
    group.appendChild(el("span", { class: "wos-facet-label", text: label }));
    options.forEach(function (opt) {
      var n = countBy(key, opt.value);
      if (!n) return;
      var chip = el("button", {
        type: "button",
        class: "wos-chip",
        "data-key": key,
        "data-value": opt.value,
        "aria-pressed": "false"
      });
      chip.appendChild(document.createTextNode(opt.label + " "));
      chip.appendChild(el("span", { class: "wos-chip-count", text: String(n) }));
      group.appendChild(chip);
    });
    return group;
  }

  function uniqueRegions() {
    var seen = {};
    records.forEach(function (r) { if (r.region) seen[r.region] = true; });
    return Object.keys(seen).sort().map(function (v) { return { value: v, label: v }; });
  }

  var controls = el("div", { class: "wos-controls" });
  var search = el("input", {
    type: "search",
    class: "wos-search",
    placeholder: "Search titles, makers, places, subjects…",
    "aria-label": "Search the catalog"
  });
  controls.appendChild(search);
  controls.appendChild(chipGroup("Type", "type", Object.keys(TYPE_LABELS).map(function (k) {
    return { value: k, label: TYPE_LABELS[k] };
  })));
  controls.appendChild(chipGroup("Through-line", "path", Object.keys(PATH_LABELS).map(function (k) {
    return { value: k, label: PATH_LABELS[k] };
  })));
  controls.appendChild(chipGroup("Region", "region", uniqueRegions()));

  var curatorChip = el("button", {
    type: "button", class: "wos-chip wos-chip-curator", "data-key": "curator", "aria-pressed": "false"
  });
  curatorChip.textContent = "Curator’s own work";
  var footerRow = el("div", { class: "wos-controls-foot" });
  footerRow.appendChild(curatorChip);
  var clearBtn = el("button", { type: "button", class: "wos-clear", text: "Clear all filters" });
  footerRow.appendChild(clearBtn);
  var status = el("p", { class: "wos-status", "aria-live": "polite" });
  footerRow.appendChild(status);
  controls.appendChild(footerRow);

  var list = el("div", { class: "wos-records" });
  root.appendChild(controls);
  root.appendChild(list);

  /* ---------- Record cards ---------- */
  function citationFor(r) {
    if (r.citation) return r.citation;
    var parts = [r.creator, r.year ? "(" + r.year + ")" : null, r.title + "."];
    if (r.url) parts.push(r.url);
    return parts.filter(Boolean).join(" ");
  }

  function metaRow(dl, term, value) {
    if (!value) return;
    dl.appendChild(el("dt", { text: term }));
    var dd = el("dd");
    if (value.nodeType) dd.appendChild(value); else dd.textContent = value;
    dl.appendChild(dd);
  }

  function card(r) {
    var art = el("article", { class: "wos-record", id: r.id });
    if (r.curator) art.classList.add("is-curator");

    var head = el("div", { class: "wos-record-head" });
    head.appendChild(el("span", { class: "wos-badge wos-badge-" + r.type, text: TYPE_LABELS[r.type] || r.type }));
    if (r.curator) head.appendChild(el("span", { class: "wos-badge wos-badge-curator", text: "Curator’s work" }));
    head.appendChild(el("span", { class: "wos-record-id", text: r.id }));
    art.appendChild(head);

    if (r.thumb && r.url) {
      var t = el("a", { class: "wos-thumb", href: r.url, target: "_blank", rel: "noopener",
        "aria-label": (r.urlLabel || "Open") + " " + r.title + " (opens in a new tab)" });
      t.appendChild(el("img", { src: r.thumb, alt: "", loading: "lazy" }));
      if (r.bunny) {
        t.setAttribute("data-bunny", r.bunny);
        t.setAttribute("aria-label", "Play " + r.title);
      }
      art.appendChild(t);
    }

    art.appendChild(el("h3", { class: "wos-record-title", text: r.title }));
    art.appendChild(el("p", { class: "wos-record-byline",
      text: [r.creator, r.year, r.coverage || r.region].filter(Boolean).join(" · ") }));
    art.appendChild(el("p", { class: "wos-record-desc", text: r.description }));

    var actions = el("div", { class: "wos-record-actions" });
    if (r.url) {
      actions.appendChild(el("a", { class: "wos-link", href: r.url, target: "_blank", rel: "noopener",
        text: (r.urlLabel || "Open") + " ↗" }));
    }
    var toggle = el("button", { type: "button", class: "wos-more", "aria-expanded": "false",
      "aria-controls": r.id + "-meta", text: "Full record" });
    actions.appendChild(toggle);
    art.appendChild(actions);

    var meta = el("div", { class: "wos-meta", id: r.id + "-meta", hidden: "" });
    if (r.note) meta.appendChild(el("p", { class: "wos-note", text: r.note }));
    var dl = el("dl");
    metaRow(dl, "Identifier", r.id);
    metaRow(dl, "Title", r.title);
    metaRow(dl, "Creator", r.creator);
    metaRow(dl, "Date", r.year);
    metaRow(dl, "Type", TYPE_LABELS[r.type]);
    metaRow(dl, "Format", r.format);
    metaRow(dl, "Language", r.language);
    metaRow(dl, "Coverage", r.coverage || r.region);
    metaRow(dl, "Through-lines", (r.paths || []).map(function (p) { return PATH_LABELS[p]; }).join("; "));
    metaRow(dl, "Subjects", (r.subjects || []).join("; "));
    metaRow(dl, "Access", ACCESS_LABELS[r.access] || r.access);
    if (r.url) {
      var link = el("a", { href: r.url, target: "_blank", rel: "noopener", text: r.url });
      metaRow(dl, "Source", link);
    }
    meta.appendChild(dl);

    var citeWrap = el("div", { class: "wos-cite" });
    citeWrap.appendChild(el("span", { class: "wos-cite-label", text: "Cite" }));
    // Rendered with italics; the element's textContent is then plain text for copying.
    var citeText = el("p", { class: "wos-cite-text", html: citeHtml(citationFor(r)) });
    citeWrap.appendChild(citeText);
    var copy = el("button", { type: "button", class: "wos-copy", text: "Copy citation" });
    copy.addEventListener("click", function () {
      var done = function () { copy.textContent = "Copied"; setTimeout(function () { copy.textContent = "Copy citation"; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(citeText.textContent).then(done, function () {});
      }
    });
    citeWrap.appendChild(copy);
    meta.appendChild(citeWrap);
    art.appendChild(meta);

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.textContent = open ? "Full record" : "Close record";
      if (open) meta.setAttribute("hidden", ""); else meta.removeAttribute("hidden");
    });
    return art;
  }

  /* ---------- Render ---------- */
  function render() {
    var shown = records.filter(matches);
    list.innerHTML = "";
    shown.forEach(function (r) { list.appendChild(card(r)); });
    if (!shown.length) {
      list.appendChild(el("p", { class: "wos-empty", text: "Nothing in the archive matches that combination yet." }));
    }
    status.textContent = "Showing " + shown.length + " of " + records.length + " records";
    controls.querySelectorAll(".wos-chip").forEach(function (chip) {
      var key = chip.getAttribute("data-key");
      var on = key === "curator" ? state.curator : state[key] === chip.getAttribute("data-value");
      chip.setAttribute("aria-pressed", String(on));
    });
  }

  controls.addEventListener("click", function (e) {
    var chip = e.target.closest(".wos-chip");
    if (!chip) return;
    var key = chip.getAttribute("data-key");
    if (key === "curator") state.curator = !state.curator;
    else {
      var val = chip.getAttribute("data-value");
      state[key] = state[key] === val ? null : val;
    }
    render();
  });
  search.addEventListener("input", function () {
    state.q = search.value.trim().toLowerCase();
    render();
  });
  clearBtn.addEventListener("click", function () {
    state = { type: null, path: null, region: null, curator: false, q: "" };
    search.value = "";
    render();
  });

  // Path cards elsewhere on the page: <a data-wos-path="nature" href="#catalog">
  document.querySelectorAll("[data-wos-path], [data-wos-type]").forEach(function (link) {
    link.addEventListener("click", function () {
      state = { type: link.getAttribute("data-wos-type"), path: link.getAttribute("data-wos-path"),
        region: null, curator: false, q: "" };
      search.value = "";
      render();
    });
  });

  render();

  // Deep link: #WOS-012 opens that record.
  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!/^WOS-\d+$/.test(id)) return;
    state = { type: null, path: null, region: null, curator: false, q: "" };
    search.value = "";
    render();
    var target = document.getElementById(id);
    if (!target) return;
    var btn = target.querySelector(".wos-more");
    if (btn && btn.getAttribute("aria-expanded") === "false") btn.click();
    target.classList.add("is-highlight");
    target.scrollIntoView({ block: "start" });
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();
})();
