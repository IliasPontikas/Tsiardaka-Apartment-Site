/**
 * main.js — Entry point for Tsiardaka Apartment
 *
 * CDN globals expected (loaded via <script defer> in index.html):
 *   gsap, ScrollTrigger, Flip, Draggable, TextPlugin  — from GSAP CDN
 *   maplibregl                                         — from MapLibre CDN
 *   CookieConsent / initCookieConsent                  — from vanilla-cookieconsent CDN
 *
 * All our own code uses ES modules imported below.
 */

/* ── Reusable modules ─────────────────────────────── */
import { ThemeToggle }          from './modules/theme.js';
import { Preloader }            from './modules/preloader.js';
import { CustomCursor }         from './modules/cursor.js';
import { Navigation }           from './modules/nav.js';
import { HeroAnimations, StatsCounter, MicroInteractions } from './modules/animations.js';
import { EditorialGallery }     from './modules/gallery.js';
import { ReviewsMarquee }       from './modules/marquee.js';
import { CookieConsentModule }  from './modules/gdpr.js';
import { Analytics }            from './modules/analytics.js';
import { PWA }                  from './modules/pwa.js';

/* ── Site-specific modules ────────────────────────── */
import { CONFIG }               from './site/config.js';
import { LocationMap }          from './site/map.js';
import { Calendar, AvailabilityChecker } from './site/calendar.js';
import { WeatherWidget }        from './site/weather.js';
import { FloatingBookBtn }      from './site/booking.js';
import { AmenitiesReveal }      from './site/amenities.js';
import { Attractions3D }        from './site/attractions.js';
import { RequestHelper }        from './site/request.js';
import { InfoCarousel }         from './site/info.js';
import { ScrollReveal }         from './site/reveal.js';

/* ─────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins once all CDN scripts have loaded
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
        if (typeof Flip          !== 'undefined') gsap.registerPlugin(Flip);
        if (typeof Draggable     !== 'undefined') gsap.registerPlugin(Draggable);
        if (typeof TextPlugin    !== 'undefined') gsap.registerPlugin(TextPlugin);
    }

    // HeroAnimations.init() splits the title text; Preloader calls .play() on reveal
    try { HeroAnimations.init(); } catch(e) { console.warn('HeroAnimations:', e); }

    // Preloader controls the page reveal — initialise it first
    try {
        Preloader.init({ onReveal: function() { HeroAnimations.play(); } });
    } catch(e) { console.warn('Preloader:', e); }

    try { ThemeToggle.init();          } catch(e) { console.warn('Theme:', e); }
    try { CustomCursor.init();         } catch(e) { console.warn('Cursor:', e); }
    try { Navigation.init();           } catch(e) { console.warn('Nav:', e); }
    try { StatsCounter.init();         } catch(e) { console.warn('Stats:', e); }
    try { EditorialGallery.init();     } catch(e) { console.warn('Gallery:', e); }
    try { AmenitiesReveal.init();      } catch(e) { console.warn('Amenities:', e); }
    try { Attractions3D.init();        } catch(e) { console.warn('Attractions:', e); }
    try { LocationMap.init();          } catch(e) { console.warn('Map:', e); }
    try { WeatherWidget.init();        } catch(e) { console.warn('Weather:', e); }
    try { ReviewsMarquee.init();       } catch(e) { console.warn('Reviews:', e); }
    try { Calendar.init();             } catch(e) { console.warn('Calendar:', e); }
    try { AvailabilityChecker.init();  } catch(e) { console.warn('Availability:', e); }
    try { ScrollReveal.init();         } catch(e) { console.warn('Reveal:', e); }
    try { InfoCarousel.init();         } catch(e) { console.warn('Info:', e); }
    try { RequestHelper.init();        } catch(e) { console.warn('Request:', e); }
    try { FloatingBookBtn.init();      } catch(e) { console.warn('FloatingBtn:', e); }
    try { MicroInteractions.init();    } catch(e) { console.warn('Micro:', e); }

    try {
        CookieConsentModule.init({
            onAnalyticsConsent: function() { Analytics.loadGA4(CONFIG.GA_ID); }
        });
    } catch(e) { console.warn('Cookie:', e); }

    // ScrollTrigger refresh after layout settles
    if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(function() { ScrollTrigger.refresh(); }, 500);
    }
});

window.addEventListener('load', function() {

    try { PWA.init(); } catch(e) { console.warn('PWA:', e); }

    if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(function() { ScrollTrigger.refresh(true); }, 1000);
        setTimeout(function() { ScrollTrigger.refresh(true); }, 3000);
    }
});
