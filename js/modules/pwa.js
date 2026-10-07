/**
 * pwa.js — Progressive Web App service-worker registration
 * Call PWA.init() on window load.
 * Requires sw.js at the site root.
 */

export const PWA = {
    init() {
        if (!('serviceWorker' in navigator)) return;
        navigator.serviceWorker.register('/sw.js')
            .then(function(reg)  { console.log('SW registered:', reg.scope); })
            .catch(function(err) { console.warn('SW failed:', err); });
    }
};
