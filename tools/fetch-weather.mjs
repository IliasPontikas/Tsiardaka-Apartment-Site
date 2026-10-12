/**
 * fetch-weather.mjs — builds weather.json (5-day forecast for Trikala) from MET Norway's Locationforecast API.
 *
 * Usage: node tools/fetch-weather.mjs weather.json [forecast.json]
 *   (with a second argument the forecast is read from that file instead of the internet: used for testing)
 *
 * Why a server-side job and not the visitor's browser: MET Norway asks every client to identify itself with a
 * User-Agent header (browsers cannot set it) and to cache responses. This job asks MET only a few times a day,
 * and every visitor reads the small weather.json from our own site.
 * Data: MET Norway, licence CC BY 4.0 (credit shown next to the widget).
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [, , output, fixture] = process.argv;
if (!output) { console.error('Usage: node tools/fetch-weather.mjs weather.json [forecast.json]'); process.exit(1); }

const LAT = 39.5513, LON = 21.7647, TZ = 'Europe/Athens', DAYS = 5;
const URL = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LAT}&lon=${LON}`;
const UA  = 'tsiardaka-apartment.gr/1.0 github.com/IliasPontikas/Tsiardaka-Apartment-Site reservations@tsiardaka-apartment.gr';

const dateFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
const hourFmt = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', hourCycle: 'h23' });

// MET symbol code -> the 7 icons the widget knows
function categorize(code) {
    const c = String(code || '').replace(/_(day|night|polartwilight)$/, '');
    if (c.includes('thunder')) return 'storm';
    if (c.includes('snow') || c.includes('sleet')) return 'snow';
    if (c.includes('rain')) return 'rain';
    if (c === 'fog') return 'fog';
    if (c === 'clearsky' || c === 'fair') return 'sun';
    if (c === 'partlycloudy') return 'partly';
    return 'cloud';
}

async function load() {
    if (fixture) return JSON.parse(readFileSync(fixture, 'utf8'));
    const res = await fetch(URL, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`MET Norway answered HTTP ${res.status}`);
    return res.json();
}

const data = await load();
const series = data?.properties?.timeseries;
if (!Array.isArray(series) || !series.length) throw new Error('No forecast data in the answer');

const days = new Map(); // local date -> { temps: [], cats: [] }
for (const t of series) {
    const when = new Date(t.time);
    const date = dateFmt.format(when);
    const hour = +hourFmt.format(when);
    const d = days.get(date) || { temps: [], cats: [] };
    const temp = t.data?.instant?.details?.air_temperature;
    if (typeof temp === 'number') d.temps.push(temp);
    // the weather of the daytime hours (06:00-21:00 local) decides the icon
    if (hour >= 6 && hour <= 21) {
        const sym = t.data?.next_6_hours?.summary?.symbol_code || t.data?.next_12_hours?.summary?.symbol_code || t.data?.next_1_hours?.summary?.symbol_code;
        if (sym) d.cats.push(categorize(sym));
    }
    days.set(date, d);
}

function pick(cats) {
    if (!cats.length) return 'cloud';
    const n = {}; cats.forEach(c => { n[c] = (n[c] || 0) + 1; });
    if (n.storm) return 'storm';
    if (n.snow) return 'snow';
    if ((n.rain || 0) / cats.length >= 0.25) return 'rain';
    const rest = ['sun', 'partly', 'cloud', 'fog'].sort((a, b) => (n[b] || 0) - (n[a] || 0));
    return (n[rest[0]] || 0) ? rest[0] : 'cloud';
}

const out = { updated: new Date().toISOString(), source: 'MET Norway (CC BY 4.0)', time: [], category: [], tmax: [], tmin: [] };
for (const [date, d] of [...days.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    if (out.time.length >= DAYS) break;
    if (!d.temps.length) continue;
    out.time.push(date);
    out.category.push(pick(d.cats));
    out.tmax.push(Math.round(Math.max(...d.temps)));
    out.tmin.push(Math.round(Math.min(...d.temps)));
}
if (!out.time.length) throw new Error('Could not build any forecast day');

writeFileSync(output, JSON.stringify(out, null, 2) + '\n');
console.log(`${output} written: ` + out.time.map((d, i) => `${d} ${out.category[i]} ${out.tmin[i]}..${out.tmax[i]}`).join(' | '));
