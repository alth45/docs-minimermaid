<template>
  <div>
    <h1>Flowchart</h1>
    <p>
      Panduan sintaks untuk membuat flowchart dengan MiniMermaid. Setiap node ditulis satu per
      baris menggunakan format yang konsisten, dengan indentasi ketat untuk percabangan.
    </p>

    <!-- =========================================================
         ATURAN KETAT (Dari Feedback)
         ========================================================= -->
    <div class="alert alert-warning">
      <h3>⚠️ Aturan Sintaks Ketat</h3>
      <p>Agar parser tidak error, patuhi 4 aturan wajib ini:</p>
      <ul>
        <li><strong>Satu Node = Satu Baris Penuh:</strong> Semua atribut (<code>-&gt;icon</code>, <code>-&gt;text</code>, <code>-&gt;tooltip</code>) harus berada di baris yang sama dengan <code>-&gt;[bentuk]</code>.</li>
        <li><strong>Indentasi Konsisten:</strong> Gunakan spasi yang sama (misal 2 spasi) untuk setiap level.</li>
        <li><strong>Token Ujung:</strong> Node terakhir di sebuah jalur <strong>tidak boleh</strong> diakhiri dengan <code>-&gt;node</code> atau <code>-- label --&gt;</code>.</li>
        <li><strong>Cabang Valid:</strong> <code>[cabang]</code> wajib memiliki minimal satu sisi <code>-&gt;ya</code> dan satu sisi <code>-&gt;tidak</code>.</li>
      </ul>
    </div>

    <!-- =========================================================
         QUICK REFERENCE
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
        <span>Sambung ke bawah</span>
      </div>
      <div class="qr-item">
        <code>-- label --&gt;</code>
        <span>Sambung berlabel</span>
      </div>
      <div class="qr-item">
        <code>-&gt;id["..."]</code>
        <span>Beri ID unik</span>
      </div>
      <div class="qr-item">
        <code>-&gt;goto["..."]</code>
        <span>Lompat ke ID (Graf)</span>
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

    <div class="tip">
      <strong>Salah (Atribut terpisah):</strong> Menaruh <code>-&gt;tooltip</code> di baris baru akan memicu error.
      <pre><code>->[round]->text["Mulai"]
  ->tooltip["Ini salah"]</code></pre>
    </div>

    <!-- =========================================================
         2. PERCABANGAN FLEKSIBEL (NEW)
         ========================================================= -->
    <h2>
      2. Percabangan Fleksibel
      <span class="badge badge-new">NEW</span>
    </h2>
    <p>
      Gunakan <code>[cabang]</code> diikuti indentasi untuk membuat sisi. Anda tidak lagi terbatas pada 
      <code>-&gt;ya</code> dan <code>-&gt;tidak</code>. Anda bisa menggunakan kata kunci bebas untuk N-cabang.
    </p>

    <CodeBlock language="mermaid" :code="nestedSyntax" />
    <LiveDiagram :code="nestedSyntax" />

    <!-- =========================================================
         3. GRAF: ID & GOTO (NEW)
         ========================================================= -->
    <h2>
      3. Graf: ID &amp; Goto (Menyatukan Alur)
      <span class="badge badge-new">NEW</span>
    </h2>
    <p>
      Secara default, MiniMermaid membuat diagram berbentuk pohon (tree). Untuk menyatukan alur
      (many-to-one) atau membuat <em>looping</em>, gunakan <code>-&gt;id["..."]</code> dan <code>-&gt;goto["..."]</code>.
    </p>

    <CodeBlock language="mermaid" :code="graphSyntax" />
    <LiveDiagram :code="graphSyntax" />

    <p class="tip">
      <strong>Catatan Layout:</strong> Panah <code>goto</code> yang mundur (loop) akan digambar dengan garis putus-putus yang melingkari diagram agar tidak menabrak node lain.
    </p>

    <!-- =========================================================
         4. LABEL PADA PANAH
         ========================================================= -->
    <h2>4. Label pada Panah</h2>
    <p>
      Ganti <code>-&gt;node</code> di akhir baris dengan <code>-- label --&gt;</code> untuk
      memberi teks label di tengah panah. Bekerja juga di dalam sub-cabang.
    </p>

    <CodeBlock language="mermaid" :code="edgeLabelSyntax" />
    <LiveDiagram :code="edgeLabelSyntax" />

    <!-- =========================================================
         5. RICH TEXT & WARNA
         ========================================================= -->
    <h2>5. Rich Text &amp; Warna</h2>
    <p>
      Label mendukung format Markdown-lite: <strong>Tebal</strong> (<code>**teks**</code>),
      <em>Miring</em> (<code>*teks*</code>), dan <code>Kode</code>.
      Tambahkan titik dua dan nama warna (CSS name atau hex) di dalam kurung bentuk.
    </p>

    <CodeBlock language="mermaid" :code="richText" />
    <LiveDiagram :code="richText" />

    <!-- =========================================================
         NEXT STEPS
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

const basicSyntax = `->[round]->text["Mulai"]->node
->[square]->text["Proses Data"]->node
->[diamond]->text["Valid?"]`;

const nestedSyntax = `[cabang]->[diamond]->text["Pilih Metode Pembayaran?"]
  ->kartu["Kartu Kredit"]
    ->[square]->text["Form Kartu"]
  ->transfer["Transfer Bank"]
    ->[square]->text["Instruksi Transfer"]
  ->ewallet["E-Wallet"]
    ->[square]->text["Scan QR"]`;

const graphSyntax = `->[round]->id["mulai"]->text["Mulai"]->node
->[diamond]->text["Login?"]->node
[cabang]->[diamond]->text["Valid?"]
  ->ya["Ya"]
    ->[square:green]->text["Dashboard"]->goto["selesai"]
  ->tidak["Tidak"]
    ->[square:red]->text["Gagal"]->goto["mulai"]
->[round:green]->id["selesai"]->text["Selesai"]`;

const edgeLabelSyntax = `->[round]->text["Mulai"]-- mulai -->
->[square]->text["Proses"]-- selesai -->
->[triangle]->text["Selesai"]`;

const richText = `->[round:green]->text["Status: **AKTIF**"]->node
->[diamond:red]->text["Cek *Koneksi*\\nDatabase?"]->node
->[square:blue]->text["Ping \`192.168.1.1\`"]`;
</script>

<style scoped>
/* Tambahan style untuk Alert Warning */
.alert-warning {
  background: rgba(210, 153, 34, 0.1);
  border-left: 4px solid #d29922;
  padding: 16px 20px;
  border-radius: 6px;
  margin-bottom: 24px;
}
.alert-warning h3 {
  margin-top: 0;
  color: #d29922;
  font-size: 16px;
}
.alert-warning ul {
  margin-bottom: 0;
  padding-left: 20px;
}
.alert-warning li {
  margin-bottom: 8px;
  color: var(--text);
}

/* Style lainnya sama seperti sebelumnya... */
.quick-ref { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; padding: 14px; margin: 20px 0 32px; background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); }
.qr-item { display: flex; flex-direction: column; gap: 3px; padding: 8px 10px; border-radius: var(--radius-sm); background: var(--bg-elevated); border: 1px solid var(--border-subtle); }
.qr-item code { font-size: 11.5px; font-weight: 600; color: var(--accent); background: transparent; border: 0; padding: 0; white-space: nowrap; }
.qr-item span { font-size: 11.5px; color: var(--muted); }
.badge-new { display: inline-flex; align-items: center; background: rgba(63, 185, 80, 0.12); color: var(--success); border: 1px solid rgba(63, 185, 80, 0.35); padding: 1px 8px; border-radius: 999px; font-size: 10px; font-weight: 800; letter-spacing: 0.06em; vertical-align: middle; margin-left: 6px; }
.tip { padding: 12px 16px; background: var(--accent-soft); border-left: 3px solid var(--accent); border-radius: var(--radius-sm); font-size: 13.5px; color: var(--text); margin: 16px 0 20px; }
.tip strong { color: var(--accent); }
.tip pre { margin-top: 8px; margin-bottom: 0; padding: 8px; background: var(--bg); border: 1px solid var(--border); }
.tip code { background: transparent; border: 0; padding: 0; color: #c9d1d9; }
.next-steps { margin-top: 56px; padding-top: 32px; border-top: 1px solid var(--border-subtle); }
.next-steps h3 { font-size: 14px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 16px; }
.next-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
.next-card { display: flex; flex-direction: column; gap: 4px; padding: 14px 16px; background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); text-decoration: none; transition: border-color var(--t-fast), transform var(--t-fast), background var(--t-fast); }
.next-card:hover { border-color: var(--accent-border); background: var(--panel-2); transform: translateY(-1px); text-decoration: none; }
.next-card strong { font-size: 14px; color: var(--accent); font-weight: 600; }
.next-card span { font-size: 12.5px; color: var(--muted); }
@media (max-width: 600px) { .quick-ref { grid-template-columns: 1fr 1fr; } .next-grid { grid-template-columns: 1fr; } }
</style>