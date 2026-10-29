/* 88 Prime Ltd – 3D bottle experience (three.js)
   Source file. Bundled into js/bottle3d.js with:
   npx esbuild js/src/bottle3d.js --bundle --minify --format=iife --outfile=js/bottle3d.js */
import("https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js").then(function (THREE) {
var {WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, LatheGeometry, CylinderGeometry, PlaneGeometry, Vector2, MeshPhysicalMaterial, MeshStandardMaterial, MeshBasicMaterial, CubicBezierCurve, CanvasTexture, SRGBColorSpace, ACESFilmicToneMapping, PMREMGenerator, DirectionalLight, PointLight, BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, Color, DoubleSide, AdditiveBlending, TorusGeometry} = THREE;
var logoUrl = "data:image/png;base64,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";
(function () {
  "use strict";

  var root = document.documentElement;
  var canvas = document.getElementById("gl");
  if (!canvas) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wideQuery = window.matchMedia("(min-width: 880px)");

  /* ---------- renderer (fall back to a static image if WebGL is unavailable) ---------- */
  var renderer;
  try {
    renderer = new WebGLRenderer({ canvas: canvas, antialias: true, powerPreference: "high-performance" });
  } catch (err) {
    root.classList.add("no-webgl");
    return;
  }
  canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); root.classList.add("no-webgl"); });
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = SRGBColorSpace;

  var scene = new Scene();
  var camera = new PerspectiveCamera(32, 1, 0.1, 80);
  camera.position.set(0, 0.9, 8.4);
  camera.lookAt(0, 0, 0);

  /* ---------- backdrop: royal blue gradient with a soft gold glow ---------- */
  (function makeBackdrop() {
    var c = document.createElement("canvas");
    c.width = 512; c.height = 512;
    var g = c.getContext("2d");
    var base = g.createRadialGradient(256, 230, 20, 256, 256, 420);
    base.addColorStop(0, "#3560f0");
    base.addColorStop(0.45, "#16309f");
    base.addColorStop(1, "#071150");
    g.fillStyle = base; g.fillRect(0, 0, 512, 512);
    var glow = g.createRadialGradient(400, 420, 0, 400, 420, 260);
    glow.addColorStop(0, "rgba(246,200,60,0.34)");
    glow.addColorStop(1, "rgba(201,154,30,0)");
    g.fillStyle = glow; g.fillRect(0, 0, 512, 512);
    var t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    scene.background = t;
  })();

  /* ---------- lighting: studio environment for the glass + two accent lights ---------- */
  var pmrem = new PMREMGenerator(renderer);
  var envScene = new Scene(); envScene.background = new Color(0x0a1a6b);
  function strip(w, h, x, y, z, c, k) { var m = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: new Color(c).multiplyScalar(k), side: DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); envScene.add(m); }
  strip(1.1, 12, -6, 0, 3, 0xffffff, 7); strip(1.1, 12, 6, 0, 3, 0xffffff, 7); strip(12, 1.4, 0, 7, 0, 0xfff0d0, 4); strip(7, 7, 0, 2, -9, 0xc99a1e, 3); strip(0.6, 9, 2.5, 0, -6, 0xaec8ff, 4);
  scene.environment = pmrem.fromScene(envScene, 0.02).texture;
  scene.environmentIntensity = 0.9;

  var key = new DirectionalLight(0xfff3d6, 1.6);
  key.position.set(3, 5, 4);
  scene.add(key);
  var rim = new PointLight(0xf2b91e, 90, 0, 2);
  rim.position.set(-3.5, 2.2, -2.5);
  scene.add(rim);

  var bars = new Group(); scene.add(bars);
  [-5.2, -3.4, -1.7, 1.7, 3.4, 5.2].forEach(function (x, i) { var b = new Mesh(new PlaneGeometry(0.1, 14), new MeshBasicMaterial({ color: i % 2 ? 0xf2b91e : 0x8fb0ff, transparent: true, opacity: 0.35 })); b.position.set(x, 0, -6); bars.add(b); });
  var dustN = 220, dp = new Float32Array(dustN * 3), dseed = new Float32Array(dustN);
  for (var di = 0; di < dustN; di++) { dp[di*3] = (Math.random()-.5)*16; dp[di*3+1] = (Math.random()-.5)*10; dp[di*3+2] = -4 + Math.random()*5; dseed[di] = Math.random()*6.28; }
  var dg = new BufferGeometry(); dg.setAttribute("position", new Float32BufferAttribute(dp, 3));
  var dust = new Points(dg, new PointsMaterial({ size: 0.05, color: 0xe9c766, transparent: true, opacity: 0.7, depthWrite: false, blending: AdditiveBlending, sizeAttenuation: true }));
  scene.add(dust);

  /* ---------- bottle geometry ---------- */
  var SPECS = {
    330: { ml: 330, h: 3.0, r: 0.5,  wall: 0.045, labelH: 1.0,  labelY: 0.95, fit: 1.0,  count: 80 },
    750: { ml: 750, h: 4.1, r: 0.62, wall: 0.055, labelH: 1.25, labelY: 1.25, fit: 0.8,  count: 130 }
  };
  var LABEL_ARC = 1.75; /* radians of the bottle the label wraps around */

  function outerProfile(s) {
    var h = s.h, r = s.r;
    var shoulderStart = h * 0.5, shoulderEnd = h * 0.68, neckR = r * 0.36;
    var pts = [new Vector2(0, 0), new Vector2(r * 0.74, 0), new Vector2(r * 0.93, 0.035), new Vector2(r, 0.12), new Vector2(r, shoulderStart)];
    var curve = new CubicBezierCurve(
      new Vector2(r, shoulderStart),
      new Vector2(r, shoulderStart + (shoulderEnd - shoulderStart) * 0.6),
      new Vector2(neckR, shoulderEnd - (shoulderEnd - shoulderStart) * 0.5),
      new Vector2(neckR, shoulderEnd)
    );
    curve.getPoints(28).slice(1).forEach(function (p) { pts.push(p); });
    pts.push(new Vector2(neckR, h - 0.12));
    pts.push(new Vector2(neckR * 1.13, h - 0.09));
    pts.push(new Vector2(neckR * 1.13, h));
    return pts;
  }

  function glassProfile(s) {
    var outer = outerProfile(s), w = s.wall, r = s.r, floor = w + 0.04;
    var innerUp = [
      new Vector2(0, floor), new Vector2(r * 0.74 - w, floor), new Vector2(r * 0.93 - w, floor + 0.03), new Vector2(r - w, floor + 0.12)
    ].concat(outer.slice(4).map(function (p) { return new Vector2(Math.max(p.x - w, 0), p.y); }));
    /* outer wall up to the lip, then the inner wall back down to the floor, so the shell is closed */
    return outer.concat(innerUp.reverse());
  }

  function capGeometry(s) {
    var neckR = s.r * 0.36 * 1.13, cr = neckR + 0.025, ch = 0.26;
    var pts = [new Vector2(0, 0), new Vector2(cr, 0), new Vector2(cr * 1.02, 0.03), new Vector2(cr * 1.02, ch * 0.82),
      new Vector2(cr * 0.93, ch), new Vector2(0, ch)];
    return new LatheGeometry(pts, 64);
  }

  /* ---------- shared materials ---------- */
  var glassMat = new MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0.04, transmission: 1, thickness: 0.45, ior: 1.48,
    attenuationColor: new Color(0xd8f3ff), attenuationDistance: 2.2, envMapIntensity: 1.25,
    specularIntensity: 1, clearcoat: 0.4, clearcoatRoughness: 0.05, depthWrite: false
  });
  var capMat = new MeshStandardMaterial({ color: 0x0b0b0e, metalness: 0.7, roughness: 0.25 });

  function dotTexture() {
    var c = document.createElement("canvas"); c.width = c.height = 64;
    var g = c.getContext("2d");
    var grad = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, "rgba(255,255,255,0.95)");
    grad.addColorStop(0.5, "rgba(220,240,255,0.45)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
    return new CanvasTexture(c);
  }
  var bubbleTex = dotTexture();

  /* ---------- label artwork (drawn on a canvas, wrapped around the bottle) ---------- */
  var config = { size: "330", water: "still", name: "", ink: "#111111", logo: null };
  var defaultLogo = new Image();
  defaultLogo.onload = redrawLabels;
  defaultLogo.src = logoUrl;
  config.logo = defaultLogo;

  function labelCanvas(s) {
    var w = 1024;
    var wUnits = s.r * LABEL_ARC;
    var c = document.createElement("canvas");
    c.width = w; c.height = Math.round(w * s.labelH / wUnits);
    return c;
  }

  function drawLabel(s) {
    var c = s.canvas, g = c.getContext("2d"), w = c.width, h = c.height;
    g.clearRect(0, 0, w, h);
    var img = config.logo;
    if (img && img.complete) {
      var iw = img.naturalWidth || 300, ih = img.naturalHeight || 300;
      var boxW = w * 0.6, boxH = h * 0.5;
      var k = Math.min(boxW / iw, boxH / ih);
      var dw = iw * k, dh = ih * k;
      g.drawImage(img, w / 2 - dw / 2, h * 0.33 - dh / 2, dw, dh);
    }
    g.fillStyle = config.ink;
    g.textAlign = "center";
    g.textBaseline = "middle";
    var text = (config.name.trim() || "88 Prime Ltd").toUpperCase();
    var size = h * 0.1;
    var face = '"Barlow Condensed","Arial Narrow",Arial,sans-serif';
    g.font = "700 " + size + "px " + face;
    if ("letterSpacing" in g) g.letterSpacing = size * 0.06 + "px";
    var maxW = w * 0.84, m = g.measureText(text).width;
    if (m > maxW) { size = size * maxW / m; g.font = "700 " + size + "px " + face; if ("letterSpacing" in g) g.letterSpacing = size * 0.06 + "px"; }
    g.fillText(text, w / 2, h * 0.7);
    var small = h * 0.05;
    g.font = "600 " + small + "px " + face;
    if ("letterSpacing" in g) g.letterSpacing = small * 0.1 + "px";
    g.fillText(s.ml + " ML", w / 2, h * 0.93);
    s.labelMat.metalness = config.ink === "#c99a1e" ? 0.9 : 0.1; s.labelMat.roughness = config.ink === "#c99a1e" ? 0.28 : 0.4;
    s.texture.needsUpdate = true;
  }

  function redrawLabels() {
    Object.keys(SPECS).forEach(function (k) { if (SPECS[k].texture) drawLabel(SPECS[k]); });
  }

  /* ---------- build both bottles ---------- */
  var rig = new Group();          /* positioned and scaled by scroll */
  var spinner = new Group();      /* rotated by auto-spin and dragging */
  rig.add(spinner);
  scene.add(rig);

  /* soft contact shadow under the bottle */
  var shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 128;
  (function () {
    var g = shadowCanvas.getContext("2d");
    var grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    grad.addColorStop(0, "rgba(0,0,10,0.55)");
    grad.addColorStop(1, "rgba(0,0,10,0)");
    g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
  })();
  var shadow = new Mesh(new PlaneGeometry(3, 3),
    new MeshBasicMaterial({ map: new CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.renderOrder = 0;
  rig.add(shadow);

var podium = new Group(); rig.add(podium);
  podium.add(new Mesh(new CylinderGeometry(1.35, 1.5, 0.36, 96), new MeshStandardMaterial({ color: 0x0c1f85, metalness: 0.65, roughness: 0.22 })));
  var ring = new Mesh(new TorusGeometry(1.36, 0.022, 12, 128), new MeshStandardMaterial({ color: 0xf2b91e, metalness: 1, roughness: 0.22 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.17; podium.add(ring);
  var waterMat = new MeshPhysicalMaterial({ color: 0xbfe6ff, transparent: true, opacity: 0.32, roughness: 0, metalness: 0, clearcoat: 1, ior: 1.33, depthWrite: false });
  var crowdG = new Group(); rig.add(crowdG); crowdG.scale.setScalar(0.001);

  Object.keys(SPECS).forEach(function (k) {
    var s = SPECS[k];
    var bottle = new Group();
    bottle.position.y = -s.h / 2;

    var glass = new Mesh(new LatheGeometry(glassProfile(s), 96), glassMat);
    glass.renderOrder = 1;
    bottle.add(glass);

    var wy = s.h * 0.49, wr = s.r - s.wall - 0.012, wf = s.wall + 0.05;
    var water = new Mesh(new LatheGeometry([new Vector2(0, wf), new Vector2(wr * 0.78, wf), new Vector2(wr * 0.96, wf + 0.1), new Vector2(wr, wf + 0.22), new Vector2(wr, wy), new Vector2(wr * 0.97, wy + 0.012), new Vector2(0, wy + 0.012)], 64), waterMat);
    water.renderOrder = 2; bottle.add(water);
    s.glassGeo = glass.geometry;
    var cap = new Mesh(capGeometry(s), capMat); s.capGeo = cap.geometry;
    cap.position.y = s.h - 0.03;
    bottle.add(cap);

    s.canvas = labelCanvas(s);
    s.texture = new CanvasTexture(s.canvas);
    s.texture.colorSpace = SRGBColorSpace;
    s.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    s.labelMat = new MeshStandardMaterial({ map: s.texture, transparent: true, roughness: 0.35, metalness: 0.15, depthWrite: false, side: DoubleSide });
    var label = new Mesh(
      new CylinderGeometry(s.r + 0.004, s.r + 0.004, s.labelH, 72, 1, true, -LABEL_ARC / 2, LABEL_ARC),
      s.labelMat
    );
    label.position.y = s.labelY;
    label.renderOrder = 3;
    bottle.add(label);

    /* bubbles for sparkling water */
    var pos = new Float32Array(s.count * 3), speed = new Float32Array(s.count), seed = new Float32Array(s.count);
    var top = s.h * 0.62, innerR = s.r - s.wall - 0.06;
    for (var i = 0; i < s.count; i++) {
      var a = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * innerR;
      pos[i * 3] = Math.cos(a) * rr;
      pos[i * 3 + 1] = 0.2 + Math.random() * (top - 0.2);
      pos[i * 3 + 2] = Math.sin(a) * rr;
      speed[i] = 0.12 + Math.random() * 0.28;
      seed[i] = Math.random() * 6.28;
    }
    var bg = new BufferGeometry();
    bg.setAttribute("position", new Float32BufferAttribute(pos, 3));
    var bubbles = new Points(bg, new PointsMaterial({
      size: 0.06, map: bubbleTex, transparent: true, depthWrite: false, opacity: 0.85, sizeAttenuation: true
    }));
    bubbles.renderOrder = 2;
    bubbles.visible = false;
    bubbles.userData = { speed: speed, seed: seed, top: top, innerR: innerR };
    bottle.add(bubbles);

    s.group = bottle;
    s.bubbles = bubbles;
    bottle.visible = false;
    spinner.add(bottle);
  });

[[-2.5,-1.1],[-1.5,-.4],[1.5,-.4],[2.5,-1.1],[-3.7,-2.1],[3.7,-2.1],[-.9,-2.5],[.9,-2.5]].forEach(function (p, i) {
    var s = SPECS[330], g = new Group();
    g.add(new Mesh(s.glassGeo, glassMat)); var c = new Mesh(s.capGeo, capMat); c.position.y = s.h - 0.03; g.add(c);
    var l = new Mesh(new CylinderGeometry(s.r + 0.004, s.r + 0.004, s.labelH, 48, 1, true, -LABEL_ARC / 2, LABEL_ARC), s.labelMat); l.position.y = s.labelY; l.renderOrder = 3; g.add(l);
    g.position.set(p[0], 0, p[1]); g.rotation.y = (i % 2 ? -1 : 1) * 0.35; crowdG.add(g);
  });

  /* ---------- state ---------- */
  var POSES = {
    hero:  { x: 0.23,  s: 1.0,  mode: "spin", cy: 1.3, cz: 8.4, ly: 0.2 },
    craft: { x: -0.23, s: 1.12, mode: "sway", ry: 0.9, cy: 0.2, cz: 6.4, ly: 0.9 },
    make:  { x: -0.2,  s: 1.0,  mode: "hold", dy: 0.3, cy: 0.5, cz: 7.0, ly: 0.2 },
    order: { x: 0,     s: 0.82, mode: "spin", cy: 2.4, cz: 11.5, ly: -0.4, crowd: 1 }
  };
  var state = {
    pose: "hero", lastMode: "spin",
    x: 0, y: 0, s: 1, ry: 0.5, targetRy: 0.5, rx: 0, tiltTarget: 0,
    sizeKey: "330", pop: 1, cy: 1.3, cz: 8.4, ly: 0.2, crowd: 0
  };

  function showSize(key, animate) {
    Object.keys(SPECS).forEach(function (k) { SPECS[k].group.visible = k === key; });
    state.sizeKey = key;
    var s = SPECS[key];
    shadow.position.y = -s.h / 2 + 0.01; podium.position.y = -s.h / 2 - 0.18; crowdG.position.y = -s.h / 2;
    if (animate && !reduceMotion) state.pop = 0;
    applyWater();
  }
  function applyWater() {
    Object.keys(SPECS).forEach(function (k) { SPECS[k].bubbles.visible = config.water === "sparkling"; });
  }
  showSize("330", false);

  /* ---------- layout targets ---------- */
  var width = 1, height = 1;
  function resize() {
    width = window.innerWidth; height = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  function target() {
    var p = POSES[state.pose];
    var visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * 8.4;
    var visW = visH * camera.aspect;
    var fit = SPECS[state.sizeKey].fit;
    var headerEl = document.querySelector('.site-header');
    var headerPx = headerEl ? headerEl.offsetHeight : 80;
    var down = -(headerPx / 2) / height * visH;   /* centre the bottle in the space below the sticky header */
    if (wideQuery.matches) {
      return { x: p.x * visW, y: down + (p.dy || 0), s: p.s * fit };
    }
    /* phones and small tablets: bottle sits in the upper part of the screen */
    return { x: 0, y: visH * 0.17, s: p.s * fit * 0.46 };
  }

  /* ---------- which section is in view ---------- */
  var sections = document.querySelectorAll("[data-pose]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var next = e.target.getAttribute("data-pose");
        if (POSES[next] && next !== state.pose) {
          state.pose = next;
          if (POSES[next].mode === "hold") state.targetRy = Math.round(state.ry / (Math.PI * 2)) * Math.PI * 2;
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- drag to rotate ---------- */
  var dragging = false, lastX = 0;
  document.querySelectorAll("[data-drag]").forEach(function (el) {
    el.addEventListener("pointerdown", function (e) {
      dragging = true; lastX = e.clientX;
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      el.classList.add("is-dragging");
    });
    el.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = (e.clientX - lastX) * 0.012;
      lastX = e.clientX;
      state.ry += dx; state.targetRy += dx;
    });
    function end() { dragging = false; el.classList.remove("is-dragging"); }
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
  });
  window.addEventListener("pointermove", function (e) {
    if (e.pointerType === "mouse") state.tiltTarget = (e.clientY / height - 0.5) * 0.18;
  });

  function rotateBy(delta) { state.targetRy += delta; if (POSES[state.pose].mode !== "hold") state.ry += delta; }

  /* ---------- configurator ---------- */
  var PRICES = { "330-still": "1.00", "330-sparkling": "1.10", "750-still": "1.50", "750-sparkling": "1.60" };
  var priceEl = document.getElementById("cfg-price");
  var orderLink = document.getElementById("cfg-order");

  function syncSummary() {
    var id = config.size + "-" + config.water;
    if (priceEl) priceEl.textContent = "£" + PRICES[id] + " per bottle";
    if (orderLink) orderLink.setAttribute("href", "order.html?item=" + id);
  }

  document.querySelectorAll('input[name="size"]').forEach(function (r) {
    r.addEventListener("change", function () { if (r.checked) { config.size = r.value; showSize(r.value, true); syncSummary(); } });
  });
  document.querySelectorAll('input[name="water"]').forEach(function (r) {
    r.addEventListener("change", function () { if (r.checked) { config.water = r.value; applyWater(); syncSummary(); } });
  });
  document.querySelectorAll('input[name="ink"]').forEach(function (r) {
    r.addEventListener("change", function () { if (r.checked) { config.ink = r.value; redrawLabels(); } });
  });
  var nameInput = document.getElementById("brand-name");
  if (nameInput) nameInput.addEventListener("input", function () { config.name = nameInput.value; redrawLabels(); });

  var fileInput = document.getElementById("logo-file");
  var fileMsg = document.getElementById("logo-msg");
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      var f = fileInput.files && fileInput.files[0];
      if (!f) return;
      if (f.type.indexOf("image/") !== 0) { fileMsg.textContent = "Please choose an image file (PNG, JPG or SVG)."; return; }
      if (f.size > 5 * 1024 * 1024) { fileMsg.textContent = "That file is over 5 MB. Please choose a smaller one."; return; }
      var url = URL.createObjectURL(f);
      var img = new Image();
      img.onload = function () { config.logo = img; redrawLabels(); fileMsg.textContent = "Showing " + f.name + ". It stays on your device."; URL.revokeObjectURL(url); };
      img.onerror = function () { fileMsg.textContent = "We couldn't read that image. Try a PNG."; URL.revokeObjectURL(url); };
      img.src = url;
    });
  }
  var resetBtn = document.getElementById("logo-reset");
  if (resetBtn) resetBtn.addEventListener("click", function () {
    config.logo = defaultLogo; if (fileInput) fileInput.value = ""; if (fileMsg) fileMsg.textContent = ""; redrawLabels();
  });
  var left = document.getElementById("rot-left"), right = document.getElementById("rot-right");
  if (left) left.addEventListener("click", function () { rotateBy(-Math.PI / 4); });
  if (right) right.addEventListener("click", function () { rotateBy(Math.PI / 4); });
  syncSummary();

  if (document.fonts && document.fonts.load) {
    document.fonts.load('700 40px "Barlow Condensed"').then(redrawLabels).catch(function () { /* ignore */ });
  }
  redrawLabels();

  /* ---------- render loop ---------- */
  var last = performance.now(), t = 0, slowFrames = 0, lowPower = false;
  function goLowPower() {
    lowPower = true;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height, false);
    glassMat.transmission = 0;
    glassMat.transparent = true;
    glassMat.opacity = 0.22;
    glassMat.color.set(0xcfe6ff);
    glassMat.needsUpdate = true;
  }
  function ease(dt, k) { return reduceMotion ? 1 : 1 - Math.exp(-dt * k); }

  function tick(now) {
    var raw = (now - last) / 1000;
    var dt = Math.min(raw, 0.05);
    last = now; t += dt;
    if (!lowPower) {
      slowFrames = raw > 0.12 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
      if (slowFrames > 8) goLowPower();   /* weak GPU: drop refraction and resolution */
    }

    var p = POSES[state.pose], tg = target();
    var k = ease(dt, 3.2);
    state.x += (tg.x - state.x) * k;
    state.y += (tg.y - state.y) * k;
    state.s += (tg.s - state.s) * k;

    if (p.mode === "spin") {
      if (!dragging && !reduceMotion) { state.ry += dt * 0.5; state.targetRy = state.ry; }
      else state.ry += (state.targetRy - state.ry) * ease(dt, 8);
    } else {
      var goal = p.mode === "sway" ? p.ry + Math.sin(t * 0.6) * 0.35 : state.targetRy;
      if (p.mode === "sway") state.targetRy = goal;
      state.ry += (goal - state.ry) * ease(dt, 4);
    }
    state.rx += (state.tiltTarget - state.rx) * ease(dt, 3);

    if (state.pop < 1) state.pop = Math.min(1, state.pop + dt * 2.4);
    var pop = 0.82 + 0.18 * (1 - Math.pow(1 - state.pop, 3)) ;
    if (reduceMotion) pop = 1;

    var kc = ease(dt, 2.2);
    state.cy += (p.cy - state.cy) * kc; state.cz += (p.cz - state.cz) * kc; state.ly += (p.ly - state.ly) * kc;
    state.crowd += ((p.crowd || 0) - state.crowd) * kc;
    camera.position.set(Math.sin(t * 0.25) * 0.25, state.cy, state.cz); camera.lookAt(0, state.ly, 0);
    crowdG.scale.setScalar(Math.max(0.001, state.crowd)); podium.scale.set(1 + state.crowd * 1.6, 1, 1 + state.crowd * 1.6);
    var da = dust.geometry.attributes.position;
    for (var q = 0; q < dustN; q++) { var yy = da.getY(q) + dt * 0.12; if (yy > 5) yy = -5; da.setY(q, yy); da.setX(q, da.getX(q) + Math.sin(t * 0.6 + dseed[q]) * 0.0012); }
    da.needsUpdate = true;
    rig.position.set(state.x, state.y, 0);
    rig.scale.setScalar(state.s * pop);
    spinner.rotation.y = state.ry;
    spinner.rotation.x = state.rx;
    shadow.rotation.z = 0;

    /* bubbles rise */
    var cur = SPECS[state.sizeKey];
    if (cur.bubbles.visible && !reduceMotion) {
      var b = cur.bubbles, arr = b.geometry.attributes.position, d = b.userData;
      for (var i = 0; i < arr.count; i++) {
        var y = arr.getY(i) + d.speed[i] * dt;
        if (y > d.top) y = 0.2;
        arr.setY(i, y);
        arr.setX(i, arr.getX(i) + Math.sin(t * 1.5 + d.seed[i]) * 0.0006);
      }
      arr.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }
  if (/[?&]lowpower\b/.test(location.search)) goLowPower();   /* test switch: ?lowpower */
  renderer.setAnimationLoop(tick);
  root.classList.add("webgl-ready");
})();
}).catch(function (e) { console.warn(e); document.documentElement.classList.add("no-webgl"); });
