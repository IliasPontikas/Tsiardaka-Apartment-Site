/**
 * marquee.js — Infinite dual-row marquee for reviews/logos
 * Requires: .reviews-row elements with data-direction="left|right"
 * Requires: GSAP (global)
 * Pauses on hover and touch-hold; resumes on mouse-leave / touch-end
 */

export const ReviewsMarquee = {
    init() {
        var rows = document.querySelectorAll('.reviews-row');
        if (!rows.length || typeof gsap === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // No auto-scrolling: let visitors scroll the reviews themselves
            var wrap = document.querySelector('.reviews-marquee');
            if (wrap) wrap.classList.add('is-static');
            return;
        }

        rows.forEach(function(row) {
            var cards      = row.innerHTML;
            row.innerHTML  = cards + cards; // duplicate for seamless loop

            var direction  = row.getAttribute('data-direction');
            var totalWidth = row.scrollWidth / 2;
            var dur        = 40 + Math.random() * 10;
            var fromX      = direction === 'right' ? -totalWidth : 0;
            var toX        = direction === 'right' ?  0          : -totalWidth;

            var tween = gsap.fromTo(row, { x: fromX }, { x: toX, duration: dur, ease: 'none', repeat: -1 });

            row.addEventListener('mouseenter',  function() { tween.pause();  });
            row.addEventListener('mouseleave',  function() { tween.resume(); });
            row.addEventListener('touchstart',  function() { tween.pause();  }, { passive: true });
            row.addEventListener('touchend',    function() { tween.resume(); }, { passive: true });
        });
    }
};
