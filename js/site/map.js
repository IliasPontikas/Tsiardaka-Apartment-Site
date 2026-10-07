/**
 * map.js — MapLibre GL JS location map for Tsiardaka Apartment
 * Requires: maplibregl global (CDN), #map element
 */

import { CONFIG } from './config.js';

/* Icon badges (24x24 stroke icons) */
var SVG = function(paths) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>'; };
var ICONS = {
    home:     SVG('<path d="M3 11 12 3.500 21 11"/><path d="M5.500 9.500V21h13V9.500"/><path d="M10 21v-6h4v6"/>'),
    tree:     SVG('<path d="M12 2.500 6.500 10H9l-4 6h4.500L7 21h10l-2.500-5H19l-4-6h2.500z"/>'),
    square:   SVG('<path d="M3 21h18"/><path d="M5.500 21V10.500M10 21V10.500M14 21V10.500M18.500 21V10.500"/><path d="M3 10.500 12 4.500l9 6z"/>'),
    fortress: SVG('<path d="M5 21V8h3V5h2v3h4V5h2v3h3v13z"/><path d="M10 21v-5h4v5"/>'),
    taverna:  SVG('<path d="M5.500 3v6.500a2 2 0 0 0 4 0V3M7.500 3v18"/><path d="M17 3c-2.200 1.800-3 4.800-3 8h3v10"/>')
};
// Every place must be visible when the map opens (no zooming out needed)
var BOUNDS = [[21.7588, 39.5464], [21.7679, 39.5579]];

export const LocationMap = {
    init() {
        var container = document.getElementById('map');
        if (!container || typeof maplibregl === 'undefined') return;

        // Touch screens: full-width map must not trap page scrolling, so it needs two fingers (with a short hint)
        var touch = window.matchMedia('(pointer: coarse)').matches;
        var en    = document.documentElement.lang === 'en';
        var map = new maplibregl.Map({
            cooperativeGestures: touch ? {
                windowsHelpText: en ? 'Use Ctrl + scroll to zoom the map' : 'Χρησιμοποιήστε Ctrl + scroll για ζουμ στον χάρτη',
                macHelpText:     en ? 'Use ⌘ + scroll to zoom the map'    : 'Χρησιμοποιήστε ⌘ + scroll για ζουμ στον χάρτη',
                mobileHelpText:  en ? 'Use two fingers to move the map'   : 'Χρησιμοποιήστε δύο δάχτυλα για να μετακινήσετε τον χάρτη'
            } : false,
            container: 'map',
            style: {
                version: 8,
                sources: { osm: { type: 'raster', tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256, attribution: '&copy; OpenStreetMap' } },
                layers:  [{ id: 'osm', type: 'raster', source: 'osm' }]
            },
            center: CONFIG.MAP_CENTER,   // only a fallback: the view below is fitted to all the places
            bounds: BOUNDS,
            fitBoundsOptions: { padding: { top: 64, bottom: 56, left: 56, right: 64 }, maxZoom: 16 }
        });
        map.addControl(new maplibregl.NavigationControl(), 'top-right');

        var en = document.documentElement.lang === 'en';
        var markers = [
            { icon: 'home',     coords: [21.764677512658004, 39.551336994639726], title: 'Tsiardaka Apartment', main: true },
            { icon: 'tree',     coords: [21.75882452615013,  39.54642843380996],  title: en ? 'Elf Mill — 9 min'              : 'Μύλος των Ξωτικών — 9 λεπτά' },
            { icon: 'square',   coords: [21.767885668478698, 39.55615671060874],  title: en ? 'Central Square — 9 min'        : 'Κεντρική Πλατεία — 9 λεπτά' },
            { icon: 'fortress', coords: [21.76285322429936,  39.55792216516003],  title: en ? 'Old Town & Fortress — 17 min'  : 'Παλιά Πόλη και Φρούριο — 17 λεπτά' },
            { icon: 'taverna',  coords: [21.766265246459696, 39.55758069595936],  title: en ? 'Manavika taverns — 13 min'     : 'Μαναβικά — 13 λεπτά' }
        ];

        markers.forEach(function(m) {
            // outer element is positioned by MapLibre; the badge inside can safely scale on hover
            var el = document.createElement('div');
            el.className = 'map-marker' + (m.main ? ' is-main' : '');
            el.setAttribute('role', 'img');
            el.setAttribute('aria-label', m.title);
            el.innerHTML = '<span class="map-pin">' + ICONS[m.icon] + '</span>';

            var link = 'https://www.google.com/maps/search/?api=1&query=' + m.coords[1] + ',' + m.coords[0];
            var html = '<strong>' + m.title + '</strong><br><a class="map-popup-link" href="' + link + '" target="_blank" rel="noopener">' +
                       (en ? 'Open in Google Maps' : 'Άνοιγμα στο Google Maps') + '</a>';
            new maplibregl.Marker({ element: el })
                .setLngLat(m.coords)
                .setPopup(new maplibregl.Popup({ offset: m.main ? 26 : 22 }).setHTML(html))
                .addTo(map);
        });
    }
};
