<template>
  <div>
    <h1>Flowchart</h1>
    <p>
      Panduan sintaks untuk membuat flowchart dengan MiniMermaid. Setiap node ditulis satu per
      baris menggunakan format yang konsisten, dengan indentasi ketat untuk percabangan.
    </p>

    <!-- =========================================================
         0. QUICK REFERENCE
         ========================================================= -->
    <div class="quick-ref">
      <div class="qr-item">
        <code>-&gt;[bentuk]</code>
        <span>Deklarasi node</span>
      </div>
      <div class="qr-item">
        <code>-&gt;text["..."]</code>
        <span>Label node</span>
      </div>
      <div class="qr-item">
        <code>-&gt;node</code>
        <span>Sambung ke node berikutnya</span>
      </div>
      <div class="qr-item">
        <code>-- label --&gt;</code>
        <span>Sambung dengan label panah</span>
      </div>
      <div class="qr-item">
        <code>[cabang]</code>
        <span>Percabangan ya/tidak</span>
      </div>
      <div class="qr-item">
        <code>[horizontal]</code>
        <span>Arah kiri-ke-kanan</span>
      </div>
    </div>

    <!-- =========================================================
         1. NODE DASAR
         ========================================================= -->
    <h2>1. Node &amp; Bentuk Dasar</h2>
    <p>
      Format dasar satu node: <code>-&gt;[bentuk]-&gt;text["Label"]</code>. Tambahkan
      <code>-&gt;node</code> di akhir baris untuk menyambung ke node berikutnya secara otomatis.
    </p>

    <CodeBlock language="mermaid" :code="basicSyntax" />
    <LiveDiagram :code="basicSyntax" />

    <!-- =========================================================
         2. SHAPES REFERENCE
         ========================================================= -->
    <h2>2. Referensi Bentuk</h2>
    <p>
      10 bentuk didukung. Semua bentuk memiliki alias bahasa Indonesia untuk kenyamanan.
    </p>

    <table>
      <thead>
        <tr>
          <th>Bentuk</th>
          <th>Alias (Inggris)</th>
          <th>Alias (Indonesia)</th>
          <th>Penggunaan Umum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in shapes" :key="s.name">
          <td><code>{{ s.name }}</code></td>
          <td>{{ s.aliasEn || '—' }}</td>
          <td>{{ s.aliasId || '—' }}</td>
          <td class="muted">{{ s.use }}</td>
        </tr>
      </tbody>
    </table>

    <p>
      <strong>Tip:</strong> tambahkan warna langsung di bracket —
      <code>[round:green]</code>, <code>[diamond:#ff5722]</code>, atau
      <code>[square:red]</code>.
    </p>

    <!-- =========================================================
         3. PERCABANGAN
         ========================================================= -->
    <h2>3. Percabangan (Wajib <code>[cabang]</code>)</h2>
    <p>
      Gunakan <code>[cabang]</code> diikuti indentasi untuk membuat dua sisi
      <code>-&gt;ya</code> dan <code>-&gt;tidak</code>. Semua sub-node di bawah salah satu sisi
      harus lebih dalam indentasinya.
    </p>

    <CodeBlock language="mermaid" :code="nestedSyntax" />
    <LiveDiagram :code="nestedSyntax" />

    <!-- =========================================================
         4. EDGE LABEL (NEW — Batch 2A)
         ========================================================= -->
    <h2>
      4. Label pada Panah
      <span class="badge badge-new">NEW</span>
    </h2>
    <p>
      Ganti <code>-&gt;node</code> di akhir baris dengan <code>-- label --&gt;</code> untuk
      memberi teks label di tengah panah. Bekerja juga di dalam sub-cabang.
    </p>

    <CodeBlock language="mermaid" :code="edgeLabelSyntax" />
    <LiveDiagram :code="edgeLabelSyntax" />

    <p class="tip">
      <strong>Kombinasi dengan cabang:</strong> label edge di sisi
      <code>-&gt;ya["Ya"]-- lanjut --&gt;</code> akan muncul di panah yang menuju sub-node
      pertama di bawahnya.
    </p>

    <CodeBlock language="mermaid" :code="edgeLabelBranchSyntax" />
    <LiveDiagram :code="edgeLabelBranchSyntax" />

    <!-- =========================================================
         5. RICH TEXT
         ========================================================= -->
    <h2>5. Rich Text</h2>
    <p>
      Label node mendukung format Markdown-lite: <strong>Tebal</strong> (<code>**teks**</code>),
      <em>Miring</em> (<code>*teks*</code>), dan <code>Kode</code> (<code>`teks`</code>).
      Gunakan <code>\n</code> untuk baris baru di dalam satu label.
    </p>

    <CodeBlock language="mermaid" :code="richText" />
    <LiveDiagram :code="richText" />

    <!-- =========================================================
         6. WARNA KUSTOM
         ========================================================= -->
    <h2>6. Warna Kustom</h2>
    <p>
      Tambahkan titik dua dan nama warna (CSS name, hex, atau rgb) di dalam kurung bentuk.
    </p>

    <CodeBlock language="mermaid" :code="customColors" />
    <LiveDiagram :code="customColors" />

    <!-- =========================================================
         7. NODE INTERAKTIF
         ========================================================= -->
    <h2>7. Node Interaktif (Link &amp; Tooltip)</h2>
    <p>
      Jadikan node bisa diklik dengan <code>-&gt;link["url"]</code>, dan tampilkan pesan hover
      dengan <code>-&gt;tooltip["pesan"]</code>. Keduanya di-render sebagai elemen SVG native.
    </p>

    <CodeBlock language="mermaid" :code="interactive" />
    <LiveDiagram :code="interactive" />

    <!-- =========================================================
         8. GROUPING
         ========================================================= -->
    <h2>8. Grouping (Kotak Pembungkus)</h2>
    <p>
      Kelompokkan beberapa node dalam satu kotak berlabel. Berguna untuk menandai subsystem
      atau blok logika. Group otomatis mengelilingi semua node di dalam indentasinya.
    </p>

    <CodeBlock language="mermaid" :code="groupSyntax" />
    <LiveDiagram :code="groupSyntax" />

    <!-- =========================================================
         9. ARAH HORIZONTAL
         ========================================================= -->
    <h2>9. Arah Horizontal</h2>
    <p>
      Tambahkan <code>[horizontal]</code> di baris paling atas untuk layout kiri-ke-kanan.
      Default: vertikal (atas-ke-bawah).
    </p>

    <CodeBlock language="mermaid" :code="horizontalSyntax" />
    <LiveDiagram :code="horizontalSyntax" />

    <!-- =========================================================
         10. NEXT STEPS
         ========================================================= -->
    <div class="next-steps">
      <h3>Selanjutnya</h3>
      <div class="next-grid">
        <router-link to="/swimlane" class="next-card">
          <strong>Swimlane →</strong>
          <span>Proses lintas aktor</span>
        </router-link>
        <router-link to="/sequence" class="next-card">
          <strong>Sequence →</strong>
          <span>Interaksi antar aktor</span>
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
   SHAPES REFERENCE
   ========================================================= */
const shapes = [
  { name: 'square',       aliasEn: 'rect, box',       aliasId: 'kotak, persegi',    use: 'Proses / langkah' },
  { name: 'round',        aliasEn: 'rounded, stadium',aliasId: 'kapsul',            use: 'Mulai / selesai' },
  { name: 'diamond',      aliasEn: 'decision, rhombus',aliasId: 'belahketupat, belah', use: 'Keputusan (ya/tidak)' },
  { name: 'circle',       aliasEn: '—',               aliasId: 'lingkaran, bulat',  use: 'Titik koneksi' },
  { name: 'ellipse',      aliasEn: 'oval',            aliasId: 'elips',             use: 'Koneksi / status' },
  { name: 'triangle',     aliasEn: '—',               aliasId: 'segitiga',          use: 'Selesai / akhir' },
  { name: 'hexagon',      aliasEn: '—',               aliasId: 'segienam',          use: 'Persiapan / setup' },
  { name: 'parallelogram',aliasEn: '—',               aliasId: 'jajargenjang',      use: 'Input / output' },
  { name: 'cylinder',     aliasEn: 'database, db',    aliasId: 'silinder',          use: 'Database / storage' },
  { name: 'document',     aliasEn: 'doc',             aliasId: 'dokumen',           use: 'Dokumen / laporan' },
];

/* =========================================================
   SYNTAX SNIPPETS
   ========================================================= */
const basicSyntax = `->[round]->text["Mulai"]->node
->[square]->text["Proses Data"]->node
->[diamond]->text["Valid?"]->node
->[triangle]->text["Selesai"]`;

const nestedSyntax = `[cabang]->[diamond]->text["Login?"]
  ->ya["Ya"]
    ->[square]->text["Dashboard"]
  ->tidak["Tidak"]
    ->[square]->text["Halaman Login"]`;

const edgeLabelSyntax = `->[round]->text["Mulai"]-- mulai -->
->[square]->text["Proses"]-- selesai -->
->[diamond]->text["Sukses?"]-- ya -->
->[triangle]->text["Deploy"]`;

const edgeLabelBranchSyntax = `[cabang]->[diamond]->text["Pembayaran?"]
  ->ya["Lunas"]-- lanjut -->
    ->[square]->text["Kirim Barang"]
  ->tidak["Gagal"]-- ulangi -->
    ->[square]->text["Halaman Bayar"]`;

const richText = `->[round]->text["Status: **AKTIF**"]->node
->[diamond]->text["Cek *Koneksi*\\nDatabase?"]->node
->[square]->text["Ping \`192.168.1.1\`"]`;

const customColors = `->[round:green]->text["Sukses"]->node
->[square:red]->text["Error"]->node
->[diamond:#ff5722]->text["Peringatan"]->node
->[hexagon:purple]->text["Proses"]`;

const interactive = `->[square]->text["Google"]
  ->link["https://google.com"]
  ->tooltip["Buka mesin pencari"]->node
->[square]->text["Kembali ke Beranda"]
  ->link["/"]`;

const groupSyntax = `[group "Sistem Database"]
  ->[cylinder]->icon["database"]->text["PostgreSQL"]
  ->[cylinder]->text["Redis Cache"]`;

const horizontalSyntax = `[horizontal]
->[round]->text["Mulai"]->node
->[square]->text["Validasi"]->node
->[diamond]->text["OK?"]->node
->[triangle]->text["Selesai"]`;
</script>

<style scoped>
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
}
.qr-item span {
  font-size: 11.5px;
  color: var(--muted);
}

/* =========================================================
   BADGE NEW
   ========================================================= */
.badge-new {
  display: inline-flex;
  align-items: center;
  background: rgba(63, 185, 80, 0.12);
  color: var(--success);
  border: 1px solid rgba(63, 185, 80, 0.35);
  padding: 1px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  vertical-align: middle;
  margin-left: 6px;
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
table td.muted {
  color: var(--muted);
  font-size: 13px;
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
}
</style>