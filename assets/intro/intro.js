/* Resonance homepage intro.
   Logo build-in (sprite sheet) → mark glides into the nav logo (same-frame hand-off) → corridor fly-through (Three.js)
   → dissolve into the hero. One progress clock drives every stage. Loaded only when <html> has .x-intro (first visit
   this session, no hash, motion allowed, not framed). Every failure path reveals the page. */
(function () {
  'use strict';
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', main); } else { main(); }
  function main() {
  var html = document.documentElement;
  if (!html.classList.contains('x-intro')) return;
  window.__xIntroOn = true;

  var clamp = function (x, a, b) { return Math.min(b === undefined ? 1 : b, Math.max(a || 0, x)); };
  var ss = function (a, b, x) { var t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  var eio = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var eo = function (t) { return 1 - Math.pow(1 - clamp(t), 3); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  var PHONE = innerWidth < 760;
  var SHEET = '/assets/intro/logo-sheet.webp', COLS = 9, ROWS = 5, N = 45, CW = 300, CH = 283;
  var FIN = [0.0135, 0.0119, 0.9854, 1.0];              // final mark bounds inside a cell (fractions)
  // timeline (ms)
  var T_BUILD = 2300, T_GLIDE = 650, T_CORR = PHONE ? 0 : 1900, T_OUT = 650;
  var OUT_AT = PHONE ? T_BUILD + T_GLIDE * .45 : T_BUILD + T_GLIDE + T_CORR;
  var T_TOTAL = Math.max(OUT_AT + T_OUT, T_BUILD + T_GLIDE + 40);

  var done = false, raf = 0, t0 = 0, three = null, nav = null, navLogo = null, navPrev = null;
  var hardStop = setTimeout(function () { finish(true); }, T_TOTAL + 2500);

  // ── overlay ──
  var ov = document.createElement('div');
  ov.id = 'xIntro';
  ov.setAttribute('aria-hidden', 'true');
  ov.innerHTML =
    '<canvas class="xi-3d"></canvas>' +
    '<div class="xi-glow"></div>' +
    '<canvas class="xi-logo"></canvas>' +
    '<div class="xi-word">Resonance</div>' +
    '<button type="button" class="xi-skip" aria-label="Skip intro">Skip intro</button>';
  var css = document.createElement('style');
  css.textContent =
    '#xIntro{position:fixed;inset:0;z-index:9999;background:#09080F;overflow:hidden;opacity:1}' +
    '#xIntro .xi-3d{position:absolute;inset:0;width:100%;height:100%;opacity:0}' +
    '#xIntro .xi-glow{position:absolute;left:50%;top:46%;width:720px;height:720px;margin:-360px 0 0 -360px;border-radius:50%;background:radial-gradient(closest-side,rgba(124,58,237,.35),rgba(20,184,166,.08) 55%,transparent 72%);opacity:0;pointer-events:none}' +
    '#xIntro .xi-logo{position:fixed;left:0;top:0;transform-origin:0 0;will-change:transform,opacity;z-index:2}' +
    '#xIntro .xi-word{position:absolute;left:0;right:0;text-align:center;font-family:Fraunces,Georgia,serif;font-weight:300;font-size:clamp(28px,4vw,44px);letter-spacing:-.02em;color:#F1EEFF;opacity:0;font-variation-settings:"opsz" 144}' +
    '#xIntro .xi-skip{position:absolute;right:20px;bottom:20px;z-index:3;padding:8px 14px;border:0;border-radius:999px;font:500 13px/1 "Instrument Sans",system-ui,sans-serif;color:#D3CCEC;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 .5px rgba(120,100,220,.4);cursor:pointer}' +
    '#xIntro .xi-skip:hover{background:rgba(255,255,255,.12);color:#fff}' +
    'html.x-intro-nav nav{z-index:10000 !important}';
  document.head.appendChild(css);
  document.body.appendChild(ov);
  var c3 = ov.querySelector('.xi-3d'), glow = ov.querySelector('.xi-glow'), lc = ov.querySelector('.xi-logo'), word = ov.querySelector('.xi-word'), skip = ov.querySelector('.xi-skip');
  var lx = lc.getContext('2d');

  // ── nav hand-off target ──
  nav = document.querySelector('body > nav') || document.querySelector('nav');
  navLogo = nav && (nav.querySelector('.nav-logo svg') || nav.querySelector('svg'));
  if (nav) { navPrev = nav.style.opacity; nav.style.transition = 'none'; nav.style.opacity = '0'; html.classList.add('x-intro-nav'); }
  if (navLogo) navLogo.style.opacity = '0';

  // ── skip on any input ──
  function onInput(e) { if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return; finish(false); }
  ['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach(function (ev) { addEventListener(ev, onInput, { passive: true, capture: true }); });
  skip.addEventListener('click', function () { finish(false); });

  // ── sprite ──
  var img = new Image(), imgReady = false;
  img.decoding = 'async';
  img.onload = function () { (img.decode ? img.decode() : Promise.resolve()).then(function () { imgReady = true; begin(); }, function () { imgReady = true; begin(); }); };
  img.onerror = function () { finish(true); };
  img.src = SHEET;
  var waitSprite = setTimeout(function () { if (!imgReady) finish(true); }, 1400);

  // ── Three.js (desktop only), requested in parallel ──
  if (!PHONE) {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js';
    s.async = true;
    s.onload = function () { try { three = buildCorridor(); } catch (e) { three = null; } };
    document.head.appendChild(s);
  }

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var LOGO_H = Math.round(Math.min(PHONE ? 180 : 250, innerHeight * 0.34));
  var LOGO_W = Math.round(LOGO_H * CW / CH);
  lc.width = Math.round(LOGO_W * DPR); lc.height = Math.round(LOGO_H * DPR);
  lc.style.width = LOGO_W + 'px'; lc.style.height = LOGO_H + 'px';
  var startX = (innerWidth - LOGO_W) / 2, startY = innerHeight * 0.44 - LOGO_H / 2;
  word.style.top = (startY + LOGO_H + 18) + 'px';

  function drawFrame(i) {
    i = clamp(Math.round(i), 0, N - 1);
    var sx = (i % COLS) * CW, sy = Math.floor(i / COLS) * CH;
    lx.clearRect(0, 0, lc.width, lc.height);
    lx.drawImage(img, sx, sy, CW, CH, 0, 0, lc.width, lc.height);
  }

  function targetRect() {
    if (!navLogo) return null;
    var r = navLogo.getBoundingClientRect();
    if (!r.width) return null;
    // fit the final mark's bounds (FIN) into the nav logo box, centred, uniform scale
    var mw = (FIN[2] - FIN[0]) * LOGO_W, mh = (FIN[3] - FIN[1]) * LOGO_H;
    var k = Math.min(r.width / mw, r.height / mh);
    var x = r.left + r.width / 2 - (FIN[0] * LOGO_W + mw / 2) * k;
    var y = r.top + r.height / 2 - (FIN[1] * LOGO_H + mh / 2) * k;
    return { x: x, y: y, k: k };
  }

  var started = false;
  function begin() { if (started || done) return; started = true; clearTimeout(waitSprite); t0 = performance.now(); raf = requestAnimationFrame(tick); }

  var handed = false;
  function tick(now) {
    if (done) return;
    var t = now - t0;
    // 1 · build-in
    var pb = clamp(t / T_BUILD);
    drawFrame(eio(pb) * (N - 1));
    glow.style.opacity = (ss(0, .4, pb) * (1 - ss(T_BUILD, T_BUILD + T_GLIDE, t))).toFixed(3);
    word.style.opacity = (ss(.62, .9, pb) * (1 - ss(T_BUILD, T_BUILD + T_GLIDE * .5, t))).toFixed(3);
    word.style.transform = 'translateY(' + ((1 - ss(.62, .9, pb)) * 10) + 'px)';
    // 2 · glide into the nav logo, nav fades in around it, same-frame swap at the end
    var g = eo((t - T_BUILD) / T_GLIDE), tr = targetRect();
    if (tr && t >= T_BUILD) {
      var x = lerp(startX, tr.x, g), y = lerp(startY, tr.y, g), k = lerp(1, tr.k, g);
      lc.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + k + ')';
      if (nav) nav.style.opacity = ss(.55, 1, g).toFixed(3);
      if (g >= 1 && !handed) {
        handed = true;
        if (navLogo) { navLogo.style.transition = 'opacity .14s linear'; navLogo.style.opacity = '1'; }
        lc.style.transition = 'opacity .14s linear'; lc.style.opacity = '0';
      }
    } else {
      lc.style.transform = 'translate(' + startX + 'px,' + startY + 'px) scale(1)';
    }
    // 3 · corridor fly-through
    var tc = t - T_BUILD - T_GLIDE * .35;
    if (three && T_CORR) {
      c3.style.opacity = ss(0, 380, tc).toFixed(3);
      three.render(clamp(tc / (T_CORR + T_GLIDE * .35)));
    }
    // 4 · dissolve into the hero
    var to = t - OUT_AT;
    if (to > 0) {
      var o = eo(to / T_OUT);
      ov.style.opacity = (1 - o).toFixed(3);
      if (three) c3.style.transform = 'scale(' + (1 + .06 * o) + ')';
    }
    if (t >= T_TOTAL) { finish(false); return; }
    raf = requestAnimationFrame(tick);
  }

  function finish(failed) {
    if (done) return; done = true;
    clearTimeout(hardStop); clearTimeout(waitSprite); cancelAnimationFrame(raf);
    ['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach(function (ev) { removeEventListener(ev, onInput, { capture: true }); });
    if (navLogo) { navLogo.style.transition = 'opacity .2s'; navLogo.style.opacity = ''; }
    if (nav) { nav.style.transition = 'opacity .25s'; nav.style.opacity = navPrev || ''; }
    ov.style.transition = 'opacity ' + (failed ? .25 : .3) + 's ease';
    ov.style.opacity = '0';
    html.classList.remove('x-intro');
    setTimeout(function () {
      html.classList.remove('x-intro-nav');
      if (nav) nav.style.transition = '';
      if (three) three.dispose();
      if (ov.parentNode) ov.parentNode.removeChild(ov);
      if (css.parentNode) css.parentNode.removeChild(css);
    }, 360);
  }

  // ── corridor: floating product plates along a lit thread ──
  function buildCorridor() {
    var THREE = window.THREE; if (!THREE) return null;
    var W = innerWidth, H = innerHeight;
    var pr = Math.min(window.devicePixelRatio || 1, Math.sqrt(2.4e6 / (W * H)));
    var renderer = new THREE.WebGLRenderer({ canvas: c3, antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(pr); renderer.setSize(W, H, false); renderer.setClearColor(0x09080F, 1);
    var scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x09080F, 6, 30);
    var cam = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
    var disposables = [];

    function plate(kind, title) {
      var cv = document.createElement('canvas'); cv.width = 640; cv.height = 400; var x = cv.getContext('2d');
      var r = function (X, Y, w, h, rad) { x.beginPath(); x.moveTo(X + rad, Y); x.arcTo(X + w, Y, X + w, Y + h, rad); x.arcTo(X + w, Y + h, X, Y + h, rad); x.arcTo(X, Y + h, X, Y, rad); x.arcTo(X, Y, X + w, Y, rad); x.closePath(); };
      r(4, 4, 632, 392, 22); x.fillStyle = '#1A1630'; x.fill(); x.lineWidth = 2; x.strokeStyle = 'rgba(167,139,250,.55)'; x.stroke();
      x.fillStyle = '#110E1E'; r(4, 4, 632, 46, 22); x.fill(); x.fillRect(4, 30, 632, 20);
      ['#FF5F57', '#FEBC2E', '#28C840'].forEach(function (c, i) { x.beginPath(); x.arc(30 + i * 18, 27, 5.5, 0, 7); x.fillStyle = c; x.fill(); });
      x.font = '500 15px "JetBrains Mono", monospace'; x.fillStyle = '#A39BC9'; x.fillText(title, 96, 32);
      var A = '#5EEAD4', P = '#A78BFA', AM = '#F59E0B', G = '#34D399', TX = '#F1EEFF', DIM = '#7E72B8';
      if (kind === 'tiles') {
        for (var i = 0; i < 60; i++) { var cx = 30 + (i % 12) * 49, cy = 76 + Math.floor(i / 12) * 60; r(cx, cy, 42, 48, 8); var m = (i * 7) % 5; x.fillStyle = m === 0 ? 'rgba(94,234,212,.45)' : (m === 1 ? 'rgba(245,158,11,.4)' : (m < 4 ? 'rgba(167,139,250,.28)' : 'rgba(255,255,255,.04)')); x.fill(); }
      } else if (kind === 'rows') {
        var nm = ['Johnson · 3BR · wheelchair', 'Rivera · 2BR · ground floor', 'Washington · 2BR', 'Okafor · 4BR · RAD', 'Chen · 1BR · senior'], bd = [['Matched', A], ['Matched', A], ['Moved in', G], ['Docs', AM], ['Scheduled', P]];
        nm.forEach(function (n, i) { var y = 72 + i * 62; r(28, y, 584, 50, 10); x.fillStyle = 'rgba(255,255,255,.04)'; x.fill(); x.font = '500 19px "Instrument Sans", sans-serif'; x.fillStyle = TX; x.fillText(n, 48, y + 32); r(470, y + 12, 124, 28, 14); x.fillStyle = bd[i][1] + '33'; x.fill(); x.font = '600 14px "Instrument Sans", sans-serif'; x.fillStyle = bd[i][1]; x.fillText(bd[i][0], 488, y + 31); });
      } else if (kind === 'bars') {
        [['Plan A · hold Phase 2', 62, '#F87171'], ['Plan B · advance Phase 3', 18, G], ['Plan C · pull Phase 4', 31, AM]].forEach(function (p, i) { var y = 86 + i * 96; x.font = '600 19px "Instrument Sans", sans-serif'; x.fillStyle = TX; x.fillText(p[0], 36, y); x.font = '600 20px "JetBrains Mono", monospace'; x.fillStyle = p[2]; x.fillText(String(p[1]), 560, y); r(36, y + 16, 568, 14, 7); x.fillStyle = 'rgba(255,255,255,.07)'; x.fill(); r(36, y + 16, 568 * p[1] / 62, 14, 7); x.fillStyle = p[2]; x.fill(); });
        r(36, 356, 568, 28, 8); x.fillStyle = 'rgba(20,184,166,.18)'; x.fill(); x.font = '600 15px "Instrument Sans", sans-serif'; x.fillStyle = A; x.fillText('✓ Plan B recommended · 71% fewer disruptions', 52, 376);
      } else if (kind === 'score') {
        x.font = '300 112px Fraunces, Georgia, serif'; x.fillStyle = A; x.fillText('97%', 36, 190); x.font = '500 18px "Instrument Sans", sans-serif'; x.fillStyle = DIM; x.fillText('Unit 4B · Building 7', 40, 226);
        ['3-bedroom requirement', 'Wheelchair accessible', 'HCV limit $1,842/mo', 'Phase 2 eligible'].forEach(function (c, i) { var y = 92 + i * 52; x.beginPath(); x.arc(372, y, 11, 0, 7); x.fillStyle = A; x.fill(); x.font = '500 17px "Instrument Sans", sans-serif'; x.fillStyle = TX; x.fillText(c, 394, y + 6); });
      } else if (kind === 'gantt') {
        [['Phase 1', .04, .3, 'rgba(20,184,166,.6)'], ['Phase 2', .42, .34, P], ['Phase 3', .7, .26, 'rgba(167,139,250,.45)']].forEach(function (g, i) { var y = 100 + i * 78; x.font = '500 17px "Instrument Sans", sans-serif'; x.fillStyle = TX; x.fillText(g[0], 36, y + 20); r(150, y, 460, 30, 8); x.fillStyle = 'rgba(255,255,255,.05)'; x.fill(); r(150 + 460 * g[1], y, 460 * g[2], 30, 8); x.fillStyle = g[3]; x.fill(); });
        x.font = '600 16px "JetBrains Mono", monospace'; x.fillStyle = AM; x.fillText('+3 wks · 60 households re-sequenced', 150, 350);
      } else {
        ['Plan B applied · 18 households re-sequenced', 'Notices queued for every household', 'URA documentation updated', 'Audit trail · timestamped'].forEach(function (l, i) { var y = 92 + i * 70; x.beginPath(); x.arc(46, y, 8, 0, 7); x.fillStyle = A; x.fill(); x.font = '500 14px "JetBrains Mono", monospace'; x.fillStyle = DIM; x.fillText('09:1' + (5 + (i > 1 ? 1 : 0)), 70, y - 10); x.font = '500 19px "Instrument Sans", sans-serif'; x.fillStyle = TX; x.fillText(l, 70, y + 18); });
      }
      var tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
      var mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: .96, side: THREE.DoubleSide });
      var geo = new THREE.PlaneGeometry(3.2, 2.0);
      disposables.push(tex, mat, geo);
      return new THREE.Mesh(geo, mat);
    }

    var KINDS = [['rows', 'households / riverside-phase-2'], ['tiles', 'units / board'], ['score', 'matching / johnson-1147'], ['gantt', 'construction / schedule'], ['bars', 'simulations / phase-reorder'], ['log', 'decisions / log'], ['tiles', 'units / phase-2'], ['rows', 'households / caseload'], ['score', 'matching / rivera-0882'], ['bars', 'simulations / budget']];
    var plates = [];
    KINDS.forEach(function (k, i) {
      var m = plate(k[0], k[1]); var side = i % 2 ? 1 : -1;
      m.position.set(side * (3.1 + (i % 3) * .4), (i % 4 < 2 ? .85 : -.9) + Math.sin(i * 1.7) * .25, -5 - i * 3.6); m.scale.setScalar(.82);
      m.rotation.y = -side * .42; m.rotation.x = (i % 4 < 2 ? -.06 : .06);
      scene.add(m); plates.push(m);
    });

    // the thread: purple → teal, drawn ahead of the camera
    var pts = []; for (var i = 0; i <= 40; i++) { var z = 2 - i * 1.05; pts.push(new THREE.Vector3(Math.sin(i * .45) * .7, -0.95 + Math.cos(i * .33) * .3, z)); }
    var curve = new THREE.CatmullRomCurve3(pts);
    var tube = new THREE.TubeGeometry(curve, 400, .009, 6, false);
    var cols = []; var pos = tube.attributes.position; var c1 = new THREE.Color(0xA78BFA), c2 = new THREE.Color(0x5EEAD4), tmp = new THREE.Color();
    for (var v = 0; v < pos.count; v++) { var f = clamp((2 - pos.getZ(v)) / 42); tmp.copy(c1).lerp(c2, f); cols.push(tmp.r, tmp.g, tmp.b); }
    tube.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    var tmat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: .95 });
    var thread = new THREE.Mesh(tube, tmat); scene.add(thread); disposables.push(tube, tmat);
    var totalIdx = tube.index.count;
    // head glow
    var gc = document.createElement('canvas'); gc.width = gc.height = 64; var gx = gc.getContext('2d'); var grd = gx.createRadialGradient(32, 32, 0, 32, 32, 32); grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(.25, 'rgba(94,234,212,.9)'); grd.addColorStop(1, 'rgba(94,234,212,0)'); gx.fillStyle = grd; gx.fillRect(0, 0, 64, 64);
    var gtex = new THREE.CanvasTexture(gc); var smat = new THREE.SpriteMaterial({ map: gtex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true });
    var head = new THREE.Sprite(smat); head.scale.set(.42, .42, 1); scene.add(head); disposables.push(gtex, smat);
    // dust
    var dp = []; for (var d = 0; d < 700; d++) dp.push((Math.random() - .5) * 14, (Math.random() - .5) * 8, 4 - Math.random() * 44);
    var dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.Float32BufferAttribute(dp, 3));
    var dm = new THREE.PointsMaterial({ color: 0xC4B5FD, map: gtex, size: .07, transparent: true, opacity: .6, depthWrite: false, blending: THREE.AdditiveBlending, alphaTest: .01 });
    scene.add(new THREE.Points(dg, dm)); disposables.push(dg, dm);

    var look = new THREE.Vector3();
    function render(q) {
      var e = eio(clamp(q));
      var z = lerp(6, -30, e);
      cam.position.set(Math.sin(e * 3.1) * .35, .15 + Math.sin(e * 2.2) * .12, z);
      look.set(Math.sin(e * 3.1 + .5) * .25, 0, z - 6); cam.lookAt(look);
      var u = clamp(e * 1.08), u0 = clamp((2 - (z - 1.5)) / 42); var i0 = Math.floor(totalIdx * Math.min(u0, u) / 3) * 3; tube.setDrawRange(i0, Math.max(0, Math.floor(totalIdx * u / 3) * 3 - i0));
      var hp = curve.getPointAt(clamp(u)); head.position.copy(hp);
      plates.forEach(function (p) { var dz = p.position.z - z; p.material.opacity = .96 * ss(-30, -12, dz) * (1 - ss(-1.2, .8, dz)); });
      renderer.render(scene, cam);
    }
    function dispose() { disposables.forEach(function (o) { try { o.dispose(); } catch (e) {} }); try { renderer.dispose(); renderer.forceContextLoss(); } catch (e) {} }
    render(0);
    return { render: render, dispose: dispose };
  }
  }
})();
