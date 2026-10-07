/**
 * ics-to-json.mjs — converts an iCal (.ics) booking calendar into availability.json
 *
 * Usage: node tools/ics-to-json.mjs calendar.ics availability.json
 *
 * Output: { "updated": "<ISO time>", "ranges": [ { "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" } ] }
 * "end" is the last occupied NIGHT (the checkout day itself stays available).
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [, , input, output] = process.argv;
const raw = readFileSync(input, 'utf8');
if (!raw.includes('BEGIN:VCALENDAR')) { console.error('Not a valid iCal file'); process.exit(1); }

const text = raw.replace(/\r?\n[ \t]/g, ''); // unfold long lines
const dateOf = (block, field) => {
    const m = block.match(new RegExp(field + '[^:\\r\\n]*:(\\d{4})(\\d{2})(\\d{2})'));
    return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null;
};
const iso = ms => new Date(ms).toISOString().slice(0, 10);

const ranges = [];
for (const block of text.split('BEGIN:VEVENT').slice(1)) {
    const start = dateOf(block, 'DTSTART');
    const end   = dateOf(block, 'DTEND');
    if (start === null || end === null || end <= start) continue;
    ranges.push({ start: iso(start), end: iso(end - 86400000) });
}
ranges.sort((a, b) => a.start.localeCompare(b.start));

writeFileSync(output, JSON.stringify({ updated: new Date().toISOString(), ranges }, null, 2) + '\n');
console.log(`availability.json written with ${ranges.length} booked range(s)`);
