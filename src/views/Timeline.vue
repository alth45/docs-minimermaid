<template>
  <div>
    <h1>
      Timeline
      <span class="badge badge-new">NEW</span>
    </h1>
    <p>
      Diagram kronologi untuk menampilkan kejadian berurutan dalam garis waktu horizontal.
      Kartu event bergantian otomatis di atas dan bawah garis — sempurna untuk sejarah produk,
      roadmap, atau milestone proyek.
    </p>

    <!-- =========================================================
         QUICK REFERENCE
         ========================================================= -->
    <div class="quick-ref">
      <div class="qr-item">
        <code>[timeline]</code>
        <span>Header tipe diagram</span>
      </div>
      <div class="qr-item">
        <code>title : ...</code>
        <span>Judul opsional</span>
      </div>
      <div class="qr-item">
        <code>2024 : Event</code>
        <span>Event dasar</span>
      </div>
      <div class="qr-item">
        <code>2024 : Event : Detail</code>
        <span>Event + sublabel</span>
      </div>
      <div class="qr-item">
        <code>Alternating</code>
        <span>Kartu atas/bawah otomatis</span>
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
      Direktif <code>[timeline]</code> di baris pertama, lalu satu event per baris dengan
      format <code>tanggal : label</code>. Pemisah adalah titik dua (<code>:</code>) — spasi
      di sekitar titik dua opsional.
    </p>

    <CodeBlock language="mermaid" :code="basicSyntax" />
    <LiveDiagram :code="basicSyntax" />

    <p class="tip">
      <strong>Alternating otomatis:</strong> event index 0, 2, 4, … ditempatkan di atas garis
      waktu; index 1, 3, 5, … di bawah. Anda tidak perlu mengatur posisi secara manual.
    </p>

    <!-- =========================================================
         2. JUDUL OPSIONAL
         ========================================================= -->
    <h2>2. Judul Opsional</h2>
    <p>
      Tambahkan <code>title : Judul</code> (atau <code>judul : Judul</code>) sebagai baris
      pertama setelah <code>[timeline]</code> untuk menampilkan judul di atas timeline.
      Jika dihilangkan, layout otomatis lebih rapat.
    </p>

    <CodeBlock language="mermaid" :code="withTitle" />
    <LiveDiagram :code="withTitle" />

    <CodeBlock language="mermaid" :code="withoutTitle" />
    <LiveDiagram :code="withoutTitle" />

    <!-- =========================================================
         3. SUBLABEL
         ========================================================= -->
    <h2>3. Sublabel (Detail)</h2>
    <p>
      Tambahkan titik dua kedua untuk memberi detail di bawah label utama:
      <code>tanggal : label : sublabel</code>. Sublabel dirender dengan warna muted di baris
      ketiga kartu — cocok untuk angka, metrik, atau konteks singkat.
    </p>

    <CodeBlock language="mermaid" :code="withSublabel" />
    <LiveDiagram :code="withSublabel" />

    <p>
      Sublabel <strong>opsional per-event</strong> — Anda bisa mixing event dengan dan tanpa
      sublabel. Layout menyesuaikan tinggi kartu secara otomatis.
    </p>

    <!-- =========================================================
         4. CONTOH: SEJARAH PRODUK
         ========================================================= -->
    <h2>4. Contoh: Sejarah Produk</h2>
    <p>
      Timeline klasik untuk menunjukkan tonggak pencapaian produk — dari peluncuran beta
      sampai milestone terbesar. Sublabel ideal untuk angka (pengguna, funding, revenue).
    </p>

    <CodeBlock language="mermaid" :code="productHistory" />
    <LiveDiagram :code="productHistory" />

    <!-- =========================================================
         5. CONTOH: ROADMAP PROYEK
         ========================================================= -->
    <h2>5. Contoh: Roadmap Proyek</h2>
    <p>
      Untuk roadmap jangka pendek — per kuartal, sprint, atau fase. Gunakan sublabel untuk
      menyebutkan deliverable spesifik atau tim yang bertanggung jawab.
    </p>

    <CodeBlock language="mermaid" :code="projectRoadmap" />
    <LiveDiagram :code="projectRoadmap" />

    <p class="tip">
      <strong>Bedakan dengan <router-link to="/mindmap">Mindmap</router-link>:</strong>
      Timeline menekankan <em>urutan waktu</em> (kronologis), Mindmap menekankan
      <em>hubungan hierarkis</em>. Untuk roadmap berdasarkan area kerja (bukan waktu),
      gunakan Mindmap.
    </p>

    <!-- =========================================================
         6. CONTOH: MILESTONE PERSONAL
         ========================================================= -->
    <h2>6. Contoh: Milestone Personal</h2>
    <p>
      Timeline juga bekerja baik untuk kejadian personal atau kronologi historis — apapun
      yang memiliki urutan waktu jelas.
    </p>

    <CodeBlock language="mermaid" :code="personalMilestones" />
    <LiveDiagram :code="personalMilestones" />

    <!-- =========================================================
         7. VISUAL & LAYOUT
         ========================================================= -->
    <h2>7. Visual &amp; Layout</h2>
    <p>
      Setiap event mendapat warna palette berbeda secara bergilir. Kartu terdiri dari tiga
      lapis teks (tanggal, label, sublabel opsional) yang ditata vertikal.
    </p>

    <div class="visual-grid">
      <div class="visual-card">
        <div class="visual-mock">
          <div class="vm-card vm-card-top">
            <div class="vm-date">2024</div>
            <div class="vm-label">Milestone</div>
          </div>
          <div class="vm-stem vm-stem-top"></div>
          <div class="vm-circle"></div>
        </div>
        <div class="visual-label">
          <strong>Kartu Atas</strong>
          <span>Tanggal (warna) · Label (bold) · Sublabel (muted)</span>
        </div>
      </div>
      <div class="visual-card">
        <div class="visual-mock">
          <div class="vm-circle"></div>
          <div class="vm-stem vm-stem-bottom"></div>
          <div class="vm-card vm-card-bottom">
            <div class="vm-date">2025</div>
            <div class="vm-label">Milestone</div>
          </div>
        </div>
        <div class="visual-label">
          <strong>Kartu Bawah</strong>
          <span>Bergantian otomatis dengan kartu atas</span>
        </div>
      </div>
      <div class="visual-card">
        <div class="visual-mock">
          <div class="vm-line"></div>
          <div class="vm-circle"></div>
        </div>
        <div class="visual-label">
          <strong>Garis &amp; Milestone</strong>
          <span>Garis horizontal abu · Circle berwarna per event</span>
        </div>
      </div>
    </div>

    <!-- =========================================================
         8. TIPS & BATASAN
         ========================================================= -->
    <h2>8. Tips &amp; Batasan</h2>
    <ul>
      <li>
        <strong>Urutan kronologis:</strong> MiniMermaid tidak mengurutkan event secara
        otomatis — event ditampilkan sesuai urutan deklarasi. Pastikan deklarasi sudah
        kronologis untuk hasil terbaik.
      </li>
      <li>
        <strong>Konsisten format tanggal:</strong> gunakan format seragam —
        <code>2024</code>, <code>Jan 2024</code>, <code>Q1 2024</code>, atau
        <code>2024-01-15</code>. Mixing format merusak konsistensi visual.
      </li>
      <li>
        <strong>Jumlah event:</strong> 4–10 event ideal untuk readability. Lebih dari 12,
        pertimbangkan memecah jadi dua timeline atau menggunakan <code>horizontal</code>
        scroll di Playground.
      </li>
      <li>
        <strong>Label pendek:</strong> label utama sebaiknya &lt;30 karakter. Sublabel
        ideal untuk detail yang lebih panjang (metrik, konteks).
      </li>
      <li>
        <strong>Tidak mendukung:</strong> event grouping, kustomisasi warna per event,
        ikon node, dan link per-event. Untuk diagram interaktif, gunakan
        <router-link to="/syntax">Flowchart</router-link>.
      </li>
      <li>
        <strong>Edge style diabaikan:</strong> timeline selalu menggunakan garis lurus
        horizontal (bukan kurva atau step). Pengaturan <code>edgeStyle</code> tidak
        berpengaruh.
      </li>
    </ul>

    <!-- =========================================================
         9. KAPAN MENGGUNAKAN TIMELINE?
         ========================================================= -->
    <h2>9. Kapan Menggunakan Timeline?</h2>

    <table>
      <thead>
        <tr>
          <th>Skenario</th>
          <th>Timeline</th>
          <th>Alternatif</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sejarah produk / perusahaan</td>
          <td>✅ Ideal</td>
          <td>—</td>
        </tr>
        <tr>
          <td>Roadmap berdasarkan waktu</td>
          <td>✅ Ideal</td>
          <td>—</td>
        </tr>
        <tr>
          <td>Kronologi kejadian historis</td>
          <td>✅ Ideal</td>
          <td>—</td>
        </tr>
        <tr>
          <td>Roadmap berdasarkan area kerja</td>
          <td>❌ Kurang cocok</td>
          <td>Mindmap</td>
        </tr>
        <tr>
          <td>Alur keputusan bercabang</td>
          <td>❌ Tidak cocok</td>
          <td>Flowchart</td>
        </tr>
        <tr>
          <td>Interaksi antar aktor</td>
          <td>❌ Tidak cocok</td>
          <td>Sequence</td>
        </tr>
        <tr>
          <td>Relasi database</td>
          <td>❌ Tidak cocok</td>
          <td>ER Diagram</td>
        </tr>
      </tbody>
    </table>

    <!-- =========================================================
         NEXT STEPS
         ========================================================= -->
    <div class="next-steps">
      <h3>Selanjutnya</h3>
      <div class="next-grid">
        <router-link to="/theme" class="next-card">
          <strong>Tema &amp; Warna →</strong>
          <span>Dark/Light + palet</span>
        </router-link>
        <router-link to="/mindmap" class="next-card">
          <strong>Mindmap →</strong>
          <span>Pemetaan konsep radial</span>
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

const basicSyntax = `[timeline]
2020 : Peluncuran Beta
2021 : Rilis Versi 1.0
2022 : Ekspansi ke Asia
2023 : Series A Funding
2024 : Rilis Versi 2.0`;

const withTitle = `[timeline]
title : Sejarah MiniMermaid
2020 : Peluncuran Beta : 500 pengguna awal
2021 : Rilis 1.0 : 10K pengguna
2022 : Ekspansi Asia : Kantor di Singapura
2023 : Series A : $5M
2024 : Rilis 2.0`;

const withoutTitle = `[timeline]
Q1 : Riset Pasar : 200 wawancara
Q2 : Design Sprint : 3 iterasi
Q3 : Beta Tertutup : 100 tester
Q4 : Public Launch`;

const withSublabel = `[timeline]
2019 : Ide Awal : Dari side project
2020 : MVP Launch : 500 user
2021 : Product-Market Fit : Retention 60%
2022 : Fundraising : Seed round
2023 : Scale Up : 100K user`;

const productHistory = `[timeline]
title : Perjalanan Startup Kami
2018 : Didirikan : 2 co-founder
2019 : MVP Pertama : 100 user
2020 : Product-Market Fit : 5K user
2021 : Seed Round : $1.5M
2022 : Series A : $8M
2023 : 1M User : Profit bulanan
2024 : Ekspansi Global : 15 negara`;

const projectRoadmap = `[timeline]
title : Roadmap 2025
Q1 2025 : Migrasi TypeScript : 100% codebase
Q2 2025 : Fitur Kolaborasi : Realtime editing
Q3 2025 : Mobile App : iOS & Android
Q4 2025 : Enterprise Plan : SSO & audit log`;

const personalMilestones = `[timeline]
title : Perjalanan Karier
2015 : Lulus Kuliah : S1 Teknik Informatika
2016 : Job Pertama : Junior Developer
2018 : Promosi : Senior Developer
2020 : Tech Lead : Tim 5 orang
2022 : Engineering Manager : Tim 15 orang
2024 : Head of Engineering`;
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
table td {
  font-size: 13.5px;
}

/* =========================================================
   VISUAL MOCK
   ========================================================= */
.visual-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  margin: 16px 0 20px;
}

.visual-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast);
}
.visual-card:hover {
  border-color: var(--accent-border);
}

.visual-mock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  height: 100px;
  justify-content: center;
}

/* Kartu mockup */
.vm-card {
  padding: 6px 12px;
  border-radius: 6px;
  background: rgba(88, 166, 255, 0.14);
  border: 1.5px solid #58a6ff;
  min-width: 100px;
  text-align: center;
}
.vm-date {
  font-size: 10px;
  font-weight: 800;
  color: #58a6ff;
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
}
.vm-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
  margin-top: 1px;
}

/* Stem (garis vertikal) */
.vm-stem {
  width: 1.5px;
  height: 14px;
  background: rgba(88, 166, 255, 0.6);
}

/* Circle (milestone) */
.vm-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #58a6ff;
  border: 2px solid var(--panel);
  flex-shrink: 0;
}

/* Line horizontal */
.vm-line {
  width: 100%;
  height: 2px;
  background: var(--border);
  margin: 0 0 2px;
  position: relative;
  top: 18px;
}

/* Variasi kartu — warna berbeda */
.visual-card:nth-child(2) .vm-card {
  background: rgba(163, 113, 247, 0.14);
  border-color: #a371f7;
}
.visual-card:nth-child(2) .vm-date { color: #a371f7; }
.visual-card:nth-child(2) .vm-stem { background: rgba(163, 113, 247, 0.6); }
.visual-card:nth-child(2) .vm-circle { background: #a371f7; }

.visual-card:nth-child(3) .vm-circle { background: #3fb950; }

/* Label */
.visual-label {
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: center;
}
.visual-label strong {
  font-size: 13px;
  color: var(--text-strong);
  font-weight: 700;
}
.visual-label span {
  font-size: 11.5px;
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