/**
 * preloader.js — Branded loading screen
 * Requires: #preloader element with .preloader-bar child, .hidden CSS class
 * Optional: HeroAnimations.play() called on reveal
 */

export const Preloader = {
    init(options = {}) {
        var el = document.getElementById('preloader');
        if (!el) return;
        var bar = el.querySelector('.preloader-bar');
        var progress = 0;
        var startTime = Date.now();
        // First visit (or after 14 days): short branded moment. Returning visitors / reduced motion: almost instant.
        var seen = false;
        try {
            var last = parseInt(localStorage.getItem('preloader-seen'), 10) || 0;
            seen = Date.now() - last < 14 * 24 * 3600 * 1000;
            localStorage.setItem('preloader-seen', String(Date.now()));
        } catch (e) {}
        var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var MIN_DISPLAY = options.minDisplay ?? ((seen || reduced) ? 250 : 1400);
        var onReveal = options.onReveal || null;

        var interval = setInterval(function() {
            progress += Math.random() * 10;
            if (progress > 90) progress = 90;
            if (bar) bar.style.width = progress + '%';
        }, 200);

        var reveal = function() {
            var elapsed = Date.now() - startTime;
            var remaining = Math.max(0, MIN_DISPLAY - elapsed);
            setTimeout(function() {
                clearInterval(interval);
                if (bar) bar.style.width = '100%';
                setTimeout(function() {
                    el.classList.add('hidden');
                    setTimeout(function() { el.remove(); }, 800);
                    if (typeof onReveal === 'function') onReveal();
                }, 300);
            }, remaining);
        };

        if (document.readyState === 'complete') {
            reveal();
        } else {
            window.addEventListener('load', reveal);
        }
    }
};
