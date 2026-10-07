/**
 * utils.js — Feature detection & shared helpers
 * Drop-in for any site. No dependencies.
 */

export const FeatureDetect = {
    hasGPU() {
        try {
            var c = document.createElement('canvas');
            return !!(c.getContext('webgl2') || c.getContext('webgl'));
        } catch (e) { return false; }
    },
    hasHover() { return window.matchMedia('(hover: hover)').matches; },
    prefersReducedMotion() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; },
    hasTouch() { return 'ontouchstart' in window; }
};

export const Utils = {
    /** Smooth lerp between two values */
    lerp(a, b, t) { return a + (b - a) * t; },

    /** Show a toast notification. Requires a .toast CSS class. */
    showToast(message, duration = 3000) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => toast.classList.remove('visible'), duration);
    },

    /** Normalize a date to midnight for safe comparisons */
    normalizeDate(date) {
        if (!date) return null;
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    },

    /** Check if a date is in the past */
    isDatePast(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.normalizeDate(date) < today;
    },

    /** Debounce a function call */
    debounce(fn, ms = 150) {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    },

    /** Clamp a value between min and max */
    clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
};
