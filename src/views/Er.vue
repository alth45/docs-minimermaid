<template>
  <div>
    <h1>
      ER Diagram
      <span class="badge badge-new">NEW</span>
    </h1>
    <p>
      Entity-Relationship diagram untuk memodelkan struktur database — entitas, atribut,
      relasi, dan kardinalitas — dengan notasi <strong>crow's foot</strong> standar industri.
    </p>

    <!-- =========================================================
         QUICK REFERENCE
         ========================================================= -->
    <div class="quick-ref">
      <div class="qr-item">
        <code>[er]</code>
        <span>Header tipe diagram</span>
      </div>
      <div class="qr-item">
        <code>entity Nama { }</code>
        <span>Deklarasi entitas</span>
      </div>
      <div class="qr-item">
        <code>PK id int</code>
        <span>Primary key</span>
      </div>
      <div class="qr-item">
        <code>FK user_id</code>
        <span>Foreign key</span>
      </div>
      <div class="qr-item">
        <code>User 1 -- N Post</code>
        <span>Relasi one-to-many</span>
      </div>
      <div class="qr-item">
        <code>: menulis</code>
        <span>Label relasi (opsional)</span>
      </div>
    </div>

    <!-- =========================================================
         1. ENTITY DASAR
         ========================================================= -->
    <h2>1. Deklarasi Entitas</h2>
    <p>
      Gunakan direktif <code>[er]</code> di baris pertama. Setiap entitas dideklarasikan
      dengan <code>entity Nama { ... }</code> — atribut ditulis di dalam kurung kurawal,
      satu per baris.
    </p>

    <CodeBlock language="mermaid" :code="entityBasic" />
    <LiveDiagram :code="entityBasic" />

    <p class="tip">
      <strong>Entitas tanpa atribut:</strong> <code>entity User</code> (tanpa kurung kurawal)
      tetap valid — akan dirender sebagai kotak dengan judul saja.
    </p>

    <!-- =========================================================
         2. ATRIBUT & KUNCI
         ========================================================= -->
    <h2>2. Atribut &amp; Kunci</h2>
    <p>
      Setiap atribut ditulis sebagai <code>[prefix] nama [tipe]</code>. Prefix <code>PK</code>
      (primary key) dan <code>FK</code> (foreign key) otomatis diberi badge berwarna. Tipe
      data di kanan bersifat opsional dan dirender dengan warna muted.
    </p>

    <div class="prefix-grid">
      <div class="prefix-card prefix-pk">
        <code>PK</code>
        <span>Primary key — badge oranye</span>
      </div>
      <div class="prefix-card prefix-fk">
        <code>FK</code>
        <span>Foreign key — badge biru</span>
      </div>
      <div class="prefix-card prefix-pkfk">
        <code>PK/FK</code>
        <span>Composite key — badge ungu</span>
      </div>
    </div>

    <CodeBlock language="mermaid" :code="attributeTypes" />
    <LiveDiagram :code="attributeTypes" />

    <p>
      <strong>Composite key:</strong> gunakan <code>PK/FK</code> (atau <code>PKFK</code>,
      <code>PK,FK</code>) untuk kolom yang berfungsi sebagai keduanya sekaligus — umum pada
      tabel pivot (junction table).
    </p>

    <!-- =========================================================
         3. RELASI & KARDINALITAS
         ========================================================= -->
    <h2>3. Relasi &amp; Kardinalitas</h2>
    <p>
      Format relasi: <code>EntityA kardinalitas -- kardinalitas EntityB : label</code>.
      Label (<code>: teks</code>) bersifat opsional. Arah panah <code>--</code> bersifat
      simetris — posisi kardinalitas di kiri/kanan menentukan notasi di masing-masing ujung.
    </p>

    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>Arti</th>
          <th>Notasi Crow's Foot</th>
          <th>Contoh</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>1</code></td>
          <td>One (tepat satu)</td>
          <td>Tick tegak lurus</td>
          <td><code>User 1 -- N Post</code></td>
        </tr>
        <tr>
          <td><code>N</code> / <code>M</code> / <code>*</code></td>
          <td>Many (nol atau lebih)</td>
          <td>Fan (kipas tiga garis)</td>
          <td><code>Tag N -- M Post</code></td>
        </tr>
        <tr>
          <td><code>?</code> / <code>0..1</code></td>
          <td>Optional (nol atau satu)</td>
          <td>Lingkaran kecil</td>
          <td><code>User 1 -- ? Profile</code></td>
        </tr>
      </tbody>
    </table>

    <!-- =========================================================
         4. CONTOH: ONE-TO-MANY
         ========================================================= -->
    <h2>4. Contoh: One-to-Many</h2>
    <p>
      Satu User dapat menulis banyak Post, tetapi setiap Post hanya milik satu User.
      Ini adalah relasi paling umum di aplikasi blog/forum.
    </p>

    <CodeBlock language="mermaid" :code="oneToMany" />
    <LiveDiagram :code="oneToMany" />

    <!-- =========================================================
         5. CONTOH: MANY-TO-MANY
         ========================================================= -->
    <h2>5. Contoh: Many-to-Many</h2>
    <p>
      Satu Post dapat memiliki banyak Tag, dan satu Tag dapat dipakai di banyak Post.
      Di database relasional, relasi ini biasanya diimplementasikan via tabel pivot
      (junction table).
    </p>

    <CodeBlock language="mermaid" :code="manyToMany" />
    <LiveDiagram :code="manyToMany" />

    <!-- =========================================================
         6. CONTOH: OPTIONAL & COMPOSITE
         ========================================================= -->
    <h2>6. Contoh: Optional &amp; Composite Key</h2>
    <p>
      User <em>mungkin</em> memiliki Profile (0 atau 1), tapi setiap Profile wajib
      dimiliki User. Contoh lain: junction table <code>OrderItem</code> dengan composite
      primary key dari dua foreign key (<code>order_id</code> + <code>product_id</code>).
    </p>

    <CodeBlock language="mermaid" :code="optionalComposite" />
    <LiveDiagram :code="optionalComposite" />

    <!-- =========================================================
         7. NOTASI CROW'S FOOT
         ========================================================= -->
    <h2>7. Memahami Notasi Crow's Foot</h2>
    <p>
      MiniMermaid otomatis memilih arah keluar panah (kiri/kanan/atas/bawah) berdasarkan
      posisi relatif entitas. Kartinalitas selalu digambar di ujung yang dekat dengan
      entitasnya masing-masing.
    </p>

    <div class="notation-grid">
      <div class="notation-card">
        <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="notation-svg">
          <line x1="10" y1="20" x2="70" y2="20" stroke="currentColor" stroke-width="2"/>
          <line x1="60" y1="10" x2="60" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
        <code>1</code>
        <span>Tick — satu</span>
      </div>
      <div class="notation-card">
        <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="notation-svg">
          <line x1="10" y1="20" x2="70" y2="20" stroke="currentColor" stroke-width="2"/>
          <line x1="58" y1="20" x2="70" y2="10" stroke="currentColor" stroke-width="2"/>
          <line x1="58" y1="20" x2="70" y2="20" stroke="currentColor" stroke-width="2"/>
          <line x1="58" y1="20" x2="70" y2="30" stroke="currentColor" stroke-width="2"/>
        </svg>
        <code>N</code>
        <span>Fan — banyak</span>
      </div>
      <div class="notation-card">
        <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="notation-svg">
          <line x1="10" y1="20" x2="70" y2="20" stroke="currentColor" stroke-width="2"/>
          <circle cx="60" cy="20" r="5" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
        <code>?</code>
        <span>Circle — opsional</span>
      </div>
    </div>

    <!-- =========================================================
         8. TIPS
         ========================================================= -->
    <h2>8. Tips &amp; Batasan</h2>
    <ul>
      <li>
        <strong>Auto-layout grid:</strong> entitas ditata otomatis dalam grid
        <code>ceil(sqrt(N))</code>. Untuk kontrol layout manual, atur urutan deklarasi
        <code>entity</code> sesuai keinginan (grid mengisi baris per baris).
      </li>
      <li>
        <strong>Entitas otomatis:</strong> relasi ke entitas yang belum dideklarasikan akan
        membuat entitas kosong otomatis — praktis untuk prototyping cepat.
      </li>
      <li>
        <strong>Warna per entitas:</strong> tiap entitas mendapat warna palette berbeda
        secara bergilir. Konsisten dengan tema aktif (gelap/terang).
      </li>
      <li>
        <strong>Edge style:</strong> relasi mengikuti pilihan gaya edge global
        (<code>smooth</code>, <code>step</code>, <code>straight</code>).
      </li>
      <li>
        <strong>Belum didukung:</strong> entity group (kolom vertikal), inheritance
        (subclassing), dan multi-column primary key selain via <code>PK/FK</code>.
      </li>
    </ul>

    <!-- =========================================================
         NEXT STEPS
         ========================================================= -->
    <div class="next-steps">
      <h3>Selanjutnya</h3>
      <div class="next-grid">
        <router-link to="/mindmap" class="next-card">
          <strong>Mindmap →</strong>
          <span>Pemetaan konsep radial</span>
        </router-link>
        <router-link to="/timeline" class="next-card">
          <strong>Timeline →</strong>
          <span>Kronologi kejadian</span>
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

const entityBasic = `[er]
entity User {
  id int
  name string
  email string
}
entity Post {
  id int
  title string
  content text
}
User 1 -- N Post : menulis`;

const attributeTypes = `[er]
entity Order {
  PK id int
  FK customer_id int
  total decimal
  status string
}
entity OrderItem {
  PK/FK order_id int
  PK/FK product_id int
  quantity int
  price decimal
}
entity Customer {
  PK id int
  name string
}
Order 1 -- N OrderItem : berisi
Customer 1 -- N Order : memesan`;

const oneToMany = `[er]
entity User {
  PK id int
  name string
  email string
}
entity Post {
  PK id int
  FK user_id int
  title string
  published_at timestamp
}
User 1 -- N Post : menulis`;

const manyToMany = `[er]
entity Post {
  PK id int
  title string
}
entity Tag {
  PK id int
  name string
}
entity PostTag {
  PK/FK post_id int
  PK/FK tag_id int
}
Post 1 -- N PostTag : memiliki
Tag 1 -- N PostTag : dilabeli`;

const optionalComposite = `[er]
entity User {
  PK id int
  email string
}
entity Profile {
  PK id int
  FK user_id int
  bio text
  avatar_url string
}
entity Session {
  PK token string
  FK user_id int
  expires_at timestamp
}
User 1 -- ? Profile : memiliki
User 1 -- N Session : aktif di`;
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
}
.qr-item span {
  font-size: 11.5px;
  color: var(--muted);
}

/* =========================================================
   PREFIX CARDS
   ========================================================= */
.prefix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  margin: 16px 0 20px;
}

.prefix-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius);
  background: var(--panel);
  border: 1px solid var(--border);
}
.prefix-card code {
  font-size: 12px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 4px;
  background: transparent;
  border: 0;
  flex-shrink: 0;
}
.prefix-card span {
  font-size: 12.5px;
  color: var(--muted);
}

.prefix-pk {
  border-color: rgba(210, 153, 34, 0.35);
  background: rgba(210, 153, 34, 0.06);
}
.prefix-pk code { color: #d29922; }

.prefix-fk {
  border-color: rgba(88, 166, 255, 0.35);
  background: rgba(88, 166, 255, 0.06);
}
.prefix-fk code { color: #58a6ff; }

.prefix-pkfk {
  border-color: rgba(163, 113, 247, 0.35);
  background: rgba(163, 113, 247, 0.06);
}
.prefix-pkfk code { color: #a371f7; }

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
table td code {
  font-size: 11.5px;
}

/* =========================================================
   NOTATION GRID
   ========================================================= */
.notation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin: 16px 0 24px;
}

.notation-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-align: center;
  transition: border-color var(--t-fast);
}
.notation-card:hover {
  border-color: var(--accent-border);
}

.notation-svg {
  width: 80px;
  height: 40px;
  color: var(--edgeStroke, #7d8590);
  opacity: 0.85;
}

.notation-card code {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  background: transparent;
  border: 0;
  padding: 0;
}
.notation-card span {
  font-size: 12px;
  color: var(--muted);
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
  .prefix-grid {
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
  .notation-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .notation-svg {
    width: 60px;
    height: 30px;
  }
}
</style>