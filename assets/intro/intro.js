/* Homepage intro: the corridor site's opening (intro/index.html), played full screen over the page once per visit.
   One hand-off, one clock: as the logo lifts off to the nav, the page background takes over, the headline rises from
   the bottom, the rest of the hero copy follows once it has passed, and the console glides up from below.
   Only opacity and transform animate (no filters), so it all stays on the compositor. */
(function () {
  var h = document.documentElement, done = false, handed = false, f = null, cleanups = [];
  var EASE = 'cubic-bezier(.22,1,.36,1)', INOUT = 'cubic-bezier(.45,0,.25,1)';
  function hideReal(el) { el.style.setProperty('opacity', '0', 'important'); cleanups.push(function () { el.style.removeProperty('opacity'); }); }
  function flyCopy(el, z) {
    var b = el.getBoundingClientRect(); if (!b.width) return null;
    var w = document.createElement('div'); w.className = el.parentNode.className; w.setAttribute('aria-hidden', 'true');
    w.style.cssText = 'position:fixed;inset:0;margin:0;padding:0;min-height:0;height:auto;background:none;border:0;z-index:' + z + ';pointer-events:none;overflow:visible;';
    var c = el.cloneNode(true); c.removeAttribute('id'); c.querySelectorAll('[id]').forEach(function (n) { n.removeAttribute('id'); });
    var cs = getComputedStyle(el);
    c.style.cssText = 'position:absolute;margin:0;left:' + b.left + 'px;top:' + b.top + 'px;width:' + b.width + 'px;font-size:' + cs.fontSize + ';line-height:' + cs.lineHeight + ';text-align:' + cs.textAlign + ';animation:none;will-change:transform,opacity;';
    w.appendChild(c); document.body.appendChild(w); hideReal(el);
    cleanups.push(function () { if (w.parentNode) w.remove(); });
    return { c: c, b: b };
  }
  var DOS = false;   // the DecisionOS page: the corridor line resolves onto its headline
  function handoffDos() {
    var h1 = document.getElementById('x-h1'), card = document.getElementById('xStack');
    if (h1 && h1.animate) {
      h1.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 650, delay: 1250, easing: INOUT, fill: 'backwards' });
      [].forEach.call(h1.parentNode.children, function (n) { if (n === h1 || !n.animate) return;
        n.animate([{ opacity: 0, transform: 'translate3d(0,10px,0)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: 850, easing: EASE, fill: 'backwards' }); }); }
    if (card && card.animate) card.animate([{ opacity: 0, transform: 'translate3d(0,' + Math.round(innerHeight * .45) + 'px,0) scale(.82)' }, { offset: .25, opacity: 1 }, { opacity: 1, transform: 'none' }], { duration: 1900, delay: 300, easing: EASE, fill: 'backwards' });
  }
  // the corridor line: its words fly from their place in the intro, one line centred, and re-flow into the
  // headline's stacked shape on the left; there the line turns into the headline
  function flowLine(d) {
    var h1 = document.getElementById('x-h1'); if (!h1 || !d.words || !d.words.length) return;
    var hb = h1.getBoundingClientRect(), hcs = getComputedStyle(h1), hfs = parseFloat(hcs.fontSize), fs = hfs * .86;
    var lay = document.createElement('div');
    lay.style.cssText = 'position:fixed;left:' + hb.left + 'px;top:' + hb.top + 'px;width:' + hb.width + 'px;font:800 ' + fs + 'px/1 "Hanken Grotesk",system-ui,sans-serif;letter-spacing:-.035em;visibility:hidden;pointer-events:none;z-index:-1;';
    lay.innerHTML = d.words.map(function (w) { return '<span style="display:inline-block">' + w.t + '</span>'; }).join(' ');
    document.body.appendChild(lay);
    var to = [].map.call(lay.children, function (n) { return n.getBoundingClientRect(); });
    var top = to.length ? to[0].top : hb.top, off = hb.top - top; lay.remove();
    var layer = document.createElement('div'); layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = 'position:fixed;inset:0;z-index:10002;pointer-events:none;';
    var k = d.fs / fs;
    d.words.forEach(function (w, i) { var r = to[i]; if (!r) return;
      var s = document.createElement('span'); s.textContent = w.t;
      s.style.cssText = 'position:absolute;left:' + r.left + 'px;top:' + (r.top + off) + 'px;font:800 ' + fs + 'px/1 "Hanken Grotesk",system-ui,sans-serif;letter-spacing:-.035em;color:#F1EEFF;white-space:nowrap;transform-origin:0 0;will-change:transform,opacity;';
      layer.appendChild(s);
      s.animate([{ transform: 'translate3d(' + (w.x - r.left) + 'px,' + (w.y - r.top - off) + 'px,0) scale(' + k + ')' }, { transform: 'none' }], { duration: 1150, delay: i * 28, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'both' });
      s.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, delay: 1300, easing: INOUT, fill: 'forwards' });
    });
    document.body.appendChild(layer);
    setTimeout(function () { layer.remove(); }, 2100);
    cleanups.push(function () { if (layer.parentNode) layer.remove(); });
  }
  function handoff() {
    if (handed || done) return; handed = true;
    h.classList.remove('x-intro');
    // 1. the space gives way to the page's own background
    if (f) { f.style.transition = 'opacity 1.1s ' + INOUT; f.style.opacity = '0'; }
    if (DOS) { handoffDos(); return; }
    var hero = document.querySelector('.hero'), h1 = hero && hero.querySelector('h1'), xl = hero && hero.querySelector('.xl');
    var last = 0;
    // 2. the headline rises from the bottom of the screen
    if (h1 && h1.animate) { var t = flyCopy(h1, 10001); if (t) { var rise = Math.max(180, innerHeight - t.b.top);
      t.c.animate([{ opacity: 0, transform: 'translate3d(0,' + rise + 'px,0)' }, { offset: .3, opacity: 1 }, { opacity: 1, transform: 'none' }], { duration: 1500, easing: EASE, fill: 'both' }); last = 1500; } }
    // 3. the rest of the hero copy follows once the headline has passed it
    if (hero && hero.animate) [].forEach.call(hero.children, function (n) { if (n === h1 || n === xl || !n.animate) return;
      n.animate([{ opacity: 0, transform: 'translate3d(0,10px,0)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: 650, easing: EASE, fill: 'backwards' }); });
    // 4. the console glides up from below the buttons
    if (xl && xl.animate) { var k = flyCopy(xl, 10000); if (k) { var b = k.b, s0 = Math.min(.5, (innerWidth * .46) / b.width), dy = innerHeight * .92 - (b.top + b.height / 2);
      k.c.style.transformOrigin = '50% 50%';
      k.c.animate([{ opacity: 0, transform: 'translate3d(' + (innerWidth / 2 - (b.left + b.width / 2)) + 'px,' + dy + 'px,0) scale(' + s0 + ')' }, { offset: .25, opacity: 1 }, { opacity: 1, transform: 'none' }], { duration: 1900, delay: 300, easing: EASE, fill: 'both' });
      last = Math.max(last, 2200); } }
    // 5. the real elements take over in the same frame the copies land
    setTimeout(function () { cleanups.forEach(function (fn) { fn(); }); cleanups = []; }, last + 30);
  }
  function finish(fast) {
    if (done) return;
    if (fast) { cleanups.forEach(function (fn) { fn(); }); cleanups = []; }
    else if (!handed) handoff();
    done = true; window.__xIntroOn = false; h.classList.remove('x-intro');
    if (!f) return;
    if (fast) { f.style.transition = 'opacity .35s ' + INOUT; f.style.opacity = '0'; }
    setTimeout(function () { if (f && f.parentNode) f.parentNode.removeChild(f); }, fast ? 400 : 1300);
    try { window.dispatchEvent(new Event('x-intro-done')); } catch (e) {}
  }
  function main() {
    window.__xIntroOn = true;
    DOS = !!document.querySelector('.x-hero #x-h1');
    f = document.createElement('iframe');
    f.src = DOS ? '/intro/?line=1' : '/intro/';
    f.title = 'Intro'; f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1;
    f.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;border:0;z-index:9999;background:#09080F;opacity:1;will-change:opacity;';
    document.body.appendChild(f);
    var ready = false;
    window.addEventListener('message', function (e) {
      if (e.origin !== location.origin || !e.data || e.data.src !== 'xintro') return;
      if (e.data.t === 'ready') ready = true;
      if (e.data.t === 'line') flowLine(e.data);
      if (e.data.t === 'title') handoff();
      if (e.data.t === 'done') finish(false);
      if (e.data.t === 'skip') finish(true);
    });
    ['keydown', 'wheel', 'touchstart', 'pointerdown'].forEach(function (ev) { window.addEventListener(ev, function () { finish(true); }, { passive: true, once: true }); });
    setTimeout(function () { if (!ready) finish(true); }, 4000);   // never loaded: the page shows
    setTimeout(function () { finish(false); }, 7000);             // hard ceiling
  }
  if (document.body) main(); else document.addEventListener('DOMContentLoaded', main);
})();
