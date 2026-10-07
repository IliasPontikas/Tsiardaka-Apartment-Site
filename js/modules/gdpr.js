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

        cc.run({
            categories: {
                necessary: { enabled: true, readOnly: true },
                analytics: { enabled: false }
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
            onConsent: function(cookie) {
                if (cookie && cookie.categories && cookie.categories.indexOf('analytics') >= 0) {
                    if (typeof onAnalyticsConsent === 'function') onAnalyticsConsent();
                }
            }
        });
    }
};
