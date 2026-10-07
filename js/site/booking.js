/**
 * booking.js — Floating "Book Now" button (appears after hero, expands to options)
 * Requires: #floating-book-btn, .floating-book-toggle inside it
 * Requires: GSAP + ScrollTrigger (globals, optional)
 */

export const FloatingBookBtn = {
    init() {
        var btn     = document.getElementById('floating-book-btn');
        var backTop = document.querySelector('.back-to-top');
        if (!btn) return;
        var toggle  = btn.querySelector('.floating-book-toggle');
        var contact = document.getElementById('contact');

        // Appear after hero scrolls out of view
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.create({
                trigger: '#hero',
                start: 'bottom top',
                onEnter:     function() { btn.classList.add('visible');    },
                onLeaveBack: function() { btn.classList.remove('visible'); }
            });

            // Hide both buttons once the Contact section enters the viewport —
            // the page already shows plenty of direct booking options there.
            if (contact) {
                ScrollTrigger.create({
                    trigger: contact,
                    start: 'top 85%',
                    onEnter:     function() {
                        btn.classList.add('hidden');
                        if (backTop) backTop.classList.add('hidden');
                    },
                    onLeaveBack: function() {
                        btn.classList.remove('hidden');
                        if (backTop) backTop.classList.remove('hidden');
                    }
                });
            }
        }

        // Expand/collapse the option menu
        if (toggle) {
            toggle.addEventListener('click', function() {
                var expanded = btn.classList.toggle('expanded');
                toggle.setAttribute('aria-expanded', expanded);
            });
        }

        // Collapse when clicking outside
        document.addEventListener('click', function(e) {
            if (!btn.contains(e.target)) btn.classList.remove('expanded');
        });
    }
};
