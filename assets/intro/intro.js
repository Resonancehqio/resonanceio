/* Homepage intro: the corridor site's opening (intro/index.html), played full screen over the page once per visit.
   The lockup lands on the nav logo, the camera pushes down the red thread, then the overlay dissolves into the hero. */
(function () {
  var h = document.documentElement, done = false, f = null;
  function finish(fast, rect) {
    if (done) return; done = true; window.__xIntroOn = false;
    h.classList.remove('x-intro');
    if (!f) return;
    // the new console arrives from deep in the corridor: small, far and faintly tilted, it glides to its place
    // while the corridor dissolves around it. A copy flies; the real console is shown in the same frame it lands.
    var xl = !fast && document.querySelector('.xl'), slow = !fast && !!xl;
    if (xl && xl.animate) { var b = xl.getBoundingClientRect();
      if (b.width > 40) {
        var c = xl.cloneNode(true); c.querySelectorAll('[id]').forEach(function (n) { n.removeAttribute('id'); });
        c.style.cssText = 'position:fixed;margin:0;left:' + b.left + 'px;top:' + b.top + 'px;width:' + b.width + 'px;z-index:10000;pointer-events:none;animation:none;';
        document.body.appendChild(c); xl.style.visibility = 'hidden';
        var s0 = Math.min(.36, (innerWidth * .34) / b.width), dx = innerWidth / 2 - (b.left + b.width / 2), dy = innerHeight * .46 - (b.top + b.height / 2);
        var an = c.animate([
          { transform: 'translate(' + dx + 'px,' + dy + 'px) perspective(1600px) rotateX(10deg) scale(' + s0 + ')', opacity: 0, filter: 'blur(3px) brightness(.7)' },
          { offset: .28, transform: 'translate(' + dx * .9 + 'px,' + dy * .9 + 'px) perspective(1600px) rotateX(8deg) scale(' + (s0 * 1.08) + ')', opacity: 1, filter: 'blur(0) brightness(.85)' },
          { transform: 'none', opacity: 1, filter: 'none' }
        ], { duration: 2300, easing: 'cubic-bezier(.45,0,.15,1)', fill: 'forwards' });
        an.onfinish = function () { xl.style.visibility = ''; c.remove(); };
        setTimeout(function () { xl.style.visibility = ''; if (c.parentNode) c.remove(); }, 3000);
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
      if (e.data.t === 'done') finish(false);
      if (e.data.t === 'skip') finish(true);
    });
    ['keydown', 'wheel', 'touchstart', 'pointerdown'].forEach(function (ev) { window.addEventListener(ev, function () { finish(true); }, { passive: true, once: true }); });
    setTimeout(function () { if (!ready) finish(true); }, 4000);   // never loaded: the page shows
    setTimeout(function () { finish(false); }, 7000);             // hard ceiling
  }
  if (document.body) main(); else document.addEventListener('DOMContentLoaded', main);
})();
