// Bump CACHE_VERSION on every deploy that changes cached assets
const CACHE_VERSION = 'v4';
const CACHE_NAME = 'tsiardaka-' + CACHE_VERSION;
const SHELL = [
    '/',
    '/css/style.css',
    '/js/main.js',
    '/js/language-switcher.js',
    '/images/logo-removebg-480.webp'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return; // never touch CDN / API / analytics calls

    const isImage = /\.(png|jpe?g|webp|avif|svg|gif|ico)$/i.test(url.pathname);

    if (isImage) {
        // Images rarely change: cache-first
        event.respondWith(
            caches.match(req).then(cached => cached || fetch(req).then(res => {
                if (res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); }
                return res;
            }))
        );
        return;
    }

    // HTML, CSS, JS: network-first so a deploy is picked up immediately; cache is the offline fallback
    event.respondWith(
        fetch(req).then(res => {
            if (res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); }
            return res;
        }).catch(() => caches.match(req).then(c => c || caches.match('/')))
    );
});
