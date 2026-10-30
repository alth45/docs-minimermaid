<template>
  <div class="about-page">
    <!-- =========================================================
         HERO
         ========================================================= -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-badges">
          <span class="badge">v1.3.0</span>
          <span class="badge badge-success">9 Tipe Diagram</span>
          <span class="badge badge-purple">MIT License</span>
        </div>

        <h1>
          Tentang
          <span class="gradient-text">MiniMermaid</span>
        </h1>

        <p class="lead">
          Library diagram teks-ke-SVG yang ringan, cepat, dan dibuat untuk developer.
          Terinspirasi Mermaid.js, tapi dirancang tanpa dependensi framework agar bisa
          disisipkan ke HTML biasa, React, Vue, Svelte, maupun Node.js.
        </p>
      </div>
    </section>

    <!-- =========================================================
         VISI & MISI
         ========================================================= -->
    <section class="section">
      <h2>Visi &amp; Misi</h2>

      <div class="vision-grid">
        <div class="vision-card">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h3>Cepat &amp; Ringan</h3>
          <p>
            Parsing dan rendering milidetik. Zero DOM core memungkinkan SSR dan unit test
            tanpa browser. Bundle minimal via tree-shaking.
          </p>
        </div>

        <div class="vision-card">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3>Modular &amp; Extensible</h3>
          <p>
            Menambah tipe diagram baru cukup dengan membuat engine baru di
            <code>core/</code> dan mendaftarkannya di <code>compile.ts</code>.
          </p>
        </div>

        <div class="vision-card">
          <div class="vision-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h3>Developer First</h3>
          <p>
            API bersih, TypeScript strict, dan error dikumpulkan sebagai data — bukan
            exception. Semua fitur bisa diuji tanpa browser.
          </p>
        </div>
      </div>
    </section>

    <!-- =========================================================
         ROADMAP
         ========================================================= -->
    <section class="section">
      <h2>Roadmap Pengembangan</h2>
      <p class="section-desc">
        Proyek ini dibangun secara inkremental dalam 5 batch besar. Semua batch di bawah
        sudah selesai dan terintegrasi di versi terbaru.
      </p>

      <div class="roadmap-list">
        <div
          v-for="(batch, i) in roadmap"
          :key="i"
          class="roadmap-item"
          :class="{ done: batch.done }"
        >
          <div class="roadmap-marker">
            <svg v-if="batch.done" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span v-else>{{ i + 1 }}</span>
          </div>

          <div class="roadmap-body">
            <div class="roadmap-header">
              <span class="roadmap-tag">Batch {{ batch.num }}</span>
              <h3>{{ batch.title }}</h3>
              <span v-if="batch.done" class="roadmap-status done">Selesai</span>
            </div>
            <p>{{ batch.desc }}</p>
            <ul class="roadmap-features">
              <li v-for="(f, j) in batch.features" :key="j">{{ f }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================
         TECH STACK — dengan ikon per teknologi
         ========================================================= -->
    <section class="section">
      <h2>Teknologi yang Digunakan</h2>
      <p class="section-desc">
        Stack modern yang ringan, cepat, dan type-safe — dipilih untuk performa
        dan pengalaman developer.
      </p>

      <div class="tech-grid">
        <div v-for="tech in techStack" :key="tech.name" class="tech-item">
          <div
            class="tech-icon"
            :style="{ background: tech.bg, color: tech.color }"
            :aria-label="tech.name"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="22"
              height="22"
              aria-hidden="true"
              v-html="tech.path"
            ></svg>
          </div>
          <div class="tech-info">
            <strong>{{ tech.name }}</strong>
            <span>{{ tech.role }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================
         VERSION TIMELINE
         ========================================================= -->
    <section class="section">
      <h2>Riwayat Versi</h2>

      <div class="version-timeline">
        <div v-for="(v, i) in versions" :key="i" class="version-item">
          <div class="version-badge" :class="{ latest: v.latest }">
            {{ v.version }}
            <span v-if="v.latest" class="latest-tag">terbaru</span>
          </div>
          <div class="version-body">
            <div class="version-date">{{ v.date }}</div>
            <p>{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================
         KONTRIBUSI
         ========================================================= -->
    <section class="section">
      <h2>Kontribusi</h2>
      <p class="section-desc">
        Proyek ini terbuka untuk kontribusi dari siapa pun — baik perbaikan bug,
        penambahan fitur, dokumentasi, atau sekadar laporan issue.
      </p>

      <div class="contribute-grid">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="contribute-card"
        >
          <div class="contribute-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </div>
          <strong>GitHub</strong>
          <span>Lihat source, fork, atau buka issue</span>
        </a>

        <div class="contribute-card">
          <div class="contribute-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <strong>Dokumentasi</strong>
          <span>Perbaiki typo atau tambah contoh</span>
        </div>

        <div class="contribute-card">
          <div class="contribute-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <strong>Engine Baru</strong>
          <span>Buat engine diagram tipe baru</span>
        </div>
      </div>

      <div class="contribute-note">
        <strong>Alur kontribusi:</strong>
        fork → branch baru → commit → pull request. Semua PR akan di-review sebelum
        di-merge.
      </div>
    </section>

    <!-- =========================================================
         LICENSE
         ========================================================= -->
    <section class="section section-last">
      <div class="license-card">
        <div class="license-badge">MIT</div>
        <div class="license-body">
          <h3>MIT License</h3>
          <p>
            Silakan dipakai, dimodifikasi, dan dibagikan secara bebas — untuk keperluan
            pribadi maupun komersial. Atribusi tidak wajib, tapi selalu dihargai.
          </p>
        </div>
      </div>
    </section>

    <!-- =========================================================
         NEXT STEPS
         ========================================================= -->
    <div class="next-steps">
      <h3>Selanjutnya</h3>
      <div class="next-grid">
        <router-link to="/api" class="next-card">
          <strong>API Reference →</strong>
          <span>Semua opsi &amp; signature</span>
        </router-link>
        <router-link to="/theme" class="next-card">
          <strong>Tema &amp; Warna →</strong>
          <span>Palet &amp; custom theme</span>
        </router-link>
        <router-link to="/playground" class="next-card">
          <strong>Playground →</strong>
          <span>Eksperimen langsung</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* =========================================================
   ROADMAP
   ========================================================= */
interface RoadmapBatch {
  num: string;
  title: string;
  desc: string;
  features: string[];
  done: boolean;
}

const roadmap: RoadmapBatch[] = [
  {
    num: '1',
    title: 'UX Essentials',
    desc: 'Fondasi interaksi aplikasi playground.',
    features: [
      'Zoom controls + shortcut Ctrl+= / Ctrl+- / Ctrl+0',
      'Share URL (base64 hash), Copy SVG, auto-save localStorage',
    ],
    done: true,
  },
  {
    num: '2',
    title: 'Sintaks & Tema',
    desc: 'Perluasan DSL dan sistem tema.',
    features: [
      'Edge label sintaks -- label --> di flowchart & cabang',
      'Theme switcher dark/light dengan warna di-bake ke SVG',
    ],
    done: true,
  },
  {
    num: '3',
    title: 'Interop & Shortcuts',
    desc: 'Portabilitas dokumen dan produktivitas.',
    features: [
      'Export/import .mmd.json + drag & drop ke preview',
      'Keyboard shortcuts + modal cheat-sheet (Ctrl+/)',
    ],
    done: true,
  },
  {
    num: '4',
    title: 'Tipe Diagram Baru',
    desc: 'Tiga tipe diagram baru yang sering diminta.',
    features: [
      'ER Diagram ([er]) — crow\'s foot notation, badge PK/FK',
      'Mindmap ([mindmap]) — radial split kiri/kanan',
      'Timeline ([timeline]) — kartu alternating + milestone',
    ],
    done: true,
  },
  {
    num: '5',
    title: 'Editor & Navigasi',
    desc: 'Editor visual interaktif di atas kanvas.',
    features: [
      'Node selector + property panel (bentuk, warna, ikon, label, link, tooltip)',
      'Minimap navigasi dengan viewport rectangle draggable',
    ],
    done: true,
  },
];

/* =========================================================
   TECH STACK — dengan ikon SVG inline
   Setiap path dipilih agar recognizable saat dilihat.
   ========================================================= */
interface TechItem {
  name: string;
  role: string;
  color: string;
  bg: string;
  path: string;
}

const techStack: TechItem[] = [
  {
    name: 'TypeScript (strict)',
    role: 'Bahasa utama, tipisasi menyeluruh',
    color: '#3178c6',
    bg: 'rgba(49, 120, 198, 0.14)',
    // Kotak dengan huruf T (TypeScript)
    path: `<rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M12 9v7" />`,
  },
  {
    name: 'Vite 7',
    role: 'Build tool & bundler (UMD / ESM)',
    color: '#646cff',
    bg: 'rgba(100, 108, 255, 0.14)',
    // Petir (Vite = cepat)
    path: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />`,
  },
  {
    name: 'Vue 3',
    role: 'Framework dokumentasi (SPA)',
    color: '#41b883',
    bg: 'rgba(65, 184, 131, 0.14)',
    // Chevron V dengan notch (logo Vue)
    path: `<path d="M2 4L12 22L22 4L18 4L12 14L6 4Z" />`,
  },
  {
    name: 'Vitest',
    role: 'Unit testing (Node environment)',
    color: '#729b1b',
    bg: 'rgba(114, 155, 27, 0.14)',
    // Labu / flask (test)
    path: `<path d="M10 2v7.5a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.154A2 2 0 0 1 14 9.5V2" /><path d="M8.5 2h7" /><path d="M7 16h10" />`,
  },
  {
    name: 'Lucide Icons',
    role: 'Penyedia ikon SVG',
    color: '#f56565',
    bg: 'rgba(245, 101, 101, 0.14)',
    // Layers / stack
    path: `<path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />`,
  },
  {
    name: 'SVG',
    role: 'Format rendering diagram',
    color: '#e34f26',
    bg: 'rgba(227, 79, 38, 0.14)',
    // Kurung kurawal code </>
    path: `<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />`,
  },
];

/* =========================================================
   VERSION TIMELINE
   ========================================================= */
const versions = [
  {
    version: 'v1.0.0',
    date: 'Q1 2024',
    desc: 'Rilis awal — 6 tipe diagram: Flowchart, Swimlane, Sequence, Class, State, Network.',
    latest: false,
  },
  {
    version: 'v1.1.0',
    date: 'Q2 2024',
    desc: 'Interactive nodes (link & tooltip), rich text label, Lucide icon integration.',
    latest: false,
  },
  {
    version: 'v1.2.0',
    date: 'Q3 2024',
    desc: 'Grouping, swimlane, edge style (smooth/step/straight), dukungan CJK/emoji.',
    latest: false,
  },
  {
    version: 'v1.3.0',
    date: 'Q4 2024',
    desc: 'Batch 1–5B: tema dark/light, edge label, dokumen .mmd.json, shortcuts, ER, Mindmap, Timeline, node editor, minimap.',
    latest: true,
  },
];
</script>

<style scoped>
/* =========================================================
   WRAPPER
   ========================================================= */
.about-page {
  max-width: var(--content-max);
  margin: 0 auto;
}

/* =========================================================
   HERO
   ========================================================= */
.hero {
  position: relative;
  padding: 8px 0 32px;
  margin-bottom: 24px;
}

.hero-bg {
  position: absolute;
  inset: -40px -60px auto -60px;
  height: 280px;
  background:
    radial-gradient(ellipse 60% 60% at 30% 20%, rgba(88, 166, 255, 0.12), transparent 70%),
    radial-gradient(ellipse 50% 50% at 70% 0%, rgba(163, 113, 247, 0.1), transparent 70%);
  pointer-events: none;
  z-index: -1;
  filter: blur(24px);
}

.hero-content {
  position: relative;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.badge-success {
  background: rgba(63, 185, 80, 0.12);
  color: var(--success);
  border-color: rgba(63, 185, 80, 0.35);
}
.badge-purple {
  background: rgba(163, 113, 247, 0.12);
  color: #a371f7;
  border-color: rgba(163, 113, 247, 0.35);
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent), #a371f7 60%, #f778ba);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.lead {
  font-size: 16px;
  color: var(--muted);
  line-height: 1.65;
  max-width: 68ch;
  margin: 0;
}

/* =========================================================
   SECTION
   ========================================================= */
.section {
  padding: 40px 0;
  border-top: 1px solid var(--border-subtle);
}
.section:first-of-type {
  border-top: 0;
  padding-top: 24px;
}
.section-last {
  padding-bottom: 24px;
}

.section-desc {
  color: var(--muted);
  font-size: 14.5px;
  margin: -8px 0 24px;
  max-width: 68ch;
}

/* =========================================================
   VISION
   ========================================================= */
.vision-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.vision-card {
  padding: 20px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast), background var(--t-fast);
}
.vision-card:hover {
  border-color: var(--accent-border);
  background: var(--panel-2);
}

.vision-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid;
  place-items: center;
  margin-bottom: 14px;
}

.vision-card h3 {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 6px;
  color: var(--text-strong);
}
.vision-card p {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
  margin: 0;
}
.vision-card code {
  font-size: 11.5px;
  padding: 1px 5px;
}

/* =========================================================
   ROADMAP
   ========================================================= */
.roadmap-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.roadmap-item {
  display: flex;
  gap: 16px;
  padding: 18px 20px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast);
}
.roadmap-item.done {
  border-color: rgba(63, 185, 80, 0.28);
}
.roadmap-item:hover {
  border-color: var(--accent-border);
}

.roadmap-marker {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(63, 185, 80, 0.12);
  color: var(--success);
  border: 1.5px solid rgba(63, 185, 80, 0.35);
  font-weight: 800;
  font-size: 13px;
}

.roadmap-body {
  flex: 1;
  min-width: 0;
}

.roadmap-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 6px;
}

.roadmap-tag {
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--accent-soft);
  color: var(--accent);
}

.roadmap-header h3 {
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  color: var(--text-strong);
}

.roadmap-status.done {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(63, 185, 80, 0.15);
  color: var(--success);
  border: 1px solid rgba(63, 185, 80, 0.35);
}

.roadmap-body > p {
  font-size: 13px;
  color: var(--muted);
  margin: 0 0 10px;
}

.roadmap-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.roadmap-features li {
  position: relative;
  padding-left: 18px;
  font-size: 12.5px;
  color: var(--text);
  line-height: 1.5;
}
.roadmap-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--success);
  font-weight: 800;
  font-size: 11px;
}

/* =========================================================
   TECH STACK — icon-based
   ========================================================= */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast), transform var(--t-fast), background var(--t-fast);
}
.tech-item:hover {
  border-color: var(--accent-border);
  background: var(--panel-2);
  transform: translateY(-1px);
}

.tech-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: transform var(--t-normal);
}
.tech-item:hover .tech-icon {
  transform: scale(1.08) rotate(-3deg);
}

.tech-icon svg {
  display: block;
}

.tech-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.tech-info strong {
  font-size: 13.5px;
  color: var(--text-strong);
  font-weight: 700;
}
.tech-info span {
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.4;
}

/* =========================================================
   VERSION TIMELINE
   ========================================================= */
.version-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.version-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  position: relative;
}
.version-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 14px;
  top: 44px;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.version-badge {
  flex-shrink: 0;
  width: 62px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--muted);
  position: relative;
  z-index: 1;
  flex-direction: column;
  line-height: 1.1;
  gap: 1px;
}

.version-badge.latest {
  background: var(--accent-soft);
  border-color: var(--accent-border);
  color: var(--accent);
  height: 40px;
}

.latest-tag {
  font-family: var(--font-sans);
  font-size: 8.5px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 800;
  color: var(--success);
}

.version-body {
  flex: 1;
  padding-top: 2px;
}
.version-date {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted-2);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 2px;
}
.version-body p {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
  line-height: 1.55;
}

/* =========================================================
   CONTRIBUTE
   ========================================================= */
.contribute-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.contribute-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: border-color var(--t-fast), transform var(--t-fast), background var(--t-fast);
}
.contribute-card:hover {
  border-color: var(--accent-border);
  background: var(--panel-2);
  transform: translateY(-1px);
  text-decoration: none;
}

.contribute-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid;
  place-items: center;
}

.contribute-card strong {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-strong);
}
.contribute-card span {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.4;
}

.contribute-note {
  padding: 12px 16px;
  background: var(--accent-soft);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--text);
}
.contribute-note strong { color: var(--accent); }

/* =========================================================
   LICENSE
   ========================================================= */
.license-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.license-badge {
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), #a371f7);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.04em;
  box-shadow: var(--shadow);
}

.license-body h3 {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--text-strong);
}
.license-body p {
  font-size: 13.5px;
  color: var(--muted);
  margin: 0;
  line-height: 1.55;
}

/* =========================================================
   NEXT STEPS
   ========================================================= */
.next-steps {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid var(--border-subtle);
}
.next-steps h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 16px;
}

.next-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.next-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  transition: border-color var(--t-fast), transform var(--t-fast), background var(--t-fast);
}
.next-card:hover {
  border-color: var(--accent-border);
  background: var(--panel-2);
  transform: translateY(-1px);
  text-decoration: none;
}
.next-card strong {
  font-size: 14px;
  color: var(--accent);
  font-weight: 600;
}
.next-card span {
  font-size: 12.5px;
  color: var(--muted);
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 900px) {
  .vision-grid,
  .tech-grid,
  .contribute-grid {
    grid-template-columns: 1fr;
  }
  .license-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .version-item {
    gap: 12px;
  }
}
@media (max-width: 600px) {
  .roadmap-item {
    padding: 14px 16px;
    gap: 12px;
  }
  .roadmap-marker {
    width: 26px;
    height: 26px;
    font-size: 12px;
  }
  .next-grid {
    grid-template-columns: 1fr;
  }
  .section h2 {
    font-size: 20px;
  }
}
</style>