/**
 * cursor.js — Custom gold dot + ring cursor (desktop only)
 * Requires: .cursor-dot and .cursor-ring elements in HTML
 * Requires: GSAP with quickTo (global gsap)
 * Skipped automatically on touch / hover:none devices
 */

import { FeatureDetect } from './utils.js';

export const CustomCursor = {
    init() {
        if (!FeatureDetect.hasHover() || FeatureDetect.prefersReducedMotion()) return;
        var dot = document.querySelector('.cursor-dot');
        var ring = document.querySelector('.cursor-ring');
        if (!dot || !ring) return;

        document.body.classList.add('has-custom-cursor');

        var xDot, yDot, xRing, yRing;
        if (typeof gsap !== 'undefined' && gsap.quickTo) {
            xDot  = gsap.quickTo(dot,  'x', { duration: 0.15, ease: 'power2.out' });
            yDot  = gsap.quickTo(dot,  'y', { duration: 0.15, ease: 'power2.out' });
            xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
            yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });
        }

        document.addEventListener('mousemove', function(e) {
            var mx = e.clientX - 3,  my = e.clientY - 3;
            var rx = e.clientX - 18, ry = e.clientY - 18;
            if (xDot) { xDot(mx); yDot(my); xRing(rx); yRing(ry); }
            else {
                dot.style.transform  = 'translate(' + mx + 'px,' + my + 'px)';
                ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
            }
        }, { passive: true });

        document.addEventListener('mouseover', function(e) {
            var t = e.target;
            ring.classList.toggle('hover', !!t.closest('a, button, [data-cursor="pointer"]'));
            ring.classList.toggle('drag',  !!t.closest('.gallery-strip'));
            if (t.closest('.gallery-strip-item')) {
                ring.classList.remove('drag');
                ring.classList.add('view');
            } else {
                ring.classList.remove('view');
            }
        }, { passive: true });
    }
};
