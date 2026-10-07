/**
 * amenities.js — Pinned card-stack slide-up animation for the Amenities section
 * Requires: #amenities section, .amenities-grid, .amenity-card elements
 * Requires: GSAP + ScrollTrigger (globals)
 */

export const AmenitiesReveal = {
    init() {
        var section = document.getElementById('amenities');
        var grid    = document.querySelector('.amenities-grid');
        var cards   = Array.from(document.querySelectorAll('.amenity-card'));
        if (!cards.length || !section || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        var n         = cards.length;
        var rotations = [-2, 1.5, -1, 2.5, -1.5, 0.8, -1.8, 1.2, -0.5];
        var cardH     = cards[0].offsetHeight;

        // Reserve extra headroom so the stack's upward offset never overlaps the section title
        var stackLift = (n - 1) * 10;     // same depth factor used below
        var headroom  = stackLift + 36;

        grid.style.position      = 'relative';
        grid.style.height        = (cardH + headroom + 24) + 'px';
        grid.style.paddingTop    = headroom + 'px';
        grid.style.overflow      = 'visible';

        cards.forEach(function(card, i) {
            card.style.position = 'absolute';
            card.style.top      = headroom + 'px';
            card.style.left     = '0';
            card.style.right    = '0';
            card.style.zIndex   = i + 1;
            gsap.set(card, { y: '100vh', rotation: rotations[i] || 0 });
        });

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 10%',
                end: '+=' + (n * 400),
                pin: true,
                scrub: 0.6,
                anticipatePin: 1
            }
        });

        for (var i = 0; i < n; i++) {
            tl.to(cards[i], { y: 0, rotation: rotations[i] * 0.4, duration: 1, ease: 'power2.out' });
            for (var j = 0; j < i; j++) {
                var depth = i - j;
                tl.to(cards[j], { scale: Math.max(0.82, 1 - depth * 0.04), y: -depth * 10, duration: 1 }, '<');
            }
        }
    }
};
