/* 88 Holdings Ltd – shared behaviour (vanilla JS, no dependencies) */
(function () {
  "use strict";

  /* ---------- mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 880px)").addEventListener("change", function (e) {
      if (e.matches) setNav(false);
    });
  }

  /* ---------- current page highlight ---------- */
  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a[href]").forEach(function (link) {
    if (link.getAttribute("href") === current) link.setAttribute("aria-current", "page");
  });

  /* ---------- header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- contact form (frontend only) ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var status = document.getElementById("form-status");

    var rules = {
      name: function (v) { return v.trim() ? "" : "Enter your name."; },
      email: function (v) {
        if (!v.trim()) return "Enter your email address.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address, like name@example.com.";
      },
      quantity: function (v) { return v.trim() ? "" : "Tell us roughly how many bottles you need."; },
      message: function (v) { return v.trim().length >= 10 ? "" : "Tell us a little about your branding requirements."; }
    };

    function check(field) {
      var input = field.querySelector("input, select, textarea");
      var rule = rules[input.name];
      var msg = rule ? rule(input.value) : "";
      field.classList.toggle("has-error", Boolean(msg));
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      field.querySelector(".error-msg").textContent = msg;
      return !msg;
    }

    var fields = Array.prototype.filter.call(form.querySelectorAll(".field"), function (f) {
      return f.querySelector(".error-msg");
    });

    fields.forEach(function (f) {
      f.querySelector("input, select, textarea").addEventListener("blur", function () { check(f); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      fields.forEach(function (f) {
        if (!check(f) && !firstBad) firstBad = f;
      });
      if (firstBad) {
        status.classList.remove("is-visible");
        firstBad.querySelector("input, select, textarea").focus();
        return;
      }
      /* TODO: connect to a form service or backend. For now nothing is sent. */
      status.textContent =
        "Thanks, your details look complete. This draft form is not connected yet, so nothing has been sent. Please email 88holdings9196@gmail.com for now.";
      status.classList.add("is-visible");
      status.focus();
      form.reset();
    });
  }
})();
