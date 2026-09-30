// Arpit Gaind — shared site interactivity. Plain JS, no dependencies.
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header shrink on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onHeaderScroll = function () {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onHeaderScroll, { passive: true });
    onHeaderScroll();

    /* Expose the header's current height so in-page sticky bars sit just below it */
    var setHeaderHeight = function () {
      document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
    };
    header.addEventListener("transitionend", setHeaderHeight);
    window.addEventListener("resize", setHeaderHeight);
    window.addEventListener("scroll", setHeaderHeight, { passive: true });
    setHeaderHeight();
  }

  /* ---------- Scroll-reveal fade-ins ---------- */
  var revealTargets = document.querySelectorAll(
    "main .wrap > h1, main .wrap > h2, main .wrap > h3, main .wrap > p, " +
    "main .wrap > div, main .wrap > ul, main .wrap > figure, " +
    ".split-hero, .award-featured"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.type = "button";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.innerHTML = "&uarr;";
  document.body.appendChild(backToTop);
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
  window.addEventListener(
    "scroll",
    function () { backToTop.classList.toggle("visible", window.scrollY > 500); },
    { passive: true }
  );

  /* ---------- Lightbox for field photography ---------- */
  function openLightbox(src, alt) {
    var overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    var img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    var closeBtn = document.createElement("button");
    closeBtn.className = "lightbox-close";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.innerHTML = "&times;";
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    function close() {
      overlay.remove();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) { if (e.key === "Escape") close(); }
    overlay.addEventListener("click", close);
    closeBtn.addEventListener("click", function (e) { e.stopPropagation(); close(); });
    img.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("keydown", onKey);
  }

  document.querySelectorAll(".field-photo img, .header-photo-wrap img, .hats-grid img").forEach(function (img) {
    img.addEventListener("click", function () { openLightbox(img.src, img.alt); });
  });

  /* ---------- Collapsible "show more" lists ---------- */
  document.querySelectorAll("[data-toggle]").forEach(function (btn) {
    var targetSelector = btn.getAttribute("data-toggle");
    var items = document.querySelectorAll(targetSelector);
    if (!items.length) return;
    var showText = btn.getAttribute("data-show-text") || "Show more";
    var hideText = btn.getAttribute("data-hide-text") || "Show less";
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = showText + ' <span class="arrow">&darr;</span>';
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      items.forEach(function (item) { item.classList.toggle("expanded", !expanded); });
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.innerHTML = (expanded ? showText : hideText) + ' <span class="arrow">&darr;</span>';
    });
  });

  /* ---------- In-page section nav (scrollspy) ---------- */
  var pageNav = document.querySelector("nav.page-nav");
  if (pageNav) {
    var links = Array.prototype.slice.call(pageNav.querySelectorAll("a[href^='#']"));
    var sections = links
      .map(function (link) { return document.querySelector(link.getAttribute("href")); })
      .filter(Boolean);

    function setActive(id) {
      links.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }

    if (sections.length && "IntersectionObserver" in window) {
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---------- Films hosted on Bunny Stream: click a still to play it in place ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest("a[data-bunny]") : null;
    if (!link) return;
    e.preventDefault();
    var box = document.createElement("div");
    box.className = "film-embed";
    var frame = document.createElement("iframe");
    frame.src = "https://iframe.mediadelivery.net/embed/" + link.getAttribute("data-bunny") +
      "?autoplay=true&preload=true&responsive=true";
    frame.title = link.getAttribute("aria-label") || "Film player";
    frame.setAttribute("allow", "accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen");
    frame.setAttribute("allowfullscreen", "");
    box.appendChild(frame);
    link.parentNode.replaceChild(box, link);
  });
})();
