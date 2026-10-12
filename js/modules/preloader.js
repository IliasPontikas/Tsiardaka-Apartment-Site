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
        var onReveal = options.onReveal || null;

        // The full branded moment (roof drawn, logo, tagline) is shown once per browser session.
        // A tiny script in <head> adds "no-preloader" to <html> on every later page load of the same session
        // (refresh, reload, switching Greek/English), so the screen never even flashes. Reduced motion: almost none.
        if (document.documentElement.classList.contains('no-preloader')) {
            el.remove();
            // no loading screen: still let the hero text appear letter by letter
            setTimeout(function() { if (typeof onReveal === 'function') onReveal(); }, 150);
            return;
        }
        try { sessionStorage.setItem('preloader-seen', '1'); } catch (e) {}

        var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var MIN_DISPLAY = options.minDisplay ?? (reduced ? 250 : 2200);

        var interval = setInterval(function() {
            progress += Math.random() * 10;
            if (progress > 90) progress = 90;
            if (bar) bar.style.width = progress + '%';
        }, 200);

        var revealed = false;
        var reveal = function() {
            if (revealed) return;
            revealed = true;
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

        // Fail-safe: never keep visitors on the loading screen, even if a slow outside file delays the page "load" event
        setTimeout(reveal, 4500);

        if (document.readyState === 'complete') {
            reveal();
        } else {
            window.addEventListener('load', reveal);
        }
    }
};
