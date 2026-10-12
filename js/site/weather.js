/**
 * weather.js — 5-day weather forecast widget. Data: MET Norway (CC BY 4.0), collected into weather.json by
 *               .github/workflows/weather.yml (visitors never call MET directly)
 * Requires: #weather-widget, #weather-forecast, .weather-loading elements
 */

export const WeatherWidget = {
    /* Inline SVG icons (stroke style, colours via CSS vars) */
    SVG: {
        sun:    '<svg viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="8" fill="#F4B942" stroke="#E39A1B" stroke-width="2"/><g stroke="#E39A1B" stroke-width="2.5"><path d="M24 6v5M24 37v5M6 24h5M37 24h5M11.3 11.3l3.5 3.5M33.2 33.2l3.5 3.5M11.3 36.7l3.5-3.5M33.2 14.8l3.5-3.5"/></g></svg>',
        partly: '<svg viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="17" r="6.5" fill="#F4B942" stroke="#E39A1B" stroke-width="2"/><g stroke="#E39A1B" stroke-width="2.5"><path d="M18 5v3M6 17h3M9.5 8.5l2 2M26.5 8.5l-2 2"/></g><path d="M16 38h19a7 7 0 0 0 .6-14 9 9 0 0 0-17-2A8 8 0 0 0 16 38z" fill="#fff" stroke="#9AA5B1" stroke-width="2"/></svg>',
        cloud:  '<svg viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 36h20a8 8 0 0 0 .8-16A11 11 0 0 0 13.600 22 7.500 7.500 0 0 0 14 36z" fill="#E4E9EE" stroke="#8A97A5" stroke-width="2"/></svg>',
        fog:    '<svg viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 28h20a7 7 0 0 0 .6-14A10 10 0 0 0 15 16a6.500 6.500 0 0 0-1 12z" fill="#E4E9EE" stroke="#8A97A5" stroke-width="2"/><path d="M10 34h28M14 40h20" stroke="#8A97A5" stroke-width="2.500"/></svg>',
        rain:   '<svg viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 30h20a7.500 7.500 0 0 0 .8-15A10.500 10.500 0 0 0 14.300 17 7 7 0 0 0 14 30z" fill="#D5DDE6" stroke="#7B8896" stroke-width="2"/><path d="M17 35l-2 6M25 35l-2 6M33 35l-2 6" stroke="#3B82C4" stroke-width="2.500"/></svg>',
        snow:   '<svg viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 30h20a7.500 7.500 0 0 0 .8-15A10.500 10.500 0 0 0 14.300 17 7 7 0 0 0 14 30z" fill="#E4E9EE" stroke="#8A97A5" stroke-width="2"/><g stroke="#6FB1E0" stroke-width="2.200"><path d="M16 35v6M13.400 36.500l5.200 3M13.400 39.500l5.200-3M26 35v6M23.400 36.500l5.200 3M23.400 39.500l5.200-3M36 35v6M33.400 36.500l5.200 3M33.400 39.500l5.200-3"/></g></svg>',
        storm:  '<svg viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 29h20a7.500 7.500 0 0 0 .8-15A10.500 10.500 0 0 0 14.300 16 7 7 0 0 0 14 29z" fill="#B8C2CD" stroke="#66737F" stroke-width="2"/><path d="M26 29l-5 8h6l-4 8" stroke="#F4B942" stroke-width="3"/></svg>'
    },
    LABELS: {
        sun:    { el: 'Αίθριος',            en: 'Clear sky' },
        partly: { el: 'Λίγα σύννεφα',       en: 'Partly cloudy' },
        cloud:  { el: 'Συννεφιά',           en: 'Cloudy' },
        fog:    { el: 'Ομίχλη',             en: 'Fog' },
        rain:   { el: 'Βροχή',              en: 'Rain' },
        snow:   { el: 'Χιόνι',              en: 'Snow' },
        storm:  { el: 'Καταιγίδα',          en: 'Thunderstorm' }
    },
    /* Map any WMO weather code to an icon category */
    categorize(code) {
        if (code === 0 || code === 1) return 'sun';
        if (code === 2) return 'partly';
        if (code === 3) return 'cloud';
        if (code === 45 || code === 48) return 'fog';
        if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
        if (code >= 95) return 'storm';
        if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
        return 'cloud';
    },
    DAYS_EL: ['Κυρ', 'Δευ', 'Τρί', 'Τετ', 'Πέμ', 'Παρ', 'Σάβ'],
    DAYS_EN: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    _data: null,

    init() { this.fetchWeather(); },

    fetchWeather() {
        var self = this;
        fetch('/weather.json', { cache: 'no-cache' })
            .then(function(r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
            .then(function(data) {
                if (!data.time || !data.time.length) throw new Error('forecast not ready yet');
                self._data = data;
                self.render();
            })
            .catch(function(err) {
                console.warn('Weather:', err.message || err);
                var loading = document.querySelector('.weather-loading');
                if (loading) loading.textContent = '—';
            });
    },

    render() {
        var widget   = document.getElementById('weather-widget');
        var forecast = document.getElementById('weather-forecast');
        if (!widget || !forecast || !this._data) return;

        var daily    = this._data;
        if (!this.SVG[daily.category[0]]) return;
        var lang     = (document.documentElement.lang || 'el').substring(0, 2);
        var dayNames = lang === 'en' ? this.DAYS_EN : this.DAYS_EL;
        var todayLbl = lang === 'en' ? 'Today' : 'Σήμερα';
        var html     = '';
        // forecast days are Greek local dates; skip any that are already in the past if the file is a bit old
        var today    = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Athens', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
        var first    = 0;
        while (first < daily.time.length && daily.time[first] < today) first++;
        if (first >= daily.time.length) return;

        for (var i = first; i < daily.time.length; i++) {
            var date    = new Date(daily.time[i] + 'T00:00:00');
            var dayName = daily.time[i] === today ? todayLbl : dayNames[date.getDay()];
            var cat     = daily.category[i];
            var label   = this.LABELS[cat][lang === 'en' ? 'en' : 'el'];
            html += '<div class="weather-day">'
                + '<span class="weather-day-name">' + dayName + '</span>'
                + '<span class="weather-day-icon" title="' + label + '">' + this.SVG[cat] + '</span>'
                + '<div class="weather-day-temps">'
                + '<span class="weather-day-high">' + daily.tmax[i] + '°</span>'
                + '<span class="weather-day-low">'  + daily.tmin[i] + '°</span>'
                + '</div></div>';
        }

        forecast.innerHTML = html;
        var loading = widget.querySelector('.weather-loading');
        if (loading) loading.style.display = 'none';
        forecast.style.display = 'grid';
    }
};
