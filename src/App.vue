<template>
  <div class="layout">
    <!-- Mobile overlay -->
    <div
      v-if="mobileOpen"
      class="mobile-overlay"
      @click="mobileOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside :class="{ open: mobileOpen }">
      <router-link to="/" class="sidebar-brand" @click="mobileOpen = false">
        <div class="logo-mark">M</div>
        <span>Mini<span class="accent">Mermaid</span></span>
      </router-link>

      <div class="sidebar-controls">
        <button
          class="theme-toggle"
          :title="isDark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'"
          @click="toggleTheme"
        >
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <span>{{ isDark ? 'Terang' : 'Gelap' }}</span>
        </button>
      </div>

      <ul class="nav">
        <li><router-link to="/" @click="mobileOpen = false">Pengenalan</router-link></li>

        <li class="menu-category">Diagram Dasar</li>
        <li><router-link to="/syntax" @click="mobileOpen = false">Flowchart</router-link></li>
        <li><router-link to="/swimlane" @click="mobileOpen = false">Swimlane</router-link></li>
        <li><router-link to="/sequence" @click="mobileOpen = false">Sequence</router-link></li>

        <li class="menu-category">Diagram Lanjutan</li>
        <li>
          <router-link to="/er" @click="mobileOpen = false">
            ER Diagram <span class="tag-new">NEW</span>
          </router-link>
        </li>
        <li>
          <router-link to="/mindmap" @click="mobileOpen = false">
            Mindmap <span class="tag-new">NEW</span>
          </router-link>
        </li>
        <li>
          <router-link to="/timeline" @click="mobileOpen = false">
            Timeline <span class="tag-new">NEW</span>
          </router-link>
        </li>

        <li class="menu-category">Contoh Proyek</li>
        <li><router-link to="/examples/ecommerce" @click="mobileOpen = false">Alur E-Commerce</router-link></li>
        <li><router-link to="/examples/software" @click="mobileOpen = false">Arsitektur Software</router-link></li>
        <li><router-link to="/examples/uml" @click="mobileOpen = false">Desain Sistem (UML)</router-link></li>

        <li class="menu-category">Referensi</li>
        <li><router-link to="/api" @click="mobileOpen = false">API & JavaScript</router-link></li>
        <li>
          <router-link to="/theme" @click="mobileOpen = false">
            Tema &amp; Warna <span class="tag-new">NEW</span>
          </router-link>
        </li>
        <li><router-link to="/playground" @click="mobileOpen = false">Live Playground</router-link></li>
        <li><router-link to="/about" @click="mobileOpen = false">Tentang Proyek</router-link></li>
      </ul>

      <div class="sidebar-footer">
        <span class="badge">v1.3.0</span>
        <span class="dot">·</span>
        <span>MIT</span>
      </div>
    </aside>

    <!-- Main -->
    <div class="main-wrapper">
      <!-- Mobile topbar -->
      <header class="mobile-bar">
        <button
          class="hamburger"
          aria-label="Buka menu"
          @click="mobileOpen = true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="20" height="20">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <router-link to="/" class="mobile-brand">
          <div class="logo-mark small">M</div>
          <span>Mini<span class="accent">Mermaid</span></span>
        </router-link>
        <button
          class="theme-toggle icon-only"
          :title="isDark ? 'Tema terang' : 'Tema gelap'"
          @click="toggleTheme"
        >
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="18" height="18">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="18" height="18">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </header>

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

type ThemeName = 'dark' | 'light';
const STORAGE_KEY = 'mm-docs-theme';

const isDark = ref((() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== 'light';
  } catch { return true; }
})());
const mobileOpen = ref(false);
const route = useRoute();

function applyTheme(name: ThemeName): void {
  isDark.value = name === 'dark';
  document.documentElement.setAttribute('data-theme', name);
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch { /* ignore */ }
}

function toggleTheme(): void {
  applyTheme(isDark.value ? 'light' : 'dark');
}

onMounted(() => {
  // Init dari localStorage (atau default dark)
  let initial: ThemeName = 'dark';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') initial = saved;
  } catch { /* ignore */ }
  applyTheme(isDark.value ? 'dark' : 'light');

  // Tutup sidebar mobile saat route berubah
  // (watch route tidak diperlukan karena setiap link sudah @click menutup)
});
</script>

<style scoped>
/* =========================================================
   LAYOUT
   ========================================================= */
.layout {
  display: flex;
  min-height: 100vh;
}

.main-wrapper {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 48px 56px 96px;
}
main > * {
  max-width: var(--content-max);
  margin: 0 auto;
}

/* =========================================================
   SIDEBAR
   ========================================================= */
aside {
  width: var(--sidebar-w);
  position: sticky;
  top: 0;
  height: 100vh;
  flex-shrink: 0;
  overflow-y: auto;
  padding: 20px 14px 24px;
  background: var(--panel);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: background var(--t-normal), border-color var(--t-normal);
  z-index: 50;
}
aside::-webkit-scrollbar { width: 6px; }

/* Brand */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 6px 18px;
  text-decoration: none;
  color: var(--text-strong);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.sidebar-brand:hover { text-decoration: none; }
.sidebar-brand .accent { color: var(--accent); }

.logo-mark {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--accent), #a371f7);
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 800;
  font-size: 14px;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}
.logo-mark.small {
  width: 26px;
  height: 26px;
  font-size: 12px;
  border-radius: 7px;
}

/* Theme controls */
.sidebar-controls {
  padding: 0 4px 16px;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 12px;
}

.theme-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--panel-2);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 7px 12px;
  border-radius: var(--radius-sm);
  font-size: 12.5px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
}
.theme-toggle:hover {
  background: var(--bg-elevated);
  border-color: var(--accent-border);
  color: var(--accent);
}
.theme-toggle svg {
  flex-shrink: 0;
  transition: transform var(--t-normal);
}
.theme-toggle:hover svg {
  transform: rotate(20deg);
}
.theme-toggle.icon-only {
  width: auto;
  padding: 6px;
  background: transparent;
  border-color: transparent;
}
.theme-toggle.icon-only:hover {
  background: var(--panel-2);
}

/* Nav */
.nav {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}
.nav li { margin-bottom: 2px; }
.nav a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 10px;
  border-radius: var(--radius-sm);
  color: var(--muted);
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 500;
  transition: color var(--t-fast), background var(--t-fast);
  overflow: hidden;
}
.nav a:hover {
  color: var(--text);
  background: var(--panel-2);
  text-decoration: none;
}
.nav a.router-link-active {
  color: var(--accent);
  background: var(--accent-soft);
  font-weight: 600;
}

/* Tag NEW */
.tag-new {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 2px 5px;
  border-radius: 4px;
  background: rgba(63, 185, 80, 0.15);
  color: var(--success);
  border: 1px solid rgba(63, 185, 80, 0.35);
  flex-shrink: 0;
}

/* Sidebar footer */
.sidebar-footer {
  margin-top: auto;
  padding: 16px 8px 4px;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: var(--muted-2);
}
.sidebar-footer .dot { opacity: 0.5; }

/* =========================================================
   MOBILE TOPBAR
   ========================================================= */
.mobile-bar {
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 40;
}
.mobile-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-strong);
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
}
.mobile-brand:hover { text-decoration: none; }
.mobile-brand .accent { color: var(--accent); }

.hamburger {
  background: transparent;
  border: 0;
  color: var(--text);
  cursor: pointer;
  padding: 6px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}
.hamburger:hover {
  background: var(--panel-2);
  color: var(--accent);
}

.mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 45;
  backdrop-filter: blur(2px);
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 900px) {
  aside {
    position: fixed;
    inset: 0 auto 0 0;
    transform: translateX(-100%);
    transition: transform var(--t-slow);
    box-shadow: var(--shadow-lg);
  }
  aside.open {
    transform: translateX(0);
  }

  .mobile-bar {
    display: flex;
  }

  .mobile-overlay {
    display: block;
  }

  main {
    padding: 24px 18px 64px;
  }
}
</style>