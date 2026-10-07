/**
 * nav.js — Sticky glassmorphism navigation
 * Requires: .navbar, #hero, .hamburger, .mobile-menu, .nav-links a
 * Requires: GSAP + ScrollTrigger (globals, optional — falls back to native scroll)
 */

export const Navigation = {
    init() {
        var nav        = document.querySelector('.navbar');
        var hero       = document.getElementById('hero');
        var hamburger  = document.querySelector('.hamburger');
        var mobile     = document.querySelector('.mobile-menu');
        if (!nav) return;

        // Transparent while inside the hero viewport, solid afterwards
        var heroBottom = function() { return hero ? hero.offsetTop + hero.offsetHeight - nav.offsetHeight : 0; };
        var updateTransparency = function() {
            if (window.scrollY < heroBottom()) nav.classList.add('nav-transparent');
            else nav.classList.remove('nav-transparent');
        };
        updateTransparency();

        // Auto-hide on scroll down, reveal on scroll up (skip while over hero)
        var lastScrollY = window.scrollY;
        var ticking     = false;
        var SCROLL_DELTA = 8; // ignore tiny wiggles

        var onScroll = function() {
            var y = window.scrollY;
            var delta = y - lastScrollY;

            // Toggle transparent class as the user crosses the hero boundary
            updateTransparency();

            if (Math.abs(delta) < SCROLL_DELTA) { ticking = false; return; }

            // Never hide while at the very top or still inside the hero
            if (y < heroBottom() + 20 || y < 80) {
                nav.classList.remove('nav-hidden');
            } else if (delta > 0) {
                nav.classList.add('nav-hidden');    // scrolling down
                if (mobile && mobile.classList.contains('active')) {
                    // close any open mobile menu to avoid orphan state
                    mobile.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                    nav.classList.remove('menu-open');
                    document.body.classList.remove('menu-is-open');
                }
            } else {
                nav.classList.remove('nav-hidden'); // scrolling up
            }
            lastScrollY = y;
            ticking = false;
        };

        window.addEventListener('scroll', function() {
            if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
        }, { passive: true });

        // Hamburger toggle
        if (hamburger && mobile) {
            hamburger.addEventListener('click', function() {
                var open = hamburger.classList.toggle('active');
                mobile.classList.toggle('active');
                nav.classList.toggle('menu-open', open); // keeps logo and X readable on the light menu
                document.body.classList.toggle('menu-is-open', open); // hides the floating buttons
                hamburger.setAttribute('aria-expanded', open);
                mobile.setAttribute('aria-hidden', !open);
            });
            mobile.querySelectorAll('a').forEach(function(a) {
                a.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    mobile.classList.remove('active');
                    nav.classList.remove('menu-open');
                    document.body.classList.remove('menu-is-open');
                    hamburger.setAttribute('aria-expanded', 'false');
                    mobile.setAttribute('aria-hidden', 'true');
                });
            });
        }

        // GSAP smooth scroll for anchor links
        document.querySelectorAll('.nav-links a, .mobile-menu a, .nav-book-btn, .hero-cta').forEach(function(a) {
            a.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (!href || !href.startsWith('#')) return;
                e.preventDefault();
                var target = document.querySelector(href);
                if (!target) return;
                var navH = nav ? nav.offsetHeight : 0;
                var dest  = target.getBoundingClientRect().top + window.scrollY - navH;
                if (typeof gsap !== 'undefined') {
                    var obj = { y: window.scrollY };
                    gsap.to(obj, { y: dest, duration: 1.2, ease: 'power3.out', onUpdate: function() { window.scrollTo(0, obj.y); } });
                } else {
                    window.scrollTo({ top: dest, behavior: 'smooth' });
                }
            });
        });
    }
};
