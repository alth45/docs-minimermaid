<template>
  <div>
    <h1>
      Alur E-Commerce
      <span class="badge badge-demo">Studi Kasus</span>
    </h1>
    <p>
      Studi kasus end-to-end yang mendemonstrasikan penggabungan <b>Swimlane</b>,
      <b>Grouping</b>, <b>Warna Kustom</b>, <b>Rich Text</b>, <b>Ikon Lucide</b>, dan
      <b>Timeline</b> — semua dalam satu skenario nyata: alur pemesanan barang.
    </p>

    <!-- =========================================================
         QUICK OVERVIEW
         ========================================================= -->
    <div class="quick-ref">
      <div class="qr-item">
        <code>[horizontal]</code>
        <span>Layout kiri-ke-kanan</span>
      </div>
      <div class="qr-item">
        <code>[lane "..."]</code>
        <span>Pisahkan per aktor</span>
      </div>
      <div class="qr-item">
        <code>[group "..."]</code>
        <span>Kotak subsystem</span>
      </div>
      <div class="qr-item">
        <code>[cabang]</code>
        <span>Percabangan keputusan</span>
      </div>
      <div class="qr-item">
        <code>-- label --&gt;</code>
        <span>Label panah</span>
      </div>
      <div class="qr-item">
        <code>[timeline]</code>
        <span>Tracking pesanan</span>
      </div>
    </div>

    <!-- =========================================================
         SECTION 1: SWIMLANE
         ========================================================= -->
    <h2>
      1. Swimlane — Alur Pemesanan
      <span class="badge badge-feature">Fitur Lengkap</span>
    </h2>
    <p>
      Menggabungkan tiga lane aktor (Pelanggan, Sistem, Gudang) dalam layout
      <code>[horizontal]</code>. Sistem memiliki sub-cabang pembayaran yang dibungkus
      dalam <code>[group "Payment Gateway"]</code> — memisahkan logika pembayaran dari
      alur utama.
    </p>

    <CodeBlock language="mermaid" :code="swimlaneCode" />
    <LiveDiagram :code="swimlaneCode" show-toolbar />

    <div class="feature-breakdown">
      <div class="fb-card">
        <div class="fb-icon fb-icon-lane">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
          </svg>
        </div>
        <div>
          <strong>3 Lane Aktor</strong>
          <p>Pelanggan · Sistem · Gudang</p>
        </div>
      </div>

      <div class="fb-card">
        <div class="fb-icon fb-icon-group">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="4 2" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <div>
          <strong>1 Group</strong>
          <p>Payment Gateway (subsystem)</p>
        </div>
      </div>

      <div class="fb-card">
        <div class="fb-icon fb-icon-branch">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <path d="M6 3v12" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
        </div>
        <div>
          <strong>1 Percabangan</strong>
          <p>Pembayaran → Lunas / Gagal</p>
        </div>
      </div>

      <div class="fb-card">
        <div class="fb-icon fb-icon-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        <div>
          <strong>8 Ikon Lucide</strong>
          <p>user · cart · credit-card · truck · dst.</p>
        </div>
      </div>
    </div>

    <!-- =========================================================
         SECTION 2: COLOR SEMANTICS
         ========================================================= -->
    <h2>2. Warna Semantik</h2>
    <p>
      Setiap node mendapat warna sesuai makna statusnya. Ini membantu pembaca memahami
      alur tanpa perlu membaca setiap label.
    </p>

    <div class="color-legend">
      <div class="cl-item">
        <span class="cl-swatch" style="background: rgba(63, 185, 80, 0.2); border-color: #3fb950;"></span>
        <div>
          <code>[square:green]</code>
          <span>Sukses · Terima Barang</span>
        </div>
      </div>
      <div class="cl-item">
        <span class="cl-swatch" style="background: rgba(248, 81, 73, 0.2); border-color: #f85149;"></span>
        <div>
          <code>[square:red]</code>
          <span>Gagal · Batalkan</span>
        </div>
      </div>
      <div class="cl-item">
        <span class="cl-swatch" style="background: rgba(210, 153, 34, 0.2); border-color: #d29922;"></span>
        <div>
          <code>[diamond:orange]</code>
          <span>Keputusan · Pembayaran?</span>
        </div>
      </div>
      <div class="cl-item">
        <span class="cl-swatch" style="background: rgba(88, 166, 255, 0.2); border-color: #58a6ff;"></span>
        <div>
          <code>[round]</code> (default)
          <span>Netral · Mulai, proses</span>
        </div>
      </div>
    </div>

    <!-- =========================================================
         SECTION 3: RICH TEXT & INTERACTIVITY
         ========================================================= -->
    <h2>3. Rich Text &amp; Interaktivitas</h2>
    <p>
      Node dalam contoh ini menggunakan format <code>**tebal**</code> untuk penekanan
      dan ikon Lucide untuk konteks visual. Node juga bisa diberi link dan tooltip
      (lihat contoh di bawah).
    </p>

    <CodeBlock language="mermaid" :code="richTextCode" />
    <LiveDiagram :code="richTextCode" />

    <p class="tip">
      <strong>Coba hover</strong> node <em>Dashboard Admin</em> — tooltip akan tampil.
      Klik node <em>Kembali ke Login</em> — akan membuka URL baru (contoh).
    </p>

    <!-- =========================================================
         SECTION 4: TIMELINE TRACKING
         ========================================================= -->
    <h2>
      4. Timeline — Tracking Pesanan
      <span class="badge badge-new">NEW</span>
    </h2>
    <p>
      Setelah pesanan dibuat, pelanggan melihat timeline status pesanan. Timeline
      menampilkan milestone dari pembayaran hingga pengiriman — berbeda per status
      pesanan. Contoh di bawah menunjukkan tracking pesanan yang berhasil.
    </p>

    <CodeBlock language="mermaid" :code="timelineSuccess" />
    <LiveDiagram :code="timelineSuccess" />

    <h3>Skenario Pesanan Gagal</h3>
    <p>
      Timeline juga bisa menampilkan skenario alternatif — seperti pembayaran gagal dan
      pesanan dibatalkan.
    </p>

    <CodeBlock language="mermaid" :code="timelineFailed" />
    <LiveDiagram :code="timelineFailed" />

    <!-- =========================================================
         SECTION 5: KODE LENGKAP
         ========================================================= -->
    <h2>5. Kode Lengkap</h2>
    <p>
      Gabungan seluruh diagram di atas dalam satu alur lengkap — dari pemesanan hingga
      pengiriman berhasil.
    </p>

    <CodeBlock language="mermaid" :code="fullCode" />
    <LiveDiagram :code="fullCode" show-toolbar />

    <!-- =========================================================
         TIPS
         ========================================================= -->
    <h2>6. Tips untuk Diagram E-Commerce</h2>
    <ul>
      <li>
        <strong>Gunakan lane secara konsisten:</strong> satu lane per aktor atau
        departemen. Urutan deklarasi menentukan urutan lane (dari atas ke bawah untuk
        horizontal, dari kiri ke kanan untuk vertikal).
      </li>
      <li>
        <strong>Warna semantik:</strong> gunakan hijau untuk sukses, merah untuk gagal,
        kuning untuk keputusan/warning. Ini membantu pembaca cepat memahami alur.
      </li>
      <li>
        <strong>Group untuk subsystem:</strong> bungkus logika kompleks (mis. Payment
        Gateway, Auth Service) dalam <code>[group]</code> agar tidak mengganggu alur
        utama.
      </li>
      <li>
        <strong>Ikon untuk konteks:</strong> tambahkan ikon Lucide pada node kunci
        (<code>user</code>, <code>shopping-cart</code>, <code>credit-card</code>,
        <code>truck</code>) untuk mempercepat visual scanning.
      </li>
      <li>
        <strong>Timeline untuk tracking:</strong> setelah alur utama selesai, gunakan
        timeline untuk menampilkan status pesanan ke pelanggan — lebih mudah dipahami
        daripada flowchart.
      </li>
      <li>
        <strong>Label panah jika perlu:</strong> gunakan <code>-- label --&gt;</code>
        untuk menyertakan kondisi transisi (mis. <code>-- retry --&gt;</code>) tanpa
        menambah node keputusan.
      </li>
    </ul>

    <!-- =========================================================
         NEXT STEPS
         ========================================================= -->
    <div class="next-steps">
      <h3>Contoh Proyek Lainnya</h3>
      <div class="next-grid">
        <router-link to="/examples/software" class="next-card">
          <strong>Arsitektur Software →</strong>
          <span>Network Graph + Sequence</span>
        </router-link>
        <router-link to="/examples/uml" class="next-card">
          <strong>Desain Sistem (UML) →</strong>
          <span>Class &amp; State Diagram</span>
        </router-link>
        <router-link to="/playground" class="next-card">
          <strong>Playground →</strong>
          <span>Coba diagram sendiri</span>
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

const swimlaneCode = `[horizontal]

[lane "Pelanggan"]
  ->[round]->icon["user"]->text["Mulai"]->node
  ->[square]->icon["shopping-cart"]->text["Pesan Barang"]->node
  ->[square:green]->icon["package-check"]->text["Terima Barang"]

[lane "Sistem"]
  [group "Payment Gateway"]
    [cabang]->[diamond:orange]->icon["credit-card"]->text["Pembayaran?"]
      ->ya["Lunas"]
        ->[square]->icon["check-circle"]->text["Validasi"]->node
        ->[square]->icon["truck"]->text["Pilih Kurir"]
      ->tidak["Gagal"]
        ->[square:red]->icon["x-circle"]->text["Batalkan"]

[lane "Gudang"]
  ->[square]->icon["box"]->text["Kemas Barang"]->node
  ->[square]->text["Serah Terima"]`;

const richTextCode = `[cabang]->[diamond]->text["Status: **AKTIF**?"]
  ->ya["Ya"]
    ->[round:green]->icon["check-circle"]->text["Dashboard **Admin**"]->node
    ->[square]->text["Kembali ke Login"]
      ->link["https://example.com/login"]
      ->tooltip["Kembali ke halaman login"]`;

const timelineSuccess = `[timeline]
title : Tracking Pesanan #12345
Senin : Pesanan Dibuat : 14:32
Senin : Pembayaran Lunas : 14:35
Selasa : Dikemas : 09:15
Selasa : Dikirim : 15:00
Rabu : Dalam Perjalanan : Kurir JNE
Kamis : Diterima : 10:20`;

const timelineFailed = `[timeline]
title : Pesanan #12346 (Gagal)
Senin : Pesanan Dibuat : 14:32
Senin : Pembayaran Gagal : Kartu Ditolak
Senin : Pesanan Dibatalkan : Sistem
Senin : Notifikasi Email : Terkirim`;

const fullCode = `[horizontal]

[lane "Pelanggan"]
  ->[round]->icon["user"]->text["Mulai"]-- pesan -->
  ->[square]->icon["shopping-cart"]->text["Pesan Barang"]-- bayar -->
  ->[diamond]->text["Pembayaran?"]-- lunas -->
  ->[square:green]->icon["package-check"]->text["Terima Barang"]

[lane "Sistem"]
  [group "Payment Gateway"]
    ->[square]->icon["credit-card"]->text["Proses Bayar"]-- konfirmasi -->
    ->[square]->icon["check-circle"]->text["Validasi"]-- siap -->
    ->[square]->icon["truck"]->text["Pilih Kurir"]

[lane "Gudang"]
  ->[square]->icon["box"]->text["Kemas Barang"]-- kirim -->
  ->[square]->text["Serah Terima Kurir"]`;
</script>

<style scoped>
/* =========================================================
   BADGES
   ========================================================= */
.badge-demo {
  display: inline-flex;
  align-items: center;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid var(--accent-border);
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  vertical-align: middle;
  margin-left: 8px;
  position: relative;
  top: -4px;
}

.badge-feature {
  display: inline-flex;
  align-items: center;
  background: rgba(163, 113, 247, 0.12);
  color: #a371f7;
  border: 1px solid rgba(163, 113, 247, 0.35);
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  vertical-align: middle;
  margin-left: 8px;
  position: relative;
  top: -4px;
}

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
   FEATURE BREAKDOWN
   ========================================================= */
.feature-breakdown {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin: 16px 0 24px;
}

.fb-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast), transform var(--t-fast);
}
.fb-card:hover {
  border-color: var(--accent-border);
  transform: translateY(-1px);
}

.fb-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.fb-icon-lane {
  background: rgba(88, 166, 255, 0.14);
  color: var(--accent);
}
.fb-icon-group {
  background: rgba(163, 113, 247, 0.14);
  color: #a371f7;
}
.fb-icon-branch {
  background: rgba(210, 153, 34, 0.14);
  color: #d29922;
}
.fb-icon-icon {
  background: rgba(63, 185, 80, 0.14);
  color: var(--success);
}

.fb-card strong {
  display: block;
  font-size: 13px;
  color: var(--text-strong);
  font-weight: 700;
  margin-bottom: 2px;
}
.fb-card p {
  font-size: 11.5px;
  color: var(--muted);
  margin: 0;
  line-height: 1.4;
}

/* =========================================================
   COLOR LEGEND
   ========================================================= */
.color-legend {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
  margin: 16px 0 24px;
}

.cl-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.cl-swatch {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 2px solid;
  flex-shrink: 0;
}

.cl-item code {
  display: block;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text);
  background: transparent;
  border: 0;
  padding: 0;
  font-family: var(--font-mono);
  margin-bottom: 2px;
}
.cl-item span {
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.4;
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
  .feature-breakdown,
  .color-legend {
    grid-template-columns: 1fr;
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