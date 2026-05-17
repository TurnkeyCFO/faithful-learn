/* ============================================================
   FAITHFUL · AI for the Church  —  main.js
   Progressive enhancement only. Every page works without JS.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- year stamp ---- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- mobile nav ---- */
  var toggle = document.getElementById("navToggle");
  var body = document.body;
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.querySelectorAll("#navMenu a").forEach(function (a) {
      a.addEventListener("click", function () {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- masthead elevation on scroll ---- */
  var masthead = document.getElementById("masthead");
  if (masthead) {
    var onScrollHead = function () {
      masthead.classList.toggle("scrolled", window.scrollY > 6);
    };
    onScrollHead();
    window.addEventListener("scroll", onScrollHead, { passive: true });
  }

  /* ---- hero line reveal ---- */
  var hero = document.getElementById("hero");
  if (hero) {
    if (reduceMotion) {
      hero.classList.add("lit");
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { hero.classList.add("lit"); });
      });
    }
  }

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- reading progress (article pages) ---- */
  var progress = document.querySelector(".read-progress");
  var article = document.querySelector(".prose");
  if (progress && article) {
    var onScrollProgress = function () {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var passed = Math.min(Math.max(-rect.top, 0), total > 0 ? total : 1);
      progress.style.width = (total > 0 ? (passed / total) * 100 : 0) + "%";
    };
    onScrollProgress();
    window.addEventListener("scroll", onScrollProgress, { passive: true });
    window.addEventListener("resize", onScrollProgress);
  }

  /* ---- share buttons ---- */
  document.querySelectorAll("[data-share]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var kind = btn.getAttribute("data-share");
      var url = window.location.href;
      var title = document.title;
      if (kind === "copy") {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(function () {
            var old = btn.getAttribute("aria-label");
            btn.setAttribute("aria-label", "Link copied");
            setTimeout(function () { btn.setAttribute("aria-label", old); }, 1800);
          });
        }
        return;
      }
      var dest = "";
      if (kind === "linkedin") dest = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
      if (kind === "facebook") dest = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
      if (kind === "email") dest = "mailto:?subject=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(url);
      if (dest) window.open(dest, "_blank", "noopener,width=620,height=560");
    });
  });

  /* ---- guide filter (guides page) ---- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  if (filterBtns.length) {
    var items = document.querySelectorAll("[data-cat]");
    var empty = document.querySelector(".filter-empty");
    var applyFilter = function (cat) {
      var shown = 0;
      items.forEach(function (it) {
        var match = cat === "all" || it.getAttribute("data-cat") === cat;
        it.style.display = match ? "" : "none";
        if (match) shown++;
      });
      if (empty) empty.style.display = shown === 0 ? "block" : "none";
    };
    filterBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        filterBtns.forEach(function (x) { x.classList.remove("is-active"); });
        b.classList.add("is-active");
        applyFilter(b.getAttribute("data-filter"));
      });
    });
  }

})();
