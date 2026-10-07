/**
 * request.js — "Request your stay" helper: builds a pre-filled WhatsApp / email message
 * from the dates picked in the calendar and the number of guests.
 * Requires: #request-box, #checkin-date, #checkout-date, translations (language-switcher.js)
 */

import { CONFIG } from './config.js';

export const RequestHelper = {
    init() {
        var box = document.getElementById('request-box');
        if (!box) return;
        var self = this;
        ['checkin-date', 'checkout-date', 'request-guests'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) { el.addEventListener('change', function() { self.update(); }); el.addEventListener('input', function() { self.update(); }); }
        });
        // Calendar clicks update the date inputs programmatically (no event) — refresh on interaction
        var grid = document.getElementById('calendarGrid');
        if (grid) grid.addEventListener('click', function() { setTimeout(function() { self.update(); }, 0); });
        document.querySelectorAll('.lang-btn').forEach(function(b) { b.addEventListener('click', function() { setTimeout(function() { self.update(); }, 0); }); });
        this.update();
    },

    update() {
        var lang  = document.documentElement.lang === 'en' ? 'en' : 'el';
        var t     = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : null;
        if (!t) return;
        var ci    = document.getElementById('checkin-date');
        var co    = document.getElementById('checkout-date');
        var gEl   = document.getElementById('request-guests');
        var guests = Math.min(5, Math.max(1, parseInt(gEl && gEl.value, 10) || 2));
        if (gEl && String(gEl.value) !== String(guests) && document.activeElement !== gEl) gEl.value = guests;
        var msg   = (ci && co && ci.value && co.value)
            ? t['request.msg.dates'].replace('{ci}', this.fmt(ci.value)).replace('{co}', this.fmt(co.value)).replace('{n}', guests)
            : t['request.msg.nodates'].replace('{n}', guests);
        var wa    = document.getElementById('request-whatsapp');
        var mail  = document.getElementById('request-email');
        if (wa)   wa.href   = 'https://wa.me/' + CONFIG.CONTACT.whatsapp.replace('+', '') + '?text=' + encodeURIComponent(msg);
        if (mail) mail.href = 'mailto:' + CONFIG.CONTACT.email + '?subject=' + encodeURIComponent(t['request.subject']) + '&body=' + encodeURIComponent(msg);
    },

    fmt(iso) {
        var p = iso.split('-');
        return p[2] + '/' + p[1] + '/' + p[0];
    }
};
