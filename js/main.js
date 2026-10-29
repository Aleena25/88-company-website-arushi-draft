/* 88 Prime Ltd – shared behaviour (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var MIN_UNITS = 350;
  var SETUP_FEE = 40;
  var STEP = 50;

  function money(n) {
    return "£" + n.toFixed(2);
  }

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
    window.matchMedia("(min-width: 1040px)").addEventListener("change", function (e) {
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

  /* ---------- shared field validation ---------- */
  function makeChecker(rules) {
    return function check(field) {
      var input = field.querySelector("input, select, textarea");
      var rule = rules[input.name];
      var msg = rule ? rule(input.value) : "";
      field.classList.toggle("has-error", Boolean(msg));
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      field.querySelector(".error-msg").textContent = msg;
      return !msg;
    };
  }

  function requiredFields(form) {
    return Array.prototype.filter.call(form.querySelectorAll(".field"), function (f) {
      return f.querySelector(".error-msg");
    });
  }

  var emailRule = function (v) {
    if (!v.trim()) return "Enter your email address.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address, like name@example.com.";
  };
  var nameRule = function (v) { return v.trim() ? "" : "Enter your name."; };

  /* ---------- contact form (frontend only) ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var status = document.getElementById("form-status");
    var check = makeChecker({
      name: nameRule,
      email: emailRule,
      quantity: function (v) { return v.trim() ? "" : "Tell us roughly how many bottles you need."; },
      message: function (v) { return v.trim().length >= 10 ? "" : "Tell us a little about your branding requirements."; }
    });
    var fields = requiredFields(form);

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
        "Thanks, your details look complete. This draft form is not connected yet, so nothing has been sent. Please email us directly for now.";
      status.classList.add("is-visible");
      status.focus();
      form.reset();
    });
  }

  /* ---------- order page: quantities, totals, validation ---------- */
  var orderForm = document.getElementById("order-form");
  if (orderForm) {
    var qtyInputs = Array.prototype.slice.call(orderForm.querySelectorAll("input[data-price]"));
    var sumLines = document.getElementById("sum-lines");
    var sumUnits = document.getElementById("sum-units");
    var sumSub = document.getElementById("sum-sub");
    var sumSetup = document.getElementById("sum-setup");
    var sumTotal = document.getElementById("sum-total");
    var sumMin = document.getElementById("sum-min");
    var unitsErr = document.getElementById("units-err");
    var payErr = document.getElementById("pay-err");
    var orderStatus = document.getElementById("order-status");

    function qtyOf(input) {
      var n = parseInt(input.value, 10);
      return isNaN(n) || n < 0 ? 0 : n;
    }

    function totals() {
      var units = 0, sub = 0;
      qtyInputs.forEach(function (i) {
        var q = qtyOf(i);
        units += q;
        sub += q * parseFloat(i.getAttribute("data-price"));
      });
      return { units: units, sub: sub, setup: units > 0 ? SETUP_FEE : 0 };
    }

    function render() {
      var t = totals();
      sumLines.innerHTML = "";
      var any = false;
      qtyInputs.forEach(function (i) {
        var q = qtyOf(i);
        if (!q) return;
        any = true;
        var price = parseFloat(i.getAttribute("data-price"));
        var li = document.createElement("li");
        var left = document.createElement("span");
        left.textContent = i.getAttribute("data-label");
        var qty = document.createElement("span");
        qty.className = "sum-qty";
        qty.textContent = q + " × " + money(price);
        left.appendChild(qty);
        var right = document.createElement("strong");
        right.textContent = money(q * price);
        li.appendChild(left);
        li.appendChild(right);
        sumLines.appendChild(li);
      });
      if (!any) {
        var empty = document.createElement("li");
        empty.className = "sum-empty";
        empty.textContent = "No bottles added yet.";
        sumLines.appendChild(empty);
      }
      sumUnits.textContent = String(t.units);
      sumSub.textContent = money(t.sub);
      sumSetup.textContent = money(t.setup);
      sumTotal.textContent = money(t.sub + t.setup);

      sumMin.classList.remove("is-short", "is-ok");
      if (t.units === 0) {
        sumMin.textContent = "Minimum order is " + MIN_UNITS + " bottles.";
      } else if (t.units < MIN_UNITS) {
        sumMin.textContent = "Add " + (MIN_UNITS - t.units) + " more bottles to reach the " + MIN_UNITS + " bottle minimum.";
        sumMin.classList.add("is-short");
      } else {
        sumMin.textContent = "Minimum reached. You can add extra bottles any time.";
        sumMin.classList.add("is-ok");
      }
      if (t.units >= MIN_UNITS) unitsErr.textContent = "";
    }

    orderForm.addEventListener("input", function (e) {
      if (e.target.matches("input[data-price]")) render();
    });

    orderForm.addEventListener("click", function (e) {
      var btn = e.target.closest(".step");
      if (!btn) return;
      var input = document.getElementById(btn.getAttribute("data-target"));
      var dir = parseInt(btn.getAttribute("data-dir"), 10);
      var q = qtyOf(input);
      if (dir > 0 && totals().units === 0) {
        q = MIN_UNITS;               /* first add jumps straight to the minimum */
      } else {
        q = Math.max(0, q + dir * STEP);
      }
      input.value = q;
      render();
    });

    /* preselect a bottle from a link such as order.html?item=330-still */
    try {
      var item = new URLSearchParams(location.search).get("item");
      var pre = item && document.getElementById("qty-" + item);
      if (pre) pre.value = MIN_UNITS;
    } catch (err) { /* ignore */ }
    render();

    var oCheck = makeChecker({
      name: nameRule,
      email: emailRule,
      message: function (v) { return v.trim().length >= 10 ? "" : "Tell us a little about your branding requirements."; }
    });
    var oFields = requiredFields(orderForm);
    oFields.forEach(function (f) {
      f.querySelector("input, select, textarea").addEventListener("blur", function () { oCheck(f); });
    });

    orderForm.addEventListener("change", function (e) {
      if (e.target.name === "payment") payErr.textContent = "";
    });

    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      var t = totals();

      if (t.units < MIN_UNITS) {
        unitsErr.textContent = t.units === 0
          ? "Add at least " + MIN_UNITS + " bottles to place an order."
          : "The minimum order is " + MIN_UNITS + " bottles. Add " + (MIN_UNITS - t.units) + " more.";
        firstBad = qtyInputs[0];
      } else {
        unitsErr.textContent = "";
      }

      oFields.forEach(function (f) {
        if (!oCheck(f) && !firstBad) firstBad = f.querySelector("input, select, textarea");
      });

      if (!orderForm.querySelector('input[name="payment"]:checked')) {
        payErr.textContent = "Choose a payment method.";
        if (!firstBad) firstBad = orderForm.querySelector('input[name="payment"]');
      } else {
        payErr.textContent = "";
      }

      if (firstBad) {
        orderStatus.classList.remove("is-visible");
        firstBad.focus();
        return;
      }
      /* TODO: send the order to a backend and hand card payments to a payment provider. */
      orderStatus.textContent =
        "Your order looks complete (" + t.units + " bottles, total " + money(t.sub + t.setup) +
        "). This draft is not connected to payments yet, so nothing has been sent or charged. Please email us to place the order for now.";
      orderStatus.classList.add("is-visible");
      orderStatus.focus();
    });
  }

  /* ---------- cookie banner ---------- */
  var CONSENT_KEY = "cookie-consent-v1";

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (err) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (err) { /* storage blocked */ }
    document.documentElement.setAttribute("data-cookie-consent", value);
  }

  function closeBanner(returnFocusTo) {
    var b = document.getElementById("cookie-banner");
    if (b) b.remove();
    if (returnFocusTo && document.body.contains(returnFocusTo)) returnFocusTo.focus();
  }

  function openBanner(opener) {
    if (document.getElementById("cookie-banner")) return;
    var b = document.createElement("div");
    b.id = "cookie-banner";
    b.className = "cookie-banner";
    b.setAttribute("role", "region");
    b.setAttribute("aria-label", "Cookie notice");
    b.innerHTML =
      '<div class="cookie-inner">' +
      '<div><h2>Cookies</h2>' +
      '<p>We use strictly necessary storage to make this site work. With your permission we may also use analytics and other optional cookies. ' +
      '<a href="cookies.html">Read our cookie policy</a>.</p></div>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-gold" data-consent="accepted">Accept all</button>' +
      '<button type="button" class="btn btn-white" data-consent="rejected">Reject non-essential</button>' +
      '</div></div>';
    b.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-consent]");
      if (!btn) return;
      setConsent(btn.getAttribute("data-consent"));
      closeBanner(opener);
    });
    document.body.appendChild(b);
    if (opener) b.querySelector("button").focus();
  }

  var existing = getConsent();
  if (existing) {
    document.documentElement.setAttribute("data-cookie-consent", existing);
  } else {
    openBanner(null);
  }

  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-cookie-settings]");
    if (opener) openBanner(opener);
  });
})();
