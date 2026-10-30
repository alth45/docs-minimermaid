import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// === Diagram Dasar ===
import Home from './views/Home.vue';
import Syntax from './views/Syntax.vue';
import Swimlane from './views/Swimlane.vue';
import Sequence from './views/Sequence.vue';

// === Diagram Lanjutan (BARU) ===
import Er from './views/Er.vue';
import Mindmap from './views/Mindmap.vue';
import Timeline from './views/Timeline.vue';

// === Contoh Proyek ===
import ExEcommerce from './views/ExEcommerce.vue';
import ExSoftware from './views/ExSoftware.vue';
import ExUML from './views/ExUML.vue';

// === Referensi ===
import Api from './views/Api.vue';
import Theme from './views/Theme.vue';
import Playground from './views/Playground.vue';
import About from './views/About.vue';

/* =========================================================
   ROUTES
   ========================================================= */

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home, meta: { title: 'Pengenalan' } },

  // Diagram Dasar
  { path: '/syntax', component: Syntax, meta: { title: 'Flowchart' } },
  { path: '/swimlane', component: Swimlane, meta: { title: 'Swimlane' } },
  { path: '/sequence', component: Sequence, meta: { title: 'Sequence' } },

  // Diagram Lanjutan
  { path: '/er', component: Er, meta: { title: 'ER Diagram' } },
  { path: '/mindmap', component: Mindmap, meta: { title: 'Mindmap' } },
  { path: '/timeline', component: Timeline, meta: { title: 'Timeline' } },

  // Contoh Proyek
  { path: '/examples/ecommerce', component: ExEcommerce, meta: { title: 'Alur E-Commerce' } },
  { path: '/examples/software', component: ExSoftware, meta: { title: 'Arsitektur Software' } },
  { path: '/examples/uml', component: ExUML, meta: { title: 'Desain Sistem (UML)' } },

  // Referensi
  { path: '/api', component: Api, meta: { title: 'API & JavaScript' } },
  { path: '/theme', component: Theme, meta: { title: 'Tema & Warna' } },
  { path: '/playground', component: Playground, meta: { title: 'Live Playground' } },
  { path: '/about', component: About, meta: { title: 'Tentang Proyek' } },

  // Catch-all: URL tidak dikenal → kembali ke Pengenalan
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

/* =========================================================
   ROUTER INSTANCE
   ========================================================= */

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // Kembali ke posisi sebelumnya saat back/forward, atau ke atas pada navigasi biasa
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 };
    return { top: 0, behavior: 'smooth' };
  },
});

/* =========================================================
   TITLE HOOK — update <title> per navigasi
   ========================================================= */

const BASE_TITLE = 'MiniMermaid Docs';

router.afterEach((to) => {
  const title = (to.meta.title as string | undefined) ?? '';
  document.title = title ? `${title} · ${BASE_TITLE}` : BASE_TITLE;
});

export default router;