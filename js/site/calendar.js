/**
 * calendar.js — Date-picker calendar + availability checker
 * Requires: #calendarGrid, #calendarDays, #currentMonth, #prevMonth, #nextMonth
 *           #checkin-date, #checkout-date, #availability-form, #availability-result
 */

import { CONFIG } from './config.js';

/* ---- Shared date helpers ---- */
function normalizeDate(date) {
    if (!date) return null;
    var d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

function isDatePast(date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return normalizeDate(date) < today;
}

function isDateBooked(date) {
    var d = normalizeDate(date);
    return CONFIG.BOOKED_DATES.some(function(range) {
        return d >= normalizeDate(range.start) && d <= normalizeDate(range.end);
    });
}

function showToast(message) {
    var toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(function() { toast.classList.remove('visible'); }, 3000);
}

function getLang() {
    return (window.languageSwitcher && window.languageSwitcher.currentLang) || 'el';
}

/* ---- Calendar widget ---- */
export const Calendar = {
    currentDate: new Date(),
    checkinDate: null,
    checkoutDate: null,

    init() {
        this.render();
        this.setupNavigation();
        window.Calendar = this; // AvailabilityChecker needs this reference
    },

    render() {
        var grid    = document.getElementById('calendarGrid');
        var daysEl  = document.getElementById('calendarDays');
        var monthEl = document.getElementById('currentMonth');
        if (!grid || !monthEl) return;

        var year  = this.currentDate.getFullYear();
        var month = this.currentDate.getMonth();
        var lang  = getLang();

        var months = (typeof calendarTranslations !== 'undefined' && calendarTranslations[lang])
            ? calendarTranslations[lang].months
            : ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var days = (typeof calendarTranslations !== 'undefined' && calendarTranslations[lang])
            ? calendarTranslations[lang].days
            : ['Su','Mo','Tu','We','Th','Fr','Sa'];

        monthEl.textContent = months[month] + ' ' + year;

        if (daysEl) {
            daysEl.innerHTML = '';
            days.forEach(function(d) {
                var span = document.createElement('span');
                span.textContent = d;
                daysEl.appendChild(span);
            });
        }

        grid.innerHTML = '';
        var firstDay     = new Date(year, month, 1).getDay();
        var daysInMonth  = new Date(year, month + 1, 0).getDate();
        var today        = new Date(); today.setHours(0, 0, 0, 0);

        for (var i = 0; i < firstDay; i++) {
            var empty = document.createElement('div');
            empty.className = 'calendar-cell';
            grid.appendChild(empty);
        }

        var self = this;
        for (var d = 1; d <= daysInMonth; d++) {
            var cell = document.createElement('div');
            cell.className = 'calendar-cell';
            cell.textContent = d;
            var date = new Date(year, month, d); date.setHours(0, 0, 0, 0);

            if (date.getTime() === today.getTime()) cell.classList.add('today');
            if (isDatePast(date))   cell.classList.add('past');
            else if (isDateBooked(date)) cell.classList.add('booked');

            if (this.checkinDate  && date.getTime() === this.checkinDate.getTime())  cell.classList.add('selected', 'range-start');
            if (this.checkoutDate && date.getTime() === this.checkoutDate.getTime()) cell.classList.add('selected', 'range-end');
            if (this.checkinDate && this.checkoutDate && date > this.checkinDate && date < this.checkoutDate) cell.classList.add('in-range');

            (function(dt, cl) {
                cl.addEventListener('click', function() { self.handleDateClick(dt); });
            })(date, cell);

            grid.appendChild(cell);
        }
    },

    setupNavigation() {
        var self = this;
        var prev = document.getElementById('prevMonth');
        var next = document.getElementById('nextMonth');
        if (prev) prev.addEventListener('click', function() {
            var now = new Date(); now.setDate(1);
            var cur = new Date(self.currentDate); cur.setDate(1);
            if (cur > now) { self.currentDate.setMonth(self.currentDate.getMonth() - 1); self.render(); }
        });
        if (next) next.addEventListener('click', function() {
            self.currentDate.setMonth(self.currentDate.getMonth() + 1);
            self.render();
        });
    },

    handleDateClick(date) {
        if (isDatePast(date))   { showToast(getLang() === 'el' ? 'Παρελθούσα ημερομηνία' : 'Past date'); return; }
        if (isDateBooked(date)) { showToast(getLang() === 'el' ? 'Μη διαθέσιμο' : 'Not available'); return; }

        if (!this.checkinDate || (this.checkinDate && this.checkoutDate)) {
            this.checkinDate = date; this.checkoutDate = null;
        } else {
            if (date <= this.checkinDate) { this.checkinDate = date; this.checkoutDate = null; }
            else { this.checkoutDate = date; }
        }
        this.syncToForm();
        this.render();
    },

    syncToForm() {
        var ci = document.getElementById('checkin-date');
        var co = document.getElementById('checkout-date');
        if (ci) ci.value = this.checkinDate  ? this.formatDate(this.checkinDate)  : '';
        if (co) co.value = this.checkoutDate ? this.formatDate(this.checkoutDate) : '';
    },

    formatDate(d) {
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }
};

/* ---- Live ICS availability checker ---- */
export const AvailabilityChecker = {
    init() {
        this.fetchICS();
        this.setupUI();
    },

    // Booked dates come from availability.json, refreshed hourly by .github/workflows/availability.yml
    // (browsers cannot read Airbnb's calendar directly because of CORS).
    fetchICS() {
        fetch('/availability.json', { cache: 'no-cache' })
            .then(function(r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
            .then(function(data) {
                CONFIG.BOOKED_DATES = (data.ranges || []).map(function(r) {
                    var s = r.start.split('-'), e = r.end.split('-');
                    return { start: new Date(+s[0], +s[1] - 1, +s[2]), end: new Date(+e[0], +e[1] - 1, +e[2]) };
                });
                if (window.Calendar) window.Calendar.render();
            })
            .catch(function(err) { console.warn('Availability data unavailable:', err.message); });
    },

    setupUI() {
        var form     = document.getElementById('availability-form');
        var ci       = document.getElementById('checkin-date');
        var co       = document.getElementById('checkout-date');
        var resultEl = document.getElementById('availability-result');
        var btn      = form ? form.querySelector('.availability-btn') : null;
        var self     = this;

        var today = new Date().toISOString().split('T')[0];
        if (ci) ci.min = today;
        if (co) co.min = today;

        if (ci) ci.addEventListener('change', function() {
            if (co) {
                var next = new Date(ci.value);
                next.setDate(next.getDate() + 1);
                co.min = next.toISOString().split('T')[0];
                if (co.value && co.value <= ci.value) co.value = '';
            }
            self.syncFormToCalendar();
        });
        if (co) co.addEventListener('change', function() { self.syncFormToCalendar(); });
        if (btn) btn.addEventListener('click', function() { self.runCheck(); });
    },

    syncFormToCalendar() {
        var ci = document.getElementById('checkin-date');
        var co = document.getElementById('checkout-date');
        if (window.Calendar) {
            window.Calendar.checkinDate  = ci && ci.value ? new Date(ci.value + 'T00:00:00') : null;
            window.Calendar.checkoutDate = co && co.value ? new Date(co.value + 'T00:00:00') : null;
            window.Calendar.render();
        }
    },

    runCheck() {
        var ci       = document.getElementById('checkin-date');
        var co       = document.getElementById('checkout-date');
        var resultEl = document.getElementById('availability-result');
        var lang     = getLang();
        if (!resultEl) return;

        if (!ci.value || !co.value) {
            this.showResult(resultEl, 'warning', lang === 'el' ? 'Παρακαλώ επιλέξτε ημερομηνίες.' : 'Please select both dates.');
            return;
        }

        var checkin  = new Date(ci.value + 'T00:00:00');
        var checkout = new Date(co.value + 'T00:00:00');

        if (checkout <= checkin) {
            this.showResult(resultEl, 'warning', lang === 'el' ? 'Η αναχώρηση πρέπει να είναι μετά την άφιξη.' : 'Checkout must be after check-in.');
            return;
        }

        var current = new Date(checkin);
        while (current < checkout) {
            for (var i = 0; i < CONFIG.BOOKED_DATES.length; i++) {
                var s = normalizeDate(CONFIG.BOOKED_DATES[i].start);
                var e = normalizeDate(CONFIG.BOOKED_DATES[i].end);
                if (current >= s && current <= e) {
                    this.showResult(resultEl, 'unavailable', lang === 'el'
                        ? 'Δυστυχώς, οι ημερομηνίες δεν είναι διαθέσιμες. Δοκιμάστε άλλες ή επικοινωνήστε μαζί μας!'
                        : 'Sorry, these dates are not available. Try other dates or contact us!');
                    return;
                }
            }
            current.setDate(current.getDate() + 1);
        }

        var nights = Math.round((checkout - checkin) / 86400000);
        this.showResult(resultEl, 'available', lang === 'el'
            ? 'Διαθέσιμο! ' + nights + ' διανυκτερεύσ' + (nights === 1 ? 'η' : 'εις') + '. Κάντε κράτηση τώρα!'
            : 'Available! ' + nights + ' night' + (nights === 1 ? '' : 's') + '. Book now!');
    },

    showResult(el, status, msg) {
        el.className    = 'availability-result ' + status;
        el.textContent  = msg;
        el.style.display = 'block';
    }
};
