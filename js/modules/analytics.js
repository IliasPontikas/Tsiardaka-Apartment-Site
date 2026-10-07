/**
 * analytics.js — GA4 event tracking (loads only after cookie consent)
 * Call Analytics.loadGA4() after the user accepts analytics cookies.
 * Add data-track="platform" data-location="section" to booking buttons.
 */

export const Analytics = {
    initialized: false,

    loadGA4(measurementId) {
        if (this.initialized) return;
        this.initialized = true;
        if (measurementId) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() { window.dataLayer.push(arguments); };
            window.gtag('js', new Date());
            window.gtag('config', measurementId, { anonymize_ip: true });
            var s = document.createElement('script');
            s.async = true;
            s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
            document.head.appendChild(s);
        }
        this._setupEventTracking();
    },

    trackEvent(name, params) {
        if (typeof gtag === 'function') gtag('event', name, params);
    },

    _setupEventTracking() {
        var self = this;

        // Booking button clicks
        document.querySelectorAll('[data-track]').forEach(function(el) {
            el.addEventListener('click', function() {
                self.trackEvent('booking_click', {
                    platform: this.dataset.track,
                    location: this.dataset.location || 'unknown'
                });
            });
        });

        // Scroll depth milestones
        var milestones = [25, 50, 75, 100];
        var tracked    = {};
        window.addEventListener('scroll', function() {
            var h   = document.documentElement.scrollHeight - window.innerHeight;
            var pct = h > 0 ? Math.round((window.scrollY / h) * 100) : 0;
            milestones.forEach(function(m) {
                if (pct >= m && !tracked[m]) {
                    tracked[m] = true;
                    self.trackEvent('scroll_depth', { depth: m });
                }
            });
        }, { passive: true });
    }
};
