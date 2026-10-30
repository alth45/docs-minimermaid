import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

/* =========================================================
   ANTI-FOWT (Flash of Wrong Theme)
   Baca tema dari localStorage SEBELUM mount, terapkan ke
   <html> langsung. Ini memastikan CSS yang membaca
   `[data-theme="light"]` / `[data-theme="dark"]` langsung
   aktif sejak paint pertama.
   ========================================================= */

/** Kunci localStorage — HARUS sama dengan yang dipakai di `App.vue`. */
const THEME_KEY = 'mm-docs-theme';

type ThemeName = 'dark' | 'light';

function readInitialTheme(): ThemeName {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
    } catch {
        /* localStorage diblokir (privacy mode, dll.) — pakai default */
    }
    return 'dark';
}

function applyThemeBeforeMount(): void {
    const theme = readInitialTheme();
    const root = document.documentElement;

    // 1. Token warna aktif (via CSS selector [data-theme="..."])
    root.setAttribute('data-theme', theme);

    // 2. Hint ke browser untuk form controls, scrollbar, & UI native
    //    (light/dark — dikenali Chrome, Firefox, Safari 16+)
    root.style.colorScheme = theme;

    // 3. Meta theme-color untuk browser mobile (address bar iOS/Android)
    const meta = document.querySelector('meta[name="theme-color"]');
    const color = theme === 'light' ? '#ffffff' : '#0a0e14';
    if (meta) {
        meta.setAttribute('content', color);
    } else {
        const m = document.createElement('meta');
        m.name = 'theme-color';
        m.content = color;
        document.head.appendChild(m);
    }
}

applyThemeBeforeMount();

/* =========================================================
   BOOTSTRAP VUE
   ========================================================= */

const app = createApp(App);
app.use(router);
app.mount('#app');