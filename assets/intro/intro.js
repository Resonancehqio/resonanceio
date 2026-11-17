/* Homepage intro: the corridor site's opening (intro/index.html), played full screen over the page once per visit.
   The lockup lands on the nav logo, the camera pushes down the red thread, then the overlay dissolves into the hero. */
(function () {
  var h = document.documentElement, done = false, f = null;
  // the homepage headline rises over the corridor as the logo lifts off, so the page is already arriving
  var tDone = false;
  function title() {
    if (tDone || done) return; tDone = true;
    // the page's own background takes over quickly while the headline rises; the space falls away
    var xl0 = document.querySelector('.xl'); if (xl0) xl0.style.setProperty('opacity', '0', 'important');   // the console waits for its own entrance
    h.classList.remove('x-intro'); if (f) { f.style.transition = 'opacity .85s cubic-bezier(.4,0,.2,1)'; f.style.opacity = '0'; }
    var h1 = document.querySelector('.hero h1'); if (!h1 || !h1.animate) return;
    var b = h1.getBoundingClientRect(); if (!b.width) return;
    var w = document.createElement('div'); w.className = 'hero'; w.setAttribute('aria-hidden', 'true');
    w.style.cssText = 'position:fixed;inset:0;margin:0;padding:0;min-height:0;height:auto;background:none;z-index:10001;pointer-events:none;';
    var c = h1.cloneNode(true); c.removeAttribute('id');
    var cs = getComputedStyle(h1);
    c.style.cssText = 'position:absolute;margin:0;left:' + b.left + 'px;top:' + b.top + 'px;width:' + b.width + 'px;font-size:' + cs.fontSize + ';line-height:' + cs.lineHeight + ';text-align:' + cs.textAlign + ';animation:none;';
    w.appendChild(c); document.body.appendChild(w); h1.style.visibility = 'hidden';
    var lines = c.children.length ? [].slice.call(c.children) : [c];
    // a plain fade, starting just after the page background begins to take over
    c.animate([{ opacity: 0, filter: 'blur(4px)' }, { opacity: 1, filter: 'none' }], { duration: 900, delay: 280, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' });
    // the rest of the hero copy comes in with it
    [].forEach.call(h1.parentNode.children, function (n) { if (n === h1 || n.classList.contains('xl') || !n.animate) return; n.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 380, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'backwards' }); });
    var end = function () { h1.style.visibility = ''; if (w.parentNode) w.remove(); };
    setTimeout(end, 2900);
    window.__xTitleEnd = end;
  }
  function finish(fast, rect) {
    if (done) return; done = true; window.__xIntroOn = false;
    if (fast && window.__xTitleEnd) window.__xTitleEnd();
    if (fast) { var xs = document.querySelector('.xl'); if (xs) xs.style.removeProperty('opacity'); }
    h.classList.remove('x-intro');
    if (!f) return;
    // the new console arrives from deep in the corridor: small, far and faintly tilted, it glides to its place
    // while the corridor dissolves around it. A copy flies; the real console is shown in the same frame it lands.
    var xl = !fast && document.querySelector('.xl'), slow = !fast && !!xl;
    if (xl && xl.animate) { var b = xl.getBoundingClientRect();
      if (b.width > 40) {
        var c = xl.cloneNode(true); c.querySelectorAll('[id]').forEach(function (n) { n.removeAttribute('id'); });
        c.style.cssText = 'position:fixed;margin:0;left:' + b.left + 'px;top:' + b.top + 'px;width:' + b.width + 'px;z-index:10000;pointer-events:none;animation:none;';
        document.body.appendChild(c); xl.style.setProperty('opacity', '0', 'important');
        var s0 = Math.min(.36, (innerWidth * .34) / b.width), dx = innerWidth / 2 - (b.left + b.width / 2), dy = innerHeight * .8 - (b.top + b.height / 2);
        var an = c.animate([
          { transform: 'translate(' + dx + 'px,' + dy + 'px) perspective(1600px) rotateX(10deg) scale(' + s0 + ')', opacity: 0, filter: 'blur(3px) brightness(.7)' },
          { offset: .28, transform: 'translate(' + dx * .9 + 'px,' + dy * .9 + 'px) perspective(1600px) rotateX(8deg) scale(' + (s0 * 1.08) + ')', opacity: 1, filter: 'blur(0) brightness(.85)' },
          { transform: 'none', opacity: 1, filter: 'none' }
        ], { duration: 2300, easing: 'cubic-bezier(.45,0,.15,1)', fill: 'forwards' });
        an.onfinish = function () { xl.style.removeProperty('opacity'); c.remove(); };
        setTimeout(function () { xl.style.removeProperty('opacity'); if (c.parentNode) c.remove(); }, 3000);
      } }
    f.style.transition = 'opacity ' + (fast ? .35 : 1.8) + 's cubic-bezier(.4,0,.2,1)' + (fast ? '' : ' .6s');
    f.style.opacity = '0';
    setTimeout(function () { if (f && f.parentNode) f.parentNode.removeChild(f); }, fast ? 400 : 2300);
    try { window.dispatchEvent(new Event('x-intro-done')); } catch (e) {}
  }
  function main() {
    window.__xIntroOn = true;
    f = document.createElement('iframe');
    f.src = '/intro/';
    f.title = 'Intro'; f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1;
    f.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;border:0;z-index:9999;background:#09080F;opacity:1;';
    document.body.appendChild(f);
    var ready = false;
    window.addEventListener('message', function (e) {
      if (e.origin !== location.origin || !e.data || e.data.src !== 'xintro') return;
      if (e.data.t === 'ready') ready = true;
      if (e.data.t === 'title') title();
      if (e.data.t === 'done') finish(false);
      if (e.data.t === 'skip') finish(true);
    });
    ['keydown', 'wheel', 'touchstart', 'pointerdown'].forEach(function (ev) { window.addEventListener(ev, function () { finish(true); }, { passive: true, once: true }); });
    setTimeout(function () { if (!ready) finish(true); }, 4000);   // never loaded: the page shows
    setTimeout(function () { finish(false); }, 7000);             // hard ceiling
  }
  if (document.body) main(); else document.addEventListener('DOMContentLoaded', main);
})();
