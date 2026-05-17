/* ============================================================
   FAITHFUL — The Ministry OS  ·  main.js
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

  /* ---- header elevation on scroll ---- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var lastShadow = false;
    var onScrollHeader = function () {
      var s = window.scrollY > 8;
      if (s !== lastShadow) {
        header.style.boxShadow = s ? "0 8px 30px -18px rgba(17,20,75,.32)" : "none";
        lastShadow = s;
      }
    };
    onScrollHeader();
    window.addEventListener("scroll", onScrollHeader, { passive: true });
  }

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- count-up stats ---- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    var runCount = function (el) {
      var target = parseFloat(el.getAttribute("data-count")) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduceMotion) { el.innerHTML = target + '<span class="suf">' + suffix + "</span>"; return; }
      var dur = 1400, start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.innerHTML = Math.round(eased * target) + '<span class="suf">' + suffix + "</span>";
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { co.observe(el); });
    } else {
      counters.forEach(runCount);
    }
  }

  /* ---- reading progress (article pages) ---- */
  var progress = document.querySelector(".read-progress");
  var article = document.querySelector(".prose");
  if (progress && article) {
    var onScrollProgress = function () {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var passed = Math.min(Math.max(-rect.top, 0), total > 0 ? total : 1);
      var pct = total > 0 ? (passed / total) * 100 : 0;
      progress.style.width = pct + "%";
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
            btn.classList.add("is-copied");
            setTimeout(function () {
              btn.setAttribute("aria-label", old);
              btn.classList.remove("is-copied");
            }, 1800);
          });
        }
        return;
      }
      if (kind === "native" && navigator.share) {
        navigator.share({ title: title, url: url }).catch(function () {});
        return;
      }
      var dest = "";
      if (kind === "linkedin") dest = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
      if (kind === "facebook") dest = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
      if (kind === "email") dest = "mailto:?subject=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(url);
      if (dest) window.open(dest, "_blank", "noopener,width=620,height=560");
    });
  });

  /* ---- article filter (articles page) ---- */
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
      if (empty) empty.classList.toggle("show", shown === 0);
    };
    filterBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        filterBtns.forEach(function (x) { x.classList.remove("is-active"); });
        b.classList.add("is-active");
        applyFilter(b.getAttribute("data-filter"));
      });
    });
    // deep-link by hash (#guides, #doctrine, etc.)
    if (window.location.hash) {
      var hashBtn = document.querySelector('.filter-btn[data-filter="' + window.location.hash.slice(1) + '"]');
      if (hashBtn) hashBtn.click();
    }
  }

  /* ---- newsletter forms (front-end demo: no live endpoint wired) ---- */
  var bindForm = function (form) {
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailEl = form.querySelector('input[type="email"]');
      var status = form.querySelector(".form-status") || document.getElementById("newsletterStatus");
      if (emailEl && !emailEl.checkValidity()) {
        emailEl.focus();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Subscribed ✓"; }
      if (status) {
        status.textContent = "You're on the list. Watch for a confirmation email — the next issue lands Friday.";
        status.classList.add("is-ok");
      }
      form.reset();
      setTimeout(function () {
        if (btn) { btn.disabled = false; btn.textContent = "Subscribe free"; }
      }, 4000);
    });
  };
  bindForm(document.getElementById("newsletterForm"));
  bindForm(document.getElementById("footerForm"));
  bindForm(document.getElementById("newsletterPageForm"));

})();
