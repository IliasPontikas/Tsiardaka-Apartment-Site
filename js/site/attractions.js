/**
 * attractions.js — Swipeable "nearby sights" carousel
 * Native horizontal scroll + CSS scroll-snap (touch swipe, trackpad, keyboard focus all just work).
 * This script only adds: depth/parallax while scrolling, arrows, progress bar + counter, mouse drag.
 * Requires: .attractions-track with .attraction-card children; optional .attractions-arrow-prev/next,
 *           .attractions-progress-bar, .attractions-count, .attractions-scroll-hint
 */

export const Attractions3D = {
    init() {
        var track = document.querySelector('.attractions-track');
        if (!track) return;
        var cards = Array.prototype.slice.call(track.querySelectorAll('.attraction-card'));
        if (!cards.length) return;

        var prevBtn = document.querySelector('.attractions-arrow-prev');
        var nextBtn = document.querySelector('.attractions-arrow-next');
        var bar     = document.querySelector('.attractions-progress-bar');
        var counter = document.querySelector('.attractions-count');
        var hint    = document.querySelector('.attractions-scroll-hint');
        var reduce  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var ticking = false;
        var interacted = false;

        function step() {
            var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
            return cards[0].offsetWidth + gap;
        }

        function update() {
            ticking = false;
            var phone  = window.innerWidth <= 768;
            var rect   = track.getBoundingClientRect();
            var centre = rect.left + rect.width / 2;

            if (!reduce) {
                cards.forEach(function(card) {
                    var r   = card.getBoundingClientRect();
                    var off = ((r.left + r.width / 2) - centre) / rect.width; // -1 .. 1 across the track
                    var a   = Math.min(1, Math.abs(off));
                    if (phone) { card.style.transform = ''; card.style.opacity = ''; }
                    else {
                        card.style.transform = 'scale(' + (1 - a * 0.06).toFixed(3) + ')';
                        card.style.opacity   = (1 - a * 0.22).toFixed(3);
                    }
                    var img = card.querySelector('.attraction-img img');
                    if (img) img.style.transform = 'translateX(' + (-off * 26).toFixed(1) + 'px) scale(1.12)';
                });
            }

            var max = track.scrollWidth - track.clientWidth;
            var p   = max > 0 ? Math.min(1, Math.max(0, track.scrollLeft / max)) : 1;
            if (bar) bar.style.transform = 'scaleX(' + (1 / cards.length + (1 - 1 / cards.length) * p).toFixed(3) + ')';
            if (prevBtn) prevBtn.disabled = track.scrollLeft <= 2;
            if (nextBtn) nextBtn.disabled = track.scrollLeft >= max - 2;
            if (counter) {
                var idx = p >= 0.995 ? cards.length : Math.min(cards.length, Math.round(track.scrollLeft / step()) + 1);
                counter.textContent = idx + ' / ' + cards.length;
            }
        }

        function onScroll() {
            if (!interacted && track.scrollLeft > 8) {
                interacted = true;
                if (hint) hint.classList.add('is-hidden');
            }
            if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
        }
        track.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', update);

        function slide(dir) { track.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' }); }
        if (prevBtn) prevBtn.addEventListener('click', function() { slide(-1); });
        if (nextBtn) nextBtn.addEventListener('click', function() { slide(1); });

        // Mouse drag (touch and pen already scroll natively). Stop the browser's own image drag from cancelling it.
        track.addEventListener('dragstart', function(e) { e.preventDefault(); });
        var down = false, startX = 0, startLeft = 0, moved = 0;
        track.addEventListener('pointerdown', function(e) {
            if (e.pointerType !== 'mouse' || e.button !== 0) return;
            down = true; moved = 0; startX = e.clientX; startLeft = track.scrollLeft;
        });
        window.addEventListener('pointermove', function(e) {
            if (!down) return;
            var dx = e.clientX - startX;
            moved = Math.max(moved, Math.abs(dx));
            if (moved > 5) { track.classList.add('is-dragging'); track.scrollLeft = startLeft - dx; }
        });
        window.addEventListener('pointerup', function() {
            if (!down) return;
            down = false;
            if (track.classList.contains('is-dragging')) {
                var snapTo = Math.round(track.scrollLeft / step()) * step();
                track.classList.remove('is-dragging');
                track.scrollTo({ left: snapTo, behavior: 'smooth' });
            }
        });

        // Images load after init on slow connections: keep the counter right
        update();
        window.addEventListener('load', update);
    }
};
