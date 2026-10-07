/**
 * animations.js — Hero entrance, scroll-reveal micro-interactions, stat counters,
 *                 cursor-following gallery in the About section
 * Requires: GSAP + ScrollTrigger (globals)
 */

import { FeatureDetect } from './utils.js';

/* Hero: letter-by-letter reveal triggered by Preloader on reveal */
export const HeroAnimations = {
    _played: false,

    init() {
        var title = document.querySelector('.hero-title');
        if (!title || typeof gsap === 'undefined' || FeatureDetect.prefersReducedMotion()) return; // reduced motion: show the hero as-is

        // Split title into individual character spans
        var text = title.textContent;
        title.innerHTML = '';
        for (var i = 0; i < text.length; i++) {
            var span = document.createElement('span');
            span.className = 'char';
            span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
            title.appendChild(span);
        }

        gsap.set('.hero-subtitle', { opacity: 0, y: 20 });
        gsap.set('.hero-cta',      { opacity: 0, y: 20 });
        gsap.set('.scroll-indicator', { opacity: 0 });
    },

    play() {
        if (this._played || typeof gsap === 'undefined' || FeatureDetect.prefersReducedMotion()) return;
        this._played = true;
        var tl = gsap.timeline();
        tl.to('.hero-title .char',  { opacity: 1, y: 0, duration: 0.5, stagger: 0.025, ease: 'power2.out' })
          .to('.hero-subtitle',     { opacity: 0.9, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
          .to('.hero-cta',          { opacity: 1,   y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
          .to('.scroll-indicator',  { opacity: 0.7,       duration: 0.5 }, '-=0.2');

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.to('.hero-bg', {
                yPercent: 30, ease: 'none',
                scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
            });
        }
    }
};

/* Animated number counters on scroll */
export const StatsCounter = {
    init() {
        var stats = document.querySelectorAll('.stat-number');
        if (!stats.length || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        stats.forEach(function(el) {
            var target   = parseFloat(el.getAttribute('data-target')) || 0;
            var decimals = parseInt(el.getAttribute('data-decimals')) || 0;
            var suffix = el.getAttribute('data-suffix') || '';
            ScrollTrigger.create({
                trigger: el, start: 'top 85%', once: true,
                onEnter: function() {
                    gsap.to(el, {
                        innerText: target, duration: 1.5, ease: 'power2.out',
                        snap: { innerText: decimals ? Math.pow(10, -decimals) : 1 },
                        onUpdate:  function() { el.textContent = parseFloat(el.innerText).toFixed(decimals) + suffix; },
                        onComplete: function() { el.textContent = target.toFixed(decimals) + suffix; }
                    });
                }
            });
        });
    }
};

/* Scroll-triggered reveal animations for generic page elements */
export const MicroInteractions = {
    init() {
        var progress = document.getElementById('scroll-progress');
        var backTop  = document.querySelector('.back-to-top');

        if (progress) {
            window.addEventListener('scroll', function() {
                var h   = document.documentElement.scrollHeight - window.innerHeight;
                var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
                progress.style.width = pct + '%';
            }, { passive: true });
        }

        if (backTop) {
            window.addEventListener('scroll', function() {
                backTop.classList.toggle('visible', window.scrollY > 500);
            }, { passive: true });
            backTop.addEventListener('click', function() {
                if (typeof gsap !== 'undefined') {
                    var obj = { y: window.scrollY };
                    gsap.to(obj, { y: 0, duration: 1.2, ease: 'power3.out', onUpdate: function() { window.scrollTo(0, obj.y); } });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }

        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Section titles + labels
        document.querySelectorAll('.section-title, .section-label').forEach(function(el) {
            gsap.set(el, { opacity: 0, y: 30 });
            ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true,
                onEnter: function() { gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }); }
            });
        });

        // About text paragraphs
        document.querySelectorAll('.about-text p').forEach(function(el, i) {
            gsap.set(el, { opacity: 0, y: 20 });
            ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true,
                onEnter: function() { gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out' }); }
            });
        });

        // Stat grid items
        document.querySelectorAll('.stat-item').forEach(function(el, i) {
            gsap.set(el, { opacity: 0, y: 20 });
            ScrollTrigger.create({ trigger: '.stats-grid', start: 'top 85%', once: true,
                onEnter: function() { gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out' }); }
            });
        });

        // Contact buttons
        document.querySelectorAll('.contact-btn').forEach(function(el, i) {
            gsap.set(el, { opacity: 0, y: 15 });
            ScrollTrigger.create({ trigger: '.contact-methods', start: 'top 85%', once: true,
                onEnter: function() { gsap.to(el, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out' }); }
            });
        });

        // Offer cards
        document.querySelectorAll('.offer-card').forEach(function(el, i) {
            gsap.set(el, { opacity: 0, y: 30 });
            ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true,
                onEnter: function() { gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out' }); }
            });
        });

        // Location section
        document.querySelectorAll('.map-container, .location-info').forEach(function(el, i) {
            gsap.set(el, { opacity: 0, y: 25 });
            ScrollTrigger.create({ trigger: '#location', start: 'top 80%', once: true,
                onEnter: function() { gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out' }); }
            });
        });

        // Footer columns
        document.querySelectorAll('.footer-col').forEach(function(el, i) {
            gsap.set(el, { opacity: 0, y: 20 });
            ScrollTrigger.create({ trigger: 'footer', start: 'top 90%', once: true,
                onEnter: function() { gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out' }); }
            });
        });

        // Gallery heading
        var galleryTitle = document.querySelector('#gallery .section-title');
        var galleryLabel = document.querySelector('#gallery .section-label');
        if (galleryTitle) {
            gsap.set(galleryTitle, { opacity: 0, y: 30 });
            ScrollTrigger.create({ trigger: '#gallery', start: 'top 85%', once: true,
                onEnter: function() {
                    if (galleryLabel) gsap.to(galleryLabel, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
                    gsap.to(galleryTitle, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out' });
                }
            });
        }

        // Experience parallax
        var expBg = document.querySelector('.experience-bg');
        if (expBg) {
            gsap.to(expBg, {
                y: '20%', ease: 'none',
                scrollTrigger: { trigger: '#experience', start: 'top bottom', end: 'bottom top', scrub: true }
            });
        }
    }
};
