/**
 * reveal.js — Signature scroll-in motion for photos and card groups
 * - About photo: unveils with a clip-path wipe, then drifts slowly inside its frame (parallax)
 * - Christmas block: main photo wipes in, the inset photo pops in with a tilt
 * - "Why book direct" cards, contact boxes, stay-info cards (desktop), offer/review cards: staggered rise
 * Everything is shown immediately if motion is reduced or GSAP is missing.
 * Requires: GSAP + ScrollTrigger (globals)
 */

export const ScrollReveal = {
    init() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var phone = window.matchMedia('(max-width: 768px)').matches;
        var ease  = 'power3.out';

        /* Photo wipe: reveal from the bottom edge, image settles from a slight zoom */
        function wipe(frame, img, opts) {
            opts = opts || {};
            gsap.set(frame, { clipPath: 'inset(' + (opts.from || '100% 0% 0% 0%') + ')' });
            if (img) gsap.set(img, { scale: 1.25 });
            ScrollTrigger.create({
                trigger: frame, start: 'top 85%', once: true,
                onEnter: function() {
                    gsap.to(frame, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut', onComplete: function() { frame.style.clipPath = ''; } });
                    if (img) gsap.to(img, { scale: opts.rest || 1.12, duration: 1.8, ease: 'power2.out' });
                }
            });
        }

        /* About photo: wipe + slow parallax drift while it travels through the viewport */
        var aboutFrame = document.querySelector('.about-photo');
        var aboutImg   = aboutFrame && aboutFrame.querySelector('img');
        if (aboutFrame && aboutImg) {
            wipe(aboutFrame, aboutImg, { rest: 1.12 });
            gsap.fromTo(aboutImg, { yPercent: -5 }, {
                yPercent: 5, ease: 'none',
                scrollTrigger: { trigger: aboutFrame, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
            });
        }

        /* Photo band: the picture drifts slowly under its headline */
        var bandImg = document.querySelector('.photo-band-media img');
        if (bandImg) {
            gsap.fromTo(bandImg, { yPercent: -7 }, { yPercent: 7, ease: 'none',
                scrollTrigger: { trigger: '.photo-band-frame', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
            // Headline types itself letter by letter (words stay unbroken so it can wrap on phones)
            var bandText = document.querySelector('.photo-band-text');
            if (bandText) {
                var full = bandText.textContent.trim();
                bandText.setAttribute('aria-label', full);
                bandText.innerHTML = '';
                var letters = [];
                full.split(' ').forEach(function(word, wi, all) {
                    var w = document.createElement('span');
                    w.className = 'band-word';
                    w.setAttribute('aria-hidden', 'true');
                    word.split('').forEach(function(ch) {
                        var c = document.createElement('span');
                        c.className = 'band-char';
                        c.textContent = ch;
                        w.appendChild(c);
                        letters.push(c);
                    });
                    bandText.appendChild(w);
                    if (wi < all.length - 1) bandText.appendChild(document.createTextNode(' '));
                });
                gsap.set(letters, { opacity: 0 });
                ScrollTrigger.create({ trigger: '.photo-band-head', start: 'top 80%', once: true,
                    onEnter: function() { gsap.to(letters, { opacity: 1, duration: 0.05, ease: 'none', stagger: 0.06, delay: 0.3 }); } });
            }
        }

        /* Christmas block: main photo wipes in from the left, inset pops in */
        var xMain  = document.querySelector('.xmas-main');
        var xImg   = xMain && xMain.querySelector('img');
        var xInset = document.querySelector('.xmas-inset');
        if (xMain) wipe(xMain, xImg, { from: '0% 100% 0% 0%', rest: 1 });
        if (xInset) {
            gsap.set(xInset, { opacity: 0, y: 60, rotate: 10, scale: 0.9 });
            ScrollTrigger.create({
                trigger: xInset, start: 'top 92%', once: true,
                onEnter: function() { gsap.to(xInset, { opacity: 1, y: 0, rotate: 2.5, scale: 1, duration: 1.1, delay: 0.5, ease: 'back.out(1.4)' }); }
            });
        }

        /* Staggered rise for card groups */
        function stagger(selector, trigger, opts) {
            opts = opts || {};
            var els = document.querySelectorAll(selector);
            if (!els.length) return;
            gsap.set(els, { opacity: 0, y: opts.y || 50, scale: opts.scale || 1 });
            ScrollTrigger.create({
                trigger: trigger, start: opts.start || 'top 82%', once: true,
                onEnter: function() {
                    gsap.to(els, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: ease, stagger: opts.stagger || 0.14, clearProps: 'transform,opacity' });
                }
            });
        }
        stagger('.direct-grid .direct-card', '.direct-grid', { y: 60, scale: 0.96, stagger: 0.16 });
        if (!phone) stagger('#info-grid .direct-card', '#info-grid', { y: 50, stagger: 0.12 });

        /* Contact boxes slide in from opposite sides */
        var boxes = [['.contact-info', -60], ['.contact-cta', 60]];
        boxes.forEach(function(b) {
            var el = document.querySelector(b[0]);
            if (!el) return;
            gsap.set(el, { opacity: 0, x: phone ? 0 : b[1], y: phone ? 40 : 0 });
            ScrollTrigger.create({
                trigger: '.contact-grid', start: 'top 82%', once: true,
                onEnter: function() { gsap.to(el, { opacity: 1, x: 0, y: 0, duration: 1, ease: ease, clearProps: 'transform,opacity' }); }
            });
        });
    }
};
