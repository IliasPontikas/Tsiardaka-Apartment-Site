/**
 * gallery.js — Draggable photo strip (with arrows + progress) and accessible fullscreen lightbox
 * Requires: .gallery-strip, .gallery-controls, #gallery-overlay, #gallery-expanded-img,
 *           #gallery-caption, #gallery-thumbs
 * Requires: GSAP + Draggable plugin (globals)
 */

export const EditorialGallery = {
    isOpen: false,
    currentIndex: 0,
    images: [],
    captions: [],
    items: [],
    overlay: null,
    expandedImg: null,
    counter: null,
    captionEl: null,
    thumbsEl: null,
    trigger: null,
    drag: null,
    gridEl: null,
    gridOpener: null,
    gridOpen: false,
    _dragged: false,
    _token: 0,

    init() {
        var self   = this;
        var strip  = document.querySelector('.gallery-strip');
        this.overlay     = document.getElementById('gallery-overlay');
        this.expandedImg = document.getElementById('gallery-expanded-img');
        this.counter     = this.overlay ? this.overlay.querySelector('.gallery-counter') : null;
        this.captionEl   = document.getElementById('gallery-caption');
        this.thumbsEl    = document.getElementById('gallery-thumbs');
        if (!strip || !this.overlay) return;

        this.items = Array.prototype.slice.call(strip.querySelectorAll('.gallery-strip-item'));
        this.items.forEach(function(item) {
            var img = item.querySelector('img');
            var cap = item.querySelector('.gallery-caption');
            var text = cap ? cap.textContent.trim() : (img ? img.alt : '');
            self.images.push(img.getAttribute('data-full') || img.src);
            self.captions.push(text);
            item.setAttribute('aria-label', text);
        });

        this.buildThumbs();
        this.initGrid();
        this.initStrip(strip);
        this.initLightbox();
    },

    /* ---------- Strip: drag + arrows + progress ---------- */
    initStrip(strip) {
        var self     = this;
        var bar      = document.querySelector('.gallery-progress-bar');
        var prevBtn  = document.querySelector('.gallery-arrow-prev');
        var nextBtn  = document.querySelector('.gallery-arrow-next');
        var countEl  = document.querySelector('.gallery-count');
        var viewport = strip.parentElement;
        var chips    = Array.prototype.slice.call(document.querySelectorAll('.gallery-room'));
        var phoneMQ  = window.matchMedia('(max-width: 768px)');
        var native   = false;   // phones: native scroll + snap, one full-width photo per swipe. Desktop: GSAP drag.
        var ticking  = false;

        function getX() { return native ? -strip.scrollLeft : (typeof gsap !== 'undefined' ? gsap.getProperty(strip, 'x') : 0); }
        function minX() { return native ? -(strip.scrollWidth - strip.clientWidth) : Math.min(0, -(strip.scrollWidth - viewport.offsetWidth)); }

        function highlightRoom() {
            if (!chips.length) return;
            var x = getX();
            var centre = (native ? strip.clientWidth : viewport.offsetWidth) * 0.35 - x; // item at ~1/3 of the viewport counts as "current"
            var current = self.items[0].getAttribute('data-room');
            self.items.forEach(function(it) { if (it.offsetLeft <= centre) current = it.getAttribute('data-room'); });
            if (x <= minX() + 4) current = self.items[self.items.length - 1].getAttribute('data-room'); // scrolled to the end
            chips.forEach(function(c) { c.classList.toggle('active', c.getAttribute('data-room') === current); });
        }
        function progress() {
            ticking = false;
            highlightRoom();
            var min = minX();
            var p = min === 0 ? 0 : Math.min(1, Math.max(0, getX() / min));
            if (bar) bar.style.transform = 'scaleX(' + (0.12 + 0.88 * p) + ')';
            if (prevBtn) prevBtn.disabled = p <= 0.01;
            if (nextBtn) nextBtn.disabled = p >= 0.99;
            if (countEl) {
                var n = self.items.length;
                var idx = native ? Math.min(n, Math.round(strip.scrollLeft / Math.max(1, strip.clientWidth)) + 1) : 0;
                countEl.textContent = native ? idx + ' / ' + n : '';
            }
        }

        function slide(direction) {
            if (native) { strip.scrollBy({ left: direction * strip.clientWidth, behavior: 'smooth' }); return; }
            var step   = viewport.offsetWidth * 0.8 * direction;
            var target = Math.max(minX(), Math.min(0, gsap.getProperty(strip, 'x') - step));
            gsap.to(strip, { x: target, duration: 0.7, ease: 'power3.out', onUpdate: function() { self.drag.update(); progress(); } });
        }
        if (prevBtn) prevBtn.addEventListener('click', function() { slide(-1); });
        if (nextBtn) nextBtn.addEventListener('click', function() { slide(1); });

        chips.forEach(function(chip) {
            chip.addEventListener('click', function() {
                var target = self.items.filter(function(it) { return it.getAttribute('data-room') === chip.getAttribute('data-room'); })[0];
                if (!target) return;
                if (native) { strip.scrollTo({ left: target.offsetLeft, behavior: 'smooth' }); return; }
                var x = Math.max(minX(), Math.min(0, -(target.offsetLeft - 48)));
                gsap.to(strip, { x: x, duration: 0.9, ease: 'power3.inOut', onUpdate: function() { self.drag.update(); progress(); } });
            });
        });

        function enableNative() {
            native = true;
            if (self.drag) { self.drag.kill(); self.drag = null; }
            if (typeof gsap !== 'undefined') gsap.set(strip, { clearProps: 'transform' });
            strip.classList.add('gallery-native');
            progress();
        }
        function enableDrag() {
            if (typeof Draggable === 'undefined' || typeof gsap === 'undefined') { enableNative(); return; } // no GSAP: native scrolling everywhere
            native = false;
            strip.classList.remove('gallery-native');
            strip.scrollLeft = 0;
            if (self.drag) self.drag.kill();
            self.drag = Draggable.create(strip, {
                type: 'x',
                edgeResistance: 0.65,
                bounds: { minX: minX(), maxX: 0 },
                inertia: true,
                throwResistance: 2000,
                onDrag:        function() { self._dragged = true; progress(); },
                onThrowUpdate: progress,
                onDragEnd:     function() { setTimeout(function() { self._dragged = false; }, 100); }
            })[0];
            progress();
        }
        function applyMode() { if (phoneMQ.matches) enableNative(); else enableDrag(); }
        if (phoneMQ.addEventListener) phoneMQ.addEventListener('change', applyMode); else phoneMQ.addListener(applyMode);

        strip.addEventListener('scroll', function() {
            if (native && !ticking) { ticking = true; window.requestAnimationFrame(progress); }
        }, { passive: true });

        window.addEventListener('resize', function() {
            if (!native && self.drag) {
                self.drag.applyBounds({ minX: minX(), maxX: 0 });
                if (gsap.getProperty(strip, 'x') < minX()) gsap.set(strip, { x: minX() });
                self.drag.update();
            }
            progress();
        });
        applyMode();
    },

    /* ---------- "View all photos" grid ---------- */
    initGrid() {
        var self = this;
        this.gridEl = document.getElementById('gallery-grid');
        var openBtn = document.querySelector('.gallery-viewall');
        if (!this.gridEl || !openBtn) return;

        var count = openBtn.querySelector('.gallery-viewall-count');
        if (count) count.textContent = '(' + this.images.length + ')';

        // Room labels come from the room buttons so they follow the page language
        var labels = {};
        Array.prototype.forEach.call(document.querySelectorAll('.gallery-room'), function(c) { labels[c.getAttribute('data-room')] = c.textContent.trim(); });

        var list  = this.gridEl.querySelector('.gallery-grid-list');
        var title = this.gridEl.querySelector('.gallery-grid-title');
        var h2    = document.querySelector('#gallery .section-title');
        if (title && h2) title.textContent = h2.textContent;
        var lastRoom = null;
        this.items.forEach(function(item, i) {
            var room = item.getAttribute('data-room');
            if (room !== lastRoom) {
                var head = document.createElement('h4');
                head.className = 'gallery-grid-room';
                head.textContent = labels[room] || '';
                list.appendChild(head);
                lastRoom = room;
            }
            var img  = item.querySelector('img');
            var btn  = document.createElement('button');
            btn.type = 'button';
            btn.className = 'gallery-grid-item';
            btn.setAttribute('aria-label', self.captions[i] + ' ' + (i + 1));
            var th = document.createElement('img');
            th.src = self.images[i].replace(/-\d+\.webp$/, '-480.webp');
            th.alt = '';
            th.loading = 'lazy';
            th.width  = img.getAttribute('width')  || 480;
            th.height = img.getAttribute('height') || 640;
            btn.appendChild(th);
            btn.addEventListener('click', function() { self.open(i, btn); });
            list.appendChild(btn);
        });

        openBtn.addEventListener('click', function() { self.openGrid(openBtn); });
        this.gridEl.querySelector('.gallery-grid-close').addEventListener('click', function() { self.closeGrid(); });
    },

    openGrid(opener) {
        this.gridOpener = opener || null;
        this.gridOpen = true;
        this.gridEl.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.gridEl.querySelector('.gallery-grid-close').focus();
    },

    closeGrid() {
        this.gridOpen = false;
        this.gridEl.classList.remove('active');
        document.body.style.overflow = '';
        if (this.gridOpener && this.gridOpener.focus) this.gridOpener.focus({ preventScroll: true });
    },

    /* ---------- Lightbox ---------- */
    buildThumbs() {
        var self = this;
        if (!this.thumbsEl) return;
        this.thumbsEl.innerHTML = '';
        this.images.forEach(function(src, i) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'gallery-thumb';
            btn.setAttribute('aria-label', self.captions[i]);
            var im = document.createElement('img');
            im.src = src.replace(/-\d+\.webp$/, '-480.webp');
            im.alt = '';
            im.loading = 'lazy';
            btn.appendChild(im);
            btn.addEventListener('click', function() { self.show(i); });
            self.thumbsEl.appendChild(btn);
        });
    },

    initLightbox() {
        var self = this;

        this.items.forEach(function(item, i) {
            function open() { if (!self._dragged) self.open(i, item); }
            item.addEventListener('click', open);
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self.open(i, item); }
            });
        });

        this.overlay.querySelector('.gallery-close').addEventListener('click', function() { self.close(); });
        this.overlay.querySelector('.gallery-prev').addEventListener('click',  function() { self.prev();  });
        this.overlay.querySelector('.gallery-next').addEventListener('click',  function() { self.next();  });
        this.overlay.addEventListener('click', function(e) { if (e.target === self.overlay) self.close(); });

        document.addEventListener('keydown', function(e) {
            if (!self.isOpen) {
                if (self.gridOpen) {
                    if (e.key === 'Escape') self.closeGrid();
                    if (e.key === 'Tab')    self.trapFocus(e, self.gridEl);
                }
                return;
            }
            if (e.key === 'Escape')     self.close();
            if (e.key === 'ArrowLeft')  self.prev();
            if (e.key === 'ArrowRight') self.next();
            if (e.key === 'Tab')        self.trapFocus(e);
        });

        var touchStartX = 0;
        this.overlay.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
        this.overlay.addEventListener('touchend',   function(e) {
            var diff = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(diff) > 50) { if (diff > 0) self.prev(); else self.next(); }
        }, { passive: true });
    },

    trapFocus(e, root) {
        root = root || this.overlay;
        var focusables = Array.prototype.slice.call(root.querySelectorAll('button')).filter(function(b) { return b.offsetParent !== null; });
        if (!focusables.length) return;
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    },

    show(idx) {
        var self = this;
        var token = ++this._token;
        this.currentIndex = idx;
        var src = this.images[idx];
        var img = this.expandedImg;
        img.classList.add('is-loading');
        var loader = new Image();
        loader.onload = function() {
            if (token !== self._token) return;
            img.src = src;
            img.alt = self.captions[idx];
            requestAnimationFrame(function() { img.classList.remove('is-loading'); });
        };
        loader.src = src;

        if (this.captionEl) this.captionEl.textContent = this.captions[idx];
        if (this.counter)   this.counter.textContent   = (idx + 1) + '/' + this.images.length;
        if (this.thumbsEl) {
            Array.prototype.forEach.call(this.thumbsEl.children, function(t, i) {
                t.classList.toggle('active', i === idx);
                if (i === idx) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
            });
            var active = this.thumbsEl.children[idx];
            if (active && active.scrollIntoView) active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
        }
        // Preload neighbours for instant navigation
        [idx - 1, idx + 1].forEach(function(n) {
            var j = (n + self.images.length) % self.images.length;
            var pre = new Image(); pre.src = self.images[j];
        });
    },

    open(idx, trigger) {
        this.trigger = trigger || null;
        this.isOpen = true;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.show(idx);
        this.overlay.querySelector('.gallery-close').focus();
    },

    close() {
        this.isOpen = false;
        this._token++;
        this.overlay.classList.remove('active');
        document.body.style.overflow = this.gridOpen ? 'hidden' : '';
        if (this.trigger && this.trigger.focus) this.trigger.focus({ preventScroll: true });
    },

    prev() { this.show((this.currentIndex - 1 + this.images.length) % this.images.length); },
    next() { this.show((this.currentIndex + 1) % this.images.length); }
};
