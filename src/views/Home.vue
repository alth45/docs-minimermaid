<template>
  <div class="home">
    <!-- ==================== HERO ==================== -->
    <section class="hero">
      <div class="hero-bg"></div>

      <div class="hero-content">
        <div class="hero-badges">
          <span class="badge">v1.3.0</span>
          <span class="badge badge-success">9 Tipe Diagram</span>
          <span class="badge badge-purple">Dark / Light</span>
        </div>

        <h1>
          Ubah teks jadi
          <span class="gradient-text">diagram yang indah</span>
        </h1>

        <p class="lead">
          Library TypeScript ringan untuk membuat diagram SVG interaktif dari teks sederhana.
          Tanpa dependensi framework, siap untuk browser, Node.js, dan SSR.
        </p>

        <div class="hero-actions">
          <router-link to="/playground" class="btn btn-primary">
            Coba Playground
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </router-link>
          <router-link to="/syntax" class="btn btn-secondary">
            Panduan Sintaks
          </router-link>
        </div>

        <div class="hero-code">
          <CodeBlock language="mermaid" :code="heroCode" />
        </div>
      </div>
    </section>

    <!-- ==================== DIAGRAM TYPES ==================== -->
    <section class="section">
      <header class="section-header">
        <h2>9 Tipe Diagram</h2>
        <p>Dari flowchart sampai timeline — semua dari satu sintaks teks yang konsisten.</p>
      </header>

      <div class="diagram-grid">
        <router-link
          v-for="d in diagramTypes"
          :key="d.path"
          :to="d.path"
          class="diagram-card"
        >
          <div class="diagram-icon" :style="{ background: d.gradient }">
            <span>{{ d.icon }}</span>
          </div>
          <div class="diagram-body">
            <h3>
              {{ d.name }}
              <span v-if="d.isNew" class="tag-new">NEW</span>
            </h3>
            <p>{{ d.desc }}</p>
          </div>
          <span class="diagram-arrow">→</span>
        </router-link>
      </div>
    </section>

    <!-- ==================== FITUR UTAMA ==================== -->
    <section class="section">
      <header class="section-header">
        <h2>Fitur Unggulan</h2>
        <p>Semua yang Anda butuhkan untuk membuat dan mengelola diagram dari teks.</p>
      </header>

      <div class="feature-grid">
        <div
          v-for="f in features"
          :key="f.title"
          class="feature-card"
        >
          <div class="feature-icon">
            <component :is="'svg'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="f.icon"></component>
          </div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ==================== QUICK START ==================== -->
    <section class="section">
      <header class="section-header">
        <h2>Mulai dalam 30 detik</h2>
        <p>Install via NPM atau gunakan langsung lewat tag <code>&lt;script&gt;</code>.</p>
      </header>

      <div class="quick-start">
        <div class="quick-step">
          <span class="step-num">1</span>
          <h3>Install</h3>
          <CodeBlock language="bash" :code="installCode" />
        </div>

        <div class="quick-step">
          <span class="step-num">2</span>
          <h3>Import</h3>
          <CodeBlock language="typescript" :code="importCode" />
        </div>

        <div class="quick-step">
          <span class="step-num">3</span>
          <h3>Render</h3>
          <CodeBlock language="javascript" :code="renderCode" />
        </div>
      </div>
    </section>

    <!-- ==================== CTA ==================== -->
    <section class="cta">
      <div class="cta-inner">
        <h2>Siap membuat diagram pertama Anda?</h2>
        <p>Buka playground interaktif dan mulai menulis.</p>
        <div class="hero-actions">
          <router-link to="/playground" class="btn btn-primary">
            Buka Playground
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </router-link>
          <router-link to="/api" class="btn btn-secondary">
            Referensi API
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from '../components/CodeBlock.vue';

/* =========================================================
   HERO CODE SNIPPET
   ========================================================= */
const heroCode = `[horizontal]
->[round]->icon["rocket"]->text["Mulai"]->node
->[diamond]->text["Siap?"]
  ->ya["Ya"]
    ->[square:green]->text["Deploy!"]
  ->tidak["Tidak"]
    ->[square]->text["Belajar Dulu"]`;

/* =========================================================
   DIAGRAM TYPES
   ========================================================= */
const diagramTypes = [
  {
    name: 'Flowchart',
    path: '/syntax',
    desc: 'Alur keputusan dengan percabangan bertingkat dan label panah.',
    icon: '⛓',
    gradient: 'linear-gradient(135deg, #58a6ff, #79c0ff)',
    isNew: false,
  },
  {
    name: 'Swimlane',
    path: '/swimlane',
    desc: 'Proses bisnis lintas aktor dengan lane per departemen.',
    icon: '🏊',
    gradient: 'linear-gradient(135deg, #3fb950, #56d364)',
    isNew: false,
  },
  {
    name: 'Sequence',
    path: '/sequence',
    desc: 'Interaksi antar aktor menurut urutan waktu, lengkap dengan loop.',
    icon: '↔',
    gradient: 'linear-gradient(135deg, #a371f7, #bc8cff)',
    isNew: false,
  },
  {
    name: 'Class (UML)',
    path: '/examples/uml',
    desc: 'Struktur kelas dengan atribut, metode, dan relasi inheritance.',
    icon: '◆',
    gradient: 'linear-gradient(135deg, #d29922, #e3b341)',
    isNew: false,
  },
  {
    name: 'State',
    path: '/examples/uml',
    desc: 'Siklus hidup entitas dengan transisi antar status.',
    icon: '◎',
    gradient: 'linear-gradient(135deg, #f778ba, #ff9bce)',
    isNew: false,
  },
  {
    name: 'Network',
    path: '/examples/software',
    desc: 'Graf jejaring dengan layout konsentris otomatis.',
    icon: '🕸',
    gradient: 'linear-gradient(135deg, #39c5cf, #56d4dd)',
    isNew: false,
  },
  {
    name: 'ER Diagram',
    path: '/er',
    desc: 'Entity-relationship dengan notasi crow\'s foot dan badge PK/FK.',
    icon: '🗄',
    gradient: 'linear-gradient(135deg, #ff7b72, #ff9b94)',
    isNew: true,
  },
  {
    name: 'Mindmap',
    path: '/mindmap',
    desc: 'Pemetaan konsep radial dengan warna berbeda per cabang.',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #bc8cff, #d2a8ff)',
    isNew: true,
  },
  {
    name: 'Timeline',
    path: '/timeline',
    desc: 'Kronologi kejadian dengan kartu alternating di garis waktu.',
    icon: '📅',
    gradient: 'linear-gradient(135deg, #39c5cf, #56d4dd)',
    isNew: true,
  },
];

/* =========================================================
   FEATURES
   ========================================================= */
const features = [
  {
    title: 'Zero DOM Core',
    desc: 'Logika parse & layout murni berjalan tanpa DOM — siap untuk Node.js dan SSR.',
    icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
  },
  {
    title: 'Rich Text & Ikon',
    desc: 'Dukung **bold**, *italic*, `code`, serta 1500+ ikon Lucide di dalam node.',
    icon: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  },
  {
    title: 'Edge Label',
    desc: 'Sintaks <code>-- label --&gt;</code> untuk label panah di flowchart & sub-cabang.',
    icon: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  },
  {
    title: 'Tema Dark / Light',
    desc: 'Warna SVG di-bake ke markup — ekspor PNG & SVG selalu konsisten.',
    icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/>',
  },
  {
    title: 'Ekspor / Impor',
    desc: 'Simpan diagram sebagai <code>.mmd.json</code> — roundtrip lossless untuk source, tema, dan gaya edge.',
    icon: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  },
  {
    title: 'Editor Visual',
    desc: 'Klik node untuk edit bentuk, warna, ikon, label, link, dan tooltip secara langsung.',
    icon: '<path d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  },
  {
    title: 'Minimap Navigasi',
    desc: 'Peta mini di sudut preview dengan viewport rectangle draggable.',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="8" height="6"/>',
  },
  {
    title: 'Keyboard Shortcuts',
    desc: '13 pintasan lengkap: Ctrl+S (share), Ctrl+E (ekspor), Ctrl+/ (cheat sheet).',
    icon: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/>',
  },
];

/* =========================================================
   QUICK START SNIPPETS
   ========================================================= */
const installCode = `npm install minimermaid`;

const importCode = `import MiniMermaid from 'minimermaid';`;

const renderCode = `const kode = \`
  [horizontal]
  ->[round:green]->text["Status: **Aktif**"]->node
  ->[diamond:orange]->text["Cek Sistem?"]
\`;

MiniMermaid.renderTo('#diagram', kode, {
  edgeStyle: 'smooth',
  themeName: 'dark',
});`;
</script>

<style scoped>
/* =========================================================
   WRAPPER
   ========================================================= */
.home {
  max-width: var(--content-max);
  margin: 0 auto;
}

/* =========================================================
   HERO
   ========================================================= */
.hero {
  position: relative;
  padding: 8px 0 56px;
  margin-bottom: 24px;
}

.hero-bg {
  position: absolute;
  inset: -40px -60px auto -60px;
  height: 360px;
  background:
    radial-gradient(ellipse 60% 60% at 30% 20%, rgba(88, 166, 255, 0.14), transparent 70%),
    radial-gradient(ellipse 50% 50% at 70% 0%, rgba(163, 113, 247, 0.12), transparent 70%);
  pointer-events: none;
  z-index: -1;
  filter: blur(20px);
}

.hero-content {
  position: relative;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
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

h1 {
  font-size: 52px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.035em;
  margin: 0 0 20px;
  max-width: 780px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent), #a371f7 60%, #f778ba);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.lead {
  font-size: 17px;
  line-height: 1.6;
  color: var(--muted);
  max-width: 640px;
  margin: 0 0 32px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
}
.btn:hover { text-decoration: none; transform: translateY(-1px); }
.btn-primary {
  background: var(--accent);
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(88, 166, 255, 0.3);
}
.btn-primary:hover {
  background: var(--accent-hover);
  box-shadow: 0 6px 24px rgba(88, 166, 255, 0.4);
}
.btn-secondary {
  background: var(--panel);
  color: var(--text);
  border-color: var(--border);
}
.btn-secondary:hover {
  border-color: var(--accent-border);
  color: var(--accent);
  background: var(--panel-2);
}

.hero-code {
  margin-top: 8px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* =========================================================
   SECTION
   ========================================================= */
.section {
  padding: 56px 0;
  border-top: 1px solid var(--border-subtle);
}

.section-header {
  margin-bottom: 32px;
}
.section-header h2 {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  padding: 0;
  border: 0;
}
.section-header p {
  color: var(--muted);
  font-size: 15px;
  margin: 0;
  max-width: 60ch;
}

/* =========================================================
   DIAGRAM GRID
   ========================================================= */
.diagram-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.diagram-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: border-color var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast), background var(--t-fast);
}
.diagram-card:hover {
  border-color: var(--accent-border);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
  background: var(--panel-2);
  text-decoration: none;
}

.diagram-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
  color: #ffffff;
  box-shadow: var(--shadow-sm);
}

.diagram-body {
  flex: 1;
  min-width: 0;
}
.diagram-body h3 {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14.5px;
  font-weight: 700;
  margin: 0 0 3px;
  color: var(--text-strong);
}
.diagram-body p {
  font-size: 12.5px;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.diagram-arrow {
  color: var(--muted-2);
  font-size: 18px;
  transition: transform var(--t-fast), color var(--t-fast);
  flex-shrink: 0;
}
.diagram-card:hover .diagram-arrow {
  color: var(--accent);
  transform: translateX(3px);
}

.tag-new {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 2px 5px;
  border-radius: 4px;
  background: rgba(63, 185, 80, 0.15);
  color: var(--success);
  border: 1px solid rgba(63, 185, 80, 0.35);
}

/* =========================================================
   FEATURE GRID
   ========================================================= */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}

.feature-card {
  padding: 20px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast), background var(--t-fast);
}
.feature-card:hover {
  border-color: var(--accent-border);
  background: var(--panel-2);
}

.feature-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid;
  place-items: center;
  margin-bottom: 14px;
}
.feature-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.feature-card h3 {
  font-size: 14.5px;
  font-weight: 700;
  margin: 0 0 6px;
  color: var(--text-strong);
}
.feature-card p {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
  line-height: 1.55;
}

/* =========================================================
   QUICK START
   ========================================================= */
.quick-start {
  display: grid;
  gap: 24px;
}

.quick-step {
  position: relative;
  padding-left: 48px;
}
.quick-step h3 {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 10px;
  color: var(--text-strong);
}

.step-num {
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid var(--accent-border);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 13px;
}

/* =========================================================
   CTA
   ========================================================= */
.cta {
  padding: 56px 0 24px;
}

.cta-inner {
  padding: 48px 40px;
  text-align: center;
  background:
    radial-gradient(ellipse 80% 100% at 50% 0%, rgba(88, 166, 255, 0.14), transparent 60%),
    var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}
.cta-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, var(--grid-dot) 1px, transparent 0);
  background-size: 20px 20px;
  opacity: 0.4;
  pointer-events: none;
}

.cta-inner h2 {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  padding: 0;
  border: 0;
  position: relative;
}
.cta-inner p {
  font-size: 15px;
  color: var(--muted);
  margin: 0 0 24px;
  position: relative;
}
.cta-inner .hero-actions {
  justify-content: center;
  margin: 0;
  position: relative;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 900px) {
  h1 { font-size: 38px; }
  .lead { font-size: 15.5px; }
  .section-header h2 { font-size: 22px; }

  .diagram-grid,
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .cta-inner {
    padding: 32px 20px;
  }
  .cta-inner h2 { font-size: 21px; }

  .quick-step { padding-left: 42px; }
}
</style>