/* Homepage intro: the corridor site's opening (intro/index.html), played full screen over the page once per visit.
   The lockup lands on the nav logo, the camera pushes down the red thread, then the overlay dissolves into the hero. */
(function () {
  var h = document.documentElement, done = false, f = null;
  function finish(fast, rect) {
    if (done) return; done = true; window.__xIntroOn = false;
    h.classList.remove('x-intro');
    if (!f) return;
    // the screen in the corridor becomes the hero console: grow the console out of that exact rect
    var xl = rect && document.querySelector('.xl');
    if (xl && xl.animate) { var b = xl.getBoundingClientRect(); if (b.width > 40) { var k = rect.w / b.width, dx = rect.x - b.left, dy = rect.y + rect.h / 2 - (b.top + b.height * k / 2);
      xl.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + k + ')', transformOrigin: '0 0', opacity: .35 }, { transform: 'none', transformOrigin: '0 0', opacity: 1 }], { duration: 1000, easing: 'cubic-bezier(.22,1,.36,1)' }); } }
    f.style.transition = 'opacity ' + (fast ? .35 : .55) + 's cubic-bezier(.4,0,.2,1)';
    f.style.opacity = '0';
    setTimeout(function () { if (f && f.parentNode) f.parentNode.removeChild(f); }, fast ? 400 : 900);
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
      if (e.data.t === 'done') finish(false, e.data.rect);
      if (e.data.t === 'skip') finish(true);
    });
    ['keydown', 'wheel', 'touchstart', 'pointerdown'].forEach(function (ev) { window.addEventListener(ev, function () { finish(true); }, { passive: true, once: true }); });
    setTimeout(function () { if (!ready) finish(true); }, 4000);   // never loaded: the page shows
    setTimeout(function () { finish(false); }, 7000);             // hard ceiling
  }
  if (document.body) main(); else document.addEventListener('DOMContentLoaded', main);
})();
