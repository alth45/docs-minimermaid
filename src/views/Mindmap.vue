<template>
  <div>
    <h1>
      Mindmap
      <span class="badge badge-new">NEW</span>
    </h1>
    <p>
      Peta pikiran radial untuk memetakan konsep, ide, atau struktur informasi. Root otomatis
      diletakkan di tengah, cabang utama dibelah ke kiri dan kanan — cukup dengan indentasi.
    </p>

    <!-- =========================================================
         QUICK REFERENCE
         ========================================================= -->
    <div class="quick-ref">
      <div class="qr-item">
        <code>[mindmap]</code>
        <span>Header tipe diagram</span>
      </div>
      <div class="qr-item">
        <code>Baris 1</code>
        <span>Root — otomatis di tengah</span>
      </div>
      <div class="qr-item">
        <code>&nbsp;&nbsp;Indentasi</code>
        <span>Hierarki (spasi / tab)</span>
      </div>
      <div class="qr-item">
        <code>Level 1</code>
        <span>Auto-split kiri/kanan</span>
      </div>
      <div class="qr-item">
        <code>Level 2+</code>
        <span>Warisi arah &amp; warna</span>
      </div>
      <div class="qr-item">
        <code># komentar</code>
        <span>Diabaikan</span>
      </div>
    </div>

    <!-- =========================================================
         1. SINTAKS DASAR
         ========================================================= -->
    <h2>1. Sintaks Dasar</h2>
    <p>
      Direktif <code>[mindmap]</code> di baris pertama. Baris berikutnya merepresentasikan
      node — hierarki dibentuk oleh <strong>indentasi</strong> (spasi atau tab). Baris pertama
      setelah header otomatis menjadi <strong>root</strong>.
    </p>

    <CodeBlock language="mermaid" :code="basicSyntax" />
    <LiveDiagram :code="basicSyntax" />

    <p class="tip">
      <strong>Aturan indentasi:</strong> gunakan <em>konsisten</em> — 2 spasi, 4 spasi, atau
      tab. Node dengan indentasi lebih dalam = anak dari node terdekat di atasnya dengan
      indentasi lebih dangkal.
    </p>

    <!-- =========================================================
         2. HIERARKI & KEDALAMAN
         ========================================================= -->
    <h2>2. Hierarki Multi-Level</h2>
    <p>
      Mindmap mendukung kedalaman tak terbatas. Semua sub-node di bawah cabang level-1
      <strong>mewarisi arah</strong> (kiri/kanan) dan <strong>warna</strong> dari cabang
      induknya — menciptakan "zona" visual yang jelas per topik.
    </p>

    <CodeBlock language="mermaid" :code="deepHierarchy" />
    <LiveDiagram :code="deepHierarchy" />

    <!-- =========================================================
         3. AUTO-SPLIT KIRI/KANAN
         ========================================================= -->
    <h2>3. Auto-Split Kiri / Kanan</h2>
    <p>
      Cabang level-1 dibagi otomatis: separuh ke kanan, separuh ke kiri
      (<code>ceil(n/2)</code> ke kanan, sisanya ke kiri). Ini menciptakan layout simetris
      yang memanfaatkan lebar layar secara optimal.
    </p>

    <table>
      <thead>
        <tr>
          <th>Jumlah cabang</th>
          <th>Kanan</th>
          <th>Kiri</th>
          <th>Layout</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>0</td>
          <td>Root di kiri, semua bercabang ke kanan</td>
        </tr>
        <tr>
          <td>2</td>
          <td>1</td>
          <td>1</td>
          <td>Simetris kiri-kanan</td>
        </tr>
        <tr>
          <td>3</td>
          <td>2</td>
          <td>1</td>
          <td>Sedikit lebih berat ke kanan</td>
        </tr>
        <tr>
          <td>4</td>
          <td>2</td>
          <td>2</td>
          <td>Simetris kiri-kanan</td>
        </tr>
        <tr>
          <td>5</td>
          <td>3</td>
          <td>2</td>
          <td>Sedikit lebih berat ke kanan</td>
        </tr>
      </tbody>
    </table>

    <p>
      <strong>Tips:</strong> untuk mindmap dengan jumlah cabang ganjil, urutan deklarasi
      menentukan mana yang ke kanan lebih dulu. Jika Anda ingin cabang penting di kiri,
      deklarasikan lebih lambat.
    </p>

    <!-- =========================================================
         4. CONTOH: BRAINSTORM PRODUK
         ========================================================= -->
    <h2>4. Contoh: Brainstorm Produk</h2>
    <p>
      Skenario klasik untuk mindmap — memetakan fitur, target pengguna, dan strategi
      go-to-market dalam satu diagram.
    </p>

    <CodeBlock language="mermaid" :code="productBrainstorm" />
    <LiveDiagram :code="productBrainstorm" />

    <!-- =========================================================
         5. CONTOH: ROADMAP TIM
         ========================================================= -->
    <h2>5. Contoh: Roadmap Tim</h2>
    <p>
      Gunakan mindmap sebagai <em>outline</em> roadmap — bukan timeline kronologis
      (untuk itu gunakan <router-link to="/timeline">Timeline</router-link>), tapi peta
      area kerja dan item-itemnya.
    </p>

    <CodeBlock language="mermaid" :code="teamRoadmap" />
    <LiveDiagram :code="teamRoadmap" />

    <!-- =========================================================
         6. CONTOH: DOKUMENTASI TEKNIS
         ========================================================= -->
    <h2>6. Contoh: Struktur Dokumentasi</h2>
    <p>
      Mindmap sangat cocok untuk merancang struktur dokumentasi, wiki, atau knowledge base —
      sebelum benar-benar menulis konten.
    </p>

    <CodeBlock language="mermaid" :code="docsStructure" />
    <LiveDiagram :code="docsStructure" />

    <!-- =========================================================
         7. VISUAL & WARNA
         ========================================================= -->
    <h2>7. Visual &amp; Warna</h2>
    <p>
      Setiap cabang level-1 mendapat warna <strong>berbeda</strong> dari palette tema aktif
      — sehingga topik utama mudah dibedakan. Level 2+ mewarisi warna parent-nya.
    </p>

    <div class="visual-grid">
      <div class="visual-card">
        <div class="visual-chip root-chip"></div>
        <div class="visual-label">
          <strong>Root</strong>
          <span>Font besar, fill solid, warna palette[0]</span>
        </div>
      </div>
      <div class="visual-card">
        <div class="visual-chip level1-chip"></div>
        <div class="visual-label">
          <strong>Level 1</strong>
          <span>Font sedang, fill 28% opacity, warna palette[i]</span>
        </div>
      </div>
      <div class="visual-card">
        <div class="visual-chip level2-chip"></div>
        <div class="visual-label">
          <strong>Level 2+</strong>
          <span>Font kecil, fill 28% opacity, warna parent</span>
        </div>
      </div>
    </div>

    <p>
      <strong>Edge:</strong> kurva berwarna sesuai cabang, opacity 65%, tanpa marker panah.
      Gaya kurva mengikuti pilihan global — <code>smooth</code> (S-curve),
      <code>step</code> (siku), atau <code>straight</code> (lurus diagonal).
    </p>

    <!-- =========================================================
         8. TIPS & BATASAN
         ========================================================= -->
    <h2>8. Tips &amp; Batasan</h2>
    <ul>
      <li>
        <strong>Indentasi konsisten:</strong> jika Anda mulai dengan 2 spasi, lanjutkan dengan
        2 spasi. Mixing 2 dan 4 spasi akan menghasilkan hierarki yang tidak terduga.
      </li>
      <li>
        <strong>Kedalaman rekomendasi:</strong> maksimal 4 level untuk keterbacaan optimal.
        Lebih dari itu, pertimbangkan memecah jadi 2 mindmap.
      </li>
      <li>
        <strong>Root tunggal:</strong> hanya boleh ada satu root (indentasi paling dangkal).
        Dua root akan memunculkan error.
      </li>
      <li>
        <strong>Komentar:</strong> baris dengan <code>#</code> atau <code>//</code> di awal
        diabaikan.
      </li>
      <li>
        <strong>Belum didukung:</strong> ikon node, link per-node, tooltip, dan warna custom
        per-node. Untuk itu, gunakan flowchart.
      </li>
    </ul>

    <!-- =========================================================
         9. MINIMAP & ZOOM
         ========================================================= -->
    <h2>9. Navigasi Diagram Besar</h2>
    <p>
      Mindmap besar bisa sangat lebar. Di Playground (aplikasi utama), Anda bisa:
    </p>
    <ul>
      <li><strong>Zoom in/out:</strong> <code>Ctrl +=</code> / <code>Ctrl +-</code> atau tombol zoom di kanan-atas preview</li>
      <li><strong>Pan:</strong> drag kanvas dengan mouse</li>
      <li><strong>Minimap:</strong> otomatis muncul saat viewport tidak fit penuh — klik area minimap untuk jump</li>
    </ul>

    <!-- =========================================================
         NEXT STEPS
         ========================================================= -->
    <div class="next-steps">
      <h3>Selanjutnya</h3>
      <div class="next-grid">
        <router-link to="/timeline" class="next-card">
          <strong>Timeline →</strong>
          <span>Kronologi berurutan</span>
        </router-link>
        <router-link to="/er" class="next-card">
          <strong>ER Diagram →</strong>
          <span>Model database relasional</span>
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
import CodeBlock from '../components/CodeBlock.vue';
import LiveDiagram from '../components/LiveDiagram.vue';

/* =========================================================
   SNIPPETS
   ========================================================= */

const basicSyntax = `[mindmap]
Pengembangan Produk
  Riset
    Riset Pasar
    Analisis Kompetitor
    Wawancara Pengguna
  Desain
    Wireframe
    Mockup
    User Testing
  Development
    Backend
    Frontend
  Launch`;

const deepHierarchy = `[mindmap]
Startup
  Produk
    Fitur Inti
      Autentikasi
      Dashboard
    Fitur Tambahan
      Notifikasi
      Export PDF
  Pemasaran
    Content Marketing
      Blog
      YouTube
    Paid Ads
      Google Ads
      Meta Ads
  Operasional
    Tim Engineering
    Tim Marketing
    Tim Support`;

const productBrainstorm = `[mindmap]
Aplikasi Mobile
  Target Pengguna
    Gen Z
    Milenial
    Profesional
  Fitur Utama
    Chat
    Feed
    Story
    Video Call
  Monetisasi
    Subscription
    Iklan
    In-App Purchase
  Strategi Launch
    Beta Tertutup
    Soft Launch
    Public Launch`;

const teamRoadmap = `[mindmap]
Roadmap Q1 2025
  Engineering
    Migrasi ke TypeScript
    Refactor Auth
    Peningkatan Performa
  Product
    Riset Pengguna
    Design Sprint
    Spec Fitur Baru
  Marketing
    Rebranding
    Content Calendar
    SEO Audit
  Operasional
    Rekrutmen 2 Engineer
    Review Budget`;

const docsStructure = `[mindmap]
MiniMermaid Docs
  Getting Started
    Instalasi
    Quick Start
    Playground
  Diagram Types
    Flowchart
    Swimlane
    Sequence
    ER Diagram
    Mindmap
    Timeline
  Advanced
    Theme
    Export/Import
    Keyboard Shortcuts
  Reference
    API
    Shapes
    Edge Styles`;
</script>

<style scoped>
/* =========================================================
   BADGE NEW
   ========================================================= */
.badge-new {
  display: inline-flex;
  align-items: center;
  background: rgba(63, 185, 80, 0.12);
  color: var(--success);
  border: 1px solid rgba(63, 185, 80, 0.35);
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.06em;
  vertical-align: middle;
  margin-left: 8px;
  position: relative;
  top: -4px;
}

/* =========================================================
   QUICK REFERENCE
   ========================================================= */
.quick-ref {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
  padding: 14px;
  margin: 20px 0 32px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.qr-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
}
.qr-item code {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--accent);
  background: transparent;
  border: 0;
  padding: 0;
  white-space: nowrap;
  font-family: var(--font-mono);
}
.qr-item span {
  font-size: 11.5px;
  color: var(--muted);
}

/* =========================================================
   TIP
   ========================================================= */
.tip {
  padding: 12px 16px;
  background: var(--accent-soft);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  color: var(--text);
  margin: 16px 0 20px;
}
.tip strong { color: var(--accent); }
.tip code {
  background: var(--panel);
  border: 1px solid var(--border);
}

/* =========================================================
   TABLE
   ========================================================= */
table {
  margin: 16px 0 20px;
}

/* =========================================================
   VISUAL GRID
   ========================================================= */
.visual-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  margin: 16px 0 20px;
}

.visual-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast);
}
.visual-card:hover {
  border-color: var(--accent-border);
}

.visual-chip {
  width: 40px;
  height: 26px;
  border-radius: 13px;
  flex-shrink: 0;
}

/* Representasi visual node — pakai warna palette konsisten */
.root-chip {
  background: rgba(88, 166, 255, 0.55);
  border: 2.5px solid #58a6ff;
}

.level1-chip {
  background: rgba(163, 113, 247, 0.28);
  border: 2px solid #a371f7;
  width: 36px;
  height: 22px;
  border-radius: 11px;
}

.level2-chip {
  background: rgba(63, 185, 80, 0.28);
  border: 2px solid #3fb950;
  width: 32px;
  height: 20px;
  border-radius: 10px;
}

.visual-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.visual-label strong {
  font-size: 13px;
  color: var(--text-strong);
  font-weight: 700;
}
.visual-label span {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.4;
}

/* =========================================================
   NEXT STEPS
   ========================================================= */
.next-steps {
  margin-top: 56px;
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
  .quick-ref {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
@media (max-width: 600px) {
  .quick-ref {
    grid-template-columns: 1fr 1fr;
  }
  .next-grid {
    grid-template-columns: 1fr;
  }
  .visual-grid {
    grid-template-columns: 1fr;
  }
}
</style>