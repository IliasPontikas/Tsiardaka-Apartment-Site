/**
 * optimize-images.mjs — creates responsive WebP versions of the site photos.
 *
 * Usage (from the repo root):
 *     npm install --no-save sharp
 *     node tools/optimize-images.mjs
 *
 * For every photo in SOURCES it writes  <name>-<width>.webp  next to the original
 * (widths 480/800/1280/1920, never larger than the original) and prints the width
 * list. The original JPEG stays as the fallback in the <picture> markup.
 * Add new photos to SOURCES, run again, then reference them in index.html.
 */
import sharp from 'sharp';
import { statSync } from 'node:fs';

const SOURCES = [
    'images/gallery/living-room.jpg', 'images/gallery/kitchen.jpg', 'images/gallery/bedroom.jpg',
    'images/gallery/bedroom2.jpg', 'images/gallery/dining.jpg', 'images/gallery/bathroom.jpg',
    'images/gallery/balcony.jpeg',
    'images/gallery/dining-entrance.jpg', 'images/gallery/dining-wide.jpg', 'images/gallery/dining-painting.jpg',
    'images/gallery/dining-fireplace.jpg', 'images/gallery/dining-decor.jpg',
    'images/gallery/kitchen-overview.jpg', 'images/gallery/kitchen-table.jpg', 'images/gallery/kitchen-view.jpg',
    'images/gallery/kitchen-cabinets.jpg', 'images/gallery/kitchen-appliances.jpg',
    'images/gallery/bedroom2-entrance.jpg', 'images/gallery/bedroom2-desk.jpg', 'images/gallery/bedroom2-bed.jpg', 'images/gallery/bedroom2-corner.jpg',
    'images/gallery/bedroom-painting.jpg', 'images/gallery/living-sofa.jpg', 'images/gallery/living-corner.jpg', 'images/gallery/living-tv.jpg', 'images/gallery/living-christmas.jpg',
    'images/gallery/bathroom-shower.jpg', 'images/gallery/bathroom-sink.jpg', 'images/gallery/balcony-terrace.jpg', 'images/gallery/balcony-table.jpg',
    'images/about/bedroom.jpg', // 1600px crop of socialTags.jpg (About section photo)
    'images/attractions/mylos/panoramic.jpg', 'images/attractions/square-river/lithaios.jpg',
    'images/attractions/old-town/froureio.jpg', 'images/attractions/manavika/tavernes.jpg',
    'images/attractions/pertouli/xionodromiko.jpg', 'images/attractions/meteora/meteora.jpg', 'images/attractions/palaiokarya/palaiokarya.jpg',
    'images/attractions/limni-plastira/limni_plastira.jpg'
];
const WIDTHS = [480, 800, 1280, 1920];
const QUALITY = 74;

for (const src of SOURCES) {
    const meta = await sharp(src).metadata();
    const widths = WIDTHS.filter(w => w < meta.width);
    if (!widths.length || widths[widths.length - 1] < meta.width) widths.push(Math.min(meta.width, 1920));
    const base = src.replace(/\.[^.]+$/, '');
    let total = 0;
    for (const w of [...new Set(widths)]) {
        const out = `${base}-${w}.webp`;
        await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 5 }).toFile(out);
        total += statSync(out).size;
    }
    console.log(`${src} (${meta.width}px, ${Math.round(statSync(src).size / 1024)}KB) -> widths [${[...new Set(widths)].join(', ')}], webp total ${Math.round(total / 1024)}KB`);
}

// Logo (transparent): single 480w WebP
await sharp('images/logo-removebg.png').resize({ width: 480 }).webp({ quality: 85, alphaQuality: 90, effort: 6 }).toFile('images/logo-removebg-480.webp');
console.log('logo-removebg-480.webp written');

// Social sharing image (images/social-share.jpg, 1200x630) is a manual crop of images/socialTags.jpg:
//   sharp('images/socialTags.jpg').extract({left:0, top:2900, width:4284, height:2249}).resize(1200,630).jpeg({quality:82, mozjpeg:true})

// Photo band (images/band/elf-village-{800,1280,1500}.webp + elf-village.jpg) was made from the 1500px Elf Village photo.
