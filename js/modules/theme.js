/**
 * theme.js — Dark/light theme toggle
 * Requires: .theme-toggle buttons in HTML
 * Persists choice to localStorage under key "theme"
 */

export const ThemeToggle = {
    init() {
        var saved = localStorage.getItem('theme');
        // Light is the default for everyone; dark only if the visitor chose it with the toggle
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        document.querySelectorAll('.theme-toggle').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                if (isDark) {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                }
            });
        });
    }
};
