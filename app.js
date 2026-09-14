// ClippedNow.gg promo site — quiet progressive enhancement only.
(function () {
  'use strict';

  // Scroll reveal: fade + small rise, then unobserve (fires once per element).
  try {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = document.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function (el) { io.observe(el); });
    }
  } catch {}
  // Clip preview toggles: click a thumbnail (or its play button) to preview
  // muted, click again to pause. Only one plays at a time.
  try {
    var wraps = document.querySelectorAll('.mock-vidwrap');
    wraps.forEach(function (wrap) {
      var vid = wrap.querySelector('video');
      if (!vid) return;
      var toggle = function () {
        try {
          if (vid.paused) {
            wraps.forEach(function (other) {
              var ov = other.querySelector('video');
              if (ov && ov !== vid && !ov.paused) { ov.pause(); other.classList.remove('playing'); }
            });
            var p = vid.play();
            if (p && p.catch) p.catch(function () {});
            wrap.classList.add('playing');
          } else {
            vid.pause();
            wrap.classList.remove('playing');
          }
        } catch {}
      };
      vid.addEventListener('click', toggle);
      var btn = wrap.querySelector('[data-play]');
      if (btn) btn.addEventListener('click', toggle);
      vid.addEventListener('pause', function () { wrap.classList.remove('playing'); });
    });
  } catch {}
})();
