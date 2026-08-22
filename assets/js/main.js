/* =========================================================================
   Vision for Biomedical Discovery (CVPath + Vision4Neuro) - WACV 2027
   Progressive enhancement only: the site works fully without JavaScript.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- Theme (light / dark) ---------- */
  var STORAGE_KEY = "vbd-theme";
  var root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark" || theme === "light") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function currentTheme() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    if (stored) return stored;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
      toggle.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav__toggle");
  var navLinks = document.getElementById("nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ---------- Program track filter ---------- */
  var filter = document.querySelector(".track-filter");
  if (filter) {
    var slots = Array.prototype.slice.call(document.querySelectorAll(".timeline .slot"));
    filter.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-track]");
      if (!btn) return;
      var track = btn.getAttribute("data-track");
      filter.querySelectorAll("button[data-track]").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      slots.forEach(function (slot) {
        var slotTracks = (slot.getAttribute("data-track") || "").split(" ");
        var show = track === "all" || slotTracks.indexOf(track) !== -1;
        slot.classList.toggle("is-dimmed", !show);
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealables = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Countdown to the next deadline ---------- */
  var countdown = document.querySelector("[data-deadline]");
  if (countdown) {
    var target = new Date(countdown.getAttribute("data-deadline")).getTime();
    if (!isNaN(target)) {
      var days = Math.ceil((target - Date.now()) / 86400000);
      var out = countdown.querySelector("[data-countdown-out]");
      if (out && days > 0) {
        out.textContent = days === 1 ? "1 day left" : days + " days left";
      } else if (out) {
        out.textContent = "";
      }
    }
  }
})();
