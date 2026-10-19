/**
 * gdpr.js — GDPR cookie consent banner (vanilla-cookieconsent v3)
 * Requires: vanilla-cookieconsent CDN script loaded before this module
 * Calls onAnalyticsConsent() callback when analytics category is accepted
 */

export const CookieConsentModule = {
    init(options = {}) {
        var onAnalyticsConsent = options.onAnalyticsConsent || null;

        if (typeof CookieConsent === 'undefined' && typeof initCookieConsent === 'undefined') return;
        var cc = typeof initCookieConsent === 'function' ? initCookieConsent() : CookieConsent;
        if (!cc || !cc.run) return;

        function loadIfAccepted() {
            var ok = false;
            try { ok = cc.acceptedCategory('analytics'); } catch (e) {}
            if (ok && typeof onAnalyticsConsent === 'function') onAnalyticsConsent();
        }

        cc.run({
            categories: {
                necessary: { enabled: true, readOnly: true },
                analytics: { enabled: false, autoClear: { cookies: [{ name: /^_ga/ }] } } // withdrawing consent also deletes the Google Analytics cookies
            },
            guiOptions: { consentModal: { layout: 'bar', position: 'bottom' } },
            language: {
                default: document.documentElement.lang === 'en' ? 'en' : 'el',
                translations: {
                    el: {
                        consentModal: {
                            title: 'Χρησιμοποιούμε cookies',
                            description: 'Αυτός ο ιστότοπος χρησιμοποιεί cookies για τη βελτίωση της εμπειρίας σας.',
                            acceptAllBtn: 'Αποδοχή',
                            acceptNecessaryBtn: 'Μόνο απαραίτητα',
                            footer: '<a href="/privacy.html">Πολιτική Απορρήτου</a>'
                        }
                    },
                    en: {
                        consentModal: {
                            title: 'We use cookies',
                            description: 'This website uses cookies to improve your experience.',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Only necessary',
                            footer: '<a href="/privacy.html#en">Privacy Policy</a>'
                        }
                    }
                }
            },
            // vanilla-cookieconsent v3 hands these callbacks an object ({ cookie }), so ask the library itself
            // whether analytics is accepted. onConsent runs on the first choice AND on every later page load.
            onConsent: loadIfAccepted,
            onChange: function() {
                loadIfAccepted();
                // consent withdrawn: the Analytics cookies are deleted (autoClear); reload so the tracking script stops too
                var ok = false;
                try { ok = cc.acceptedCategory('analytics'); } catch (e) {}
                if (!ok && window.gtag) window.location.reload();
            }
        });

        // Footer link "Cookie settings": withdrawing consent must be as easy as giving it
        document.querySelectorAll('[data-cookie-settings]').forEach(function(a) {
            a.addEventListener('click', function(e) {
                e.preventDefault();
                if (cc.show) cc.show(true);     // shows the banner again so the choice can be changed
            });
        });
    }
};
