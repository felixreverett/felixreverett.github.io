import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const THEME_KEY = 'theme-preference';

function createThemeStore() {
    let initialTheme = 'light';

    if (browser) {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
            initialTheme = savedTheme;
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            initialTheme = prefersDark ? 'dark' : 'light';
        }
    }
    const { subscribe, set, update } = writable(initialTheme);
    function applyThemeToDOM(theme) {
        if (browser) {
            document.documentElement.setAttribute('data-theme', theme);
            if (theme === 'dark') {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }
    }
    applyThemeToDOM(initialTheme);
    subscribe(value => {
    });

    if (browser) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const savedTheme = localStorage.getItem(THEME_KEY);
            if (!savedTheme) {
                const newTheme = event.matches ? 'dark' : 'light';
                set(newTheme);
            } else {
                
            }
        });
    }

    return {
        subscribe,
        toggle: () => {
            update(currentTheme => {
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                if (browser) {
                    localStorage.setItem(THEME_KEY, newTheme);
                }
                applyThemeToDOM(newTheme);
                return newTheme;
            });
        },
        
        setTheme: (theme) => {
            if (browser) {
                localStorage.setItem(THEME_KEY, theme);
            }
            set(theme);
            applyThemeToDOM(theme);
        }
    };
}

export const theme = createThemeStore();