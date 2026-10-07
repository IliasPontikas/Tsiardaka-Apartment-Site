/**
 * info.js — "Good to know" cards: on phones they are a swipeable row; this builds the page dots.
 * Requires: #info-grid with .direct-card children, #info-dots
 */
export const InfoCarousel = {
    init() {
        var grid = document.getElementById('info-grid');
        var dots = document.getElementById('info-dots');
        if (!grid || !dots) return;
        var cards = Array.prototype.slice.call(grid.children);
        cards.forEach(function(_, i) {
            var d = document.createElement('span');
            d.className = 'info-dot' + (i === 0 ? ' active' : '');
            dots.appendChild(d);
        });
        var list = Array.prototype.slice.call(dots.children);
        var ticking = false;
        function update() {
            ticking = false;
            var max = grid.scrollWidth - grid.clientWidth;
            var idx = max <= 0 ? 0 : (grid.scrollLeft >= max - 4 ? cards.length - 1 : Math.round(grid.scrollLeft / (cards[0].offsetWidth + 16)));
            list.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
        }
        grid.addEventListener('scroll', function() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }, { passive: true });
    }
};
