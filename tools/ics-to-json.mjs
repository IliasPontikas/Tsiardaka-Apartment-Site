/**
 * ics-to-json.mjs — converts one or more iCal (.ics) booking calendars into availability.json
 *
 * Usage: node tools/ics-to-json.mjs calendar.ics [calendar2.ics ...] availability.json
 * (the LAST file name is the output; every earlier one is a calendar to merge)
 *
 * Output: { "updated": "<ISO time>", "ranges": [ { "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" } ] }
 * "end" is the last occupied NIGHT (the checkout day itself stays available).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const files  = process.argv.slice(2);
const output = files.pop();
const inputs = files;
if (!inputs.length || !output) { console.error('Usage: node tools/ics-to-json.mjs calendar.ics [more.ics] availability.json'); process.exit(1); }

const dateOf = (block, field) => {
    const m = block.match(new RegExp(field + '[^:\\r\\n]*:(\\d{4})(\\d{2})(\\d{2})'));
    return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null;
};
const iso = ms => new Date(ms).toISOString().slice(0, 10);

const ranges = [];
const report = [];
inputs.forEach((input, n) => {
    const raw = readFileSync(input, 'utf8');
    if (!raw.includes('BEGIN:VCALENDAR')) { console.error(`${input}: not a valid iCal file`); process.exit(1); }
    const text = raw.replace(/\r?\n[ \t]/g, ''); // unfold long lines
    const kinds = {};
    for (const block of text.split('BEGIN:VEVENT').slice(1)) {
        const start = dateOf(block, 'DTSTART');
        const end   = dateOf(block, 'DTEND');
        const rawTitle = ((block.match(/SUMMARY[^:\r\n]*:([^\r\n]*)/) || [])[1] || '(no title)').trim();
        // never print anything that could be a guest name: only generic words are kept
        const title = /^(airbnb \()?(reserved|not available|closed|blocked|booked|unavailable)/i.test(rawTitle) ? rawTitle.slice(0, 40) : '(other)';
        kinds[title] = (kinds[title] || 0) + 1;
        if (start === null || end === null || end <= start) continue;
        ranges.push({ start: iso(start), end: iso(end - 86400000) });
    }
    // Only event titles and counts (no guest data), so the owner can see what each platform really exports
    report.push(`calendar ${n + 1}: ` + (Object.entries(kinds).map(([k, v]) => `${v} x "${k}"`).join(', ') || 'no events'));
});
// Dates the owner blocks by hand in manual-blocks.json (for closures a platform does not put in its calendar link)
const manualFile = 'manual-blocks.json';
if (existsSync(manualFile)) {
    const manual = JSON.parse(readFileSync(manualFile, 'utf8')).ranges || [];
    manual.forEach(r => { if (/^\d{4}-\d{2}-\d{2}$/.test(r.start) && /^\d{4}-\d{2}-\d{2}$/.test(r.end) && r.end >= r.start) ranges.push({ start: r.start, end: r.end }); });
    report.push(`manual-blocks.json: ${manual.length} range(s)`);
}
ranges.sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end));
for (let i = ranges.length - 1; i > 0; i--) if (ranges[i].start === ranges[i - 1].start && ranges[i].end === ranges[i - 1].end) ranges.splice(i, 1); // same dates from two calendars

if (process.env.GITHUB_ACTIONS) console.log('::notice title=Calendar contents::' + report.join(' | '));
report.forEach(r => console.log(r));
writeFileSync(output, JSON.stringify({ updated: new Date().toISOString(), ranges }, null, 2) + '\n');
console.log(`availability.json written with ${ranges.length} booked range(s)`);
