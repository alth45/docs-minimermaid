<template>
  <div>
    <h1>
      Desain Sistem (UML)
      <span class="badge badge-demo">Studi Kasus</span>
    </h1>
    <p>
      Studi kasus desain sistem lengkap dengan tiga sudut pandang UML: <b>Class Diagram</b>
      untuk struktur objek, <b>State Diagram</b> untuk siklus hidup entitas, dan
      <b>ER Diagram</b> untuk skema database. Ketiganya saling melengkapi sebagai dokumentasi
      sistem yang utuh.
    </p>

    <!-- =========================================================
         QUICK OVERVIEW
         ========================================================= -->
    <div class="quick-ref">
      <div class="qr-item">
        <code>[class]</code>
        <span>Struktur objek</span>
      </div>
      <div class="qr-item">
        <code>Animal &lt;|-- Duck</code>
        <span>Inheritance</span>
      </div>
      <div class="qr-item">
        <code>[state]</code>
        <span>Siklus hidup</span>
      </div>
      <div class="qr-item">
        <code>[*] --&gt; Idle</code>
        <span>Start / end state</span>
      </div>
      <div class="qr-item">
        <code>[er]</code>
        <span>Skema database</span>
      </div>
      <div class="qr-item">
        <code>User 1 -- N Post</code>
        <span>Relasi &amp; kardinalitas</span>
      </div>
    </div>

    <!-- =========================================================
         OVERVIEW 3 SUDUT PANDANG
         ========================================================= -->
    <div class="three-views">
      <div class="tv-card tv-class">
        <div class="tv-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
          </svg>
        </div>
        <h3>Class Diagram</h3>
        <p>Struktur objek: atribut, metode, relasi inheritance.</p>
      </div>

      <div class="tv-card tv-state">
        <div class="tv-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <h3>State Diagram</h3>
        <p>Siklus hidup entitas: transisi antar status.</p>
      </div>

      <div class="tv-card tv-er">
        <div class="tv-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
            <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
          </svg>
        </div>
        <h3>ER Diagram</h3>
        <p>Skema database: entity, atribut, relasi.</p>
      </div>
    </div>

    <!-- =========================================================
         SECTION 1: CLASS DIAGRAM
         ========================================================= -->
    <h2>
      1. Class Diagram — Struktur Objek
      <span class="badge badge-feature">Inti OOP</span>
    </h2>
    <p>
      Class diagram memodelkan struktur objek dalam sistem — atribut, metode, dan relasi
      inheritance. Contoh di bawah adalah model sederhana dari sistem kendaraan dengan
      parent class <code>Kendaraan</code> dan dua subclass (<code>Mobil</code>,
      <code>Motor</code>), dilengkapi note untuk menjelaskan perilaku khusus.
    </p>

    <CodeBlock language="mermaid" :code="classCode" />
    <LiveDiagram :code="classCode" show-toolbar />

    <div class="feature-breakdown">
      <div class="fb-card">
        <div class="fb-icon fb-icon-class">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
          </svg>
        </div>
        <div>
          <strong>3 Class</strong>
          <p>Kendaraan, Mobil, Motor</p>
        </div>
      </div>

      <div class="fb-card">
        <div class="fb-icon fb-icon-inherit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <path d="M12 3v6" />
            <path d="M6 15l6-6 6 6" />
          </svg>
        </div>
        <div>
          <strong>Inheritance</strong>
          <p>2 relasi inheritance (Mobil, Motor ← Kendaraan)</p>
        </div>
      </div>

      <div class="fb-card">
        <div class="fb-icon fb-icon-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <div>
          <strong>1 Note</strong>
          <p>Catatan kuning ala UML</p>
        </div>
      </div>

      <div class="fb-card">
        <div class="fb-icon fb-icon-member">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
        </div>
        <div>
          <strong>7 Member</strong>
          <p>Atribut &amp; metode antar 3 class</p>
        </div>
      </div>
    </div>

    <!-- =========================================================
         SECTION 2: STATE DIAGRAM
         ========================================================= -->
    <h2>2. State Diagram — Siklus Hidup</h2>
    <p>
      State diagram memodelkan siklus hidup entitas — sangat berguna untuk entitas yang
      melalui banyak status, seperti artikel, pesanan, atau user. Contoh di bawah adalah
      siklus hidup artikel: dari draft, review, published, hingga archived.
    </p>

    <CodeBlock language="mermaid" :code="stateCode" />
    <LiveDiagram :code="stateCode" show-toolbar />

    <div class="state-notes">
      <div class="sn-card">
        <div class="sn-symbol">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
            <circle cx="20" cy="20" r="10" fill="currentColor" />
          </svg>
        </div>
        <div>
          <code>[*]</code>
          <span>Start / end state (lingkaran solid)</span>
        </div>
      </div>

      <div class="sn-card">
        <div class="sn-symbol">
          <svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg" width="60" height="20">
            <line x1="5" y1="10" x2="55" y2="10" stroke="currentColor" stroke-width="1.5" />
            <polygon points="55,5 55,15 48,10" fill="currentColor" />
          </svg>
        </div>
        <div>
          <code>--&gt;</code>
          <span>Transisi state</span>
        </div>
      </div>

      <div class="sn-card">
        <div class="sn-symbol">
          <svg viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg" width="80" height="30">
            <line x1="5" y1="15" x2="55" y2="15" stroke="currentColor" stroke-width="1.5" />
            <text x="30" y="10" text-anchor="middle" font-size="9" fill="currentColor" font-family="monospace">: label</text>
            <polygon points="55,10 55,20 48,15" fill="currentColor" />
          </svg>
        </div>
        <div>
          <code>: label</code>
          <span>Aksi / trigger transisi</span>
        </div>
      </div>
    </div>

    <!-- =========================================================
         SECTION 3: ER DIAGRAM (NEW)
         ========================================================= -->
    <h2>
      3. ER Diagram — Skema Database
      <span class="badge badge-new">NEW</span>
    </h2>
    <p>
      ER diagram memodelkan skema database relasional — entity, atribut, primary/foreign
      key, dan relasi kardinalitas. Contoh di bawah adalah skema untuk sistem blog dengan
      relasi <strong>User ↔ Post ↔ Tag</strong> via junction table.
    </p>

    <CodeBlock language="mermaid" :code="erCode" />
    <LiveDiagram :code="erCode" show-toolbar />

    <div class="er-legend">
      <div class="el-item">
        <div class="el-badge" style="color: #d29922; border-color: rgba(210, 153, 34, 0.4);">
          PK
        </div>
        <span>Primary key — identitas unik</span>
      </div>
      <div class="el-item">
        <div class="el-badge" style="color: #58a6ff; border-color: rgba(88, 166, 255, 0.4);">
          FK
        </div>
        <span>Foreign key — referensi ke tabel lain</span>
      </div>
      <div class="el-item">
        <div class="el-badge" style="color: #a371f7; border-color: rgba(163, 113, 247, 0.4);">
          PK/FK
        </div>
        <span>Composite key — junction table</span>
      </div>
    </div>

    <!-- =========================================================
         SECTION 4: INTEGRASI TIGA SUDUT PANDANG
         ========================================================= -->
    <h2>4. Integrasi Tiga Sudut Pandang</h2>
    <p>
      Ketiga diagram di atas bukan pengganti satu sama lain, melainkan <em>saling
      melengkapi</em>. Diagram di bawah menunjukkan bagaimana <b>entity</b> di ER
      memetakan ke <b>class</b> di UML, dan bagaimana <b>state</b> memodelkan lifecycle
      entitas tersebut.
    </p>

    <div class="integration-flow">
      <div class="if-step">
        <div class="if-num">1</div>
        <div class="if-body">
          <h4>ER — Model Data</h4>
          <p>
            Entity <code>Post</code> dengan atribut <code>id</code>, <code>title</code>,
            <code>user_id</code> (FK). Ini menentukan <em>apa</em> yang disimpan.
          </p>
        </div>
      </div>

      <div class="if-arrow">↓</div>

      <div class="if-step">
        <div class="if-num">2</div>
        <div class="if-body">
          <h4>Class — Model Objek</h4>
          <p>
            Class <code>Post</code> dengan metode <code>publish()</code>,
            <code>archive()</code>, dan properti bertipe. Ini menentukan <em>bagaimana</em>
            data diolah di kode.
          </p>
        </div>
      </div>

      <div class="if-arrow">↓</div>

      <div class="if-step">
        <div class="if-num">3</div>
        <div class="if-body">
          <h4>State — Model Perilaku</h4>
          <p>
            State <code>Draft → Review → Published → Archived</code> menentukan
            <em>kapan</em> transisi boleh terjadi. Ini menentukan aturan bisnis lifecycle.
          </p>
        </div>
      </div>
    </div>

    <CodeBlock language="mermaid" :code="integratedExample" />
    <LiveDiagram :code="integratedExample" />

    <!-- =========================================================
         SECTION 5: TIPS
         ========================================================= -->
    <h2>5. Tips Desain Sistem</h2>
    <ul>
      <li>
        <strong>Mulai dari ER:</strong> sebelum menulis kode, modelkan dulu entitas &amp;
        relasi database. Ini fondasi yang menentukan struktur class di layer atas.
      </li>
      <li>
        <strong>Class untuk layer aplikasi:</strong> class diagram memodelkan domain
        model (bukan tabel database). Jangan sekadar copy-paste dari ER — class bisa punya
        metode dan relasi yang tidak muncul di database.
      </li>
      <li>
        <strong>State untuk entitas kompleks:</strong> tidak semua entity butuh state
        diagram. Gunakan hanya untuk entitas yang melalui banyak status dengan aturan
        transisi ketat (article, order, ticket, user journey).
      </li>
      <li>
        <strong>Gunakan PK/FK composite:</strong> untuk junction table (many-to-many),
        gunakan composite key <code>PK/FK</code> — bukan id auto-increment terpisah.
      </li>
      <li>
        <strong>Note untuk aturan khusus:</strong> manfaatkan <code>note for Nama</code>
        di class diagram untuk menjelaskan constraint atau behavior yang tidak tertangkap
        struktur.
      </li>
      <li>
        <strong>Konsisten naming:</strong> entity ER (<code>Post</code>), class UML
        (<code>Post</code>), dan state (<code>Post</code>) sebaiknya pakai nama yang sama
        — memudahkan navigasi lintas diagram.
      </li>
    </ul>

    <!-- =========================================================
         NEXT STEPS
         ========================================================= -->
    <div class="next-steps">
      <h3>Jelajahi Lebih Lanjut</h3>
      <div class="next-grid">
        <router-link to="/examples/ecommerce" class="next-card">
          <strong>Alur E-Commerce →</strong>
          <span>Swimlane + Timeline</span>
        </router-link>
        <router-link to="/examples/software" class="next-card">
          <strong>Arsitektur Software →</strong>
          <span>Network + Mindmap + Sequence</span>
        </router-link>
        <router-link to="/playground" class="next-card">
          <strong>Playground →</strong>
          <span>Coba diagram sendiri</span>
        </router-link>
      </div>
    </div>

    <!-- =========================================================
         COMPLETION BANNER
         ========================================================= -->
    <div class="completion-banner">
      <div class="cb-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div class="cb-body">
        <h3>🎉 Anda telah menyelesaikan panduan MiniMermaid!</h3>
        <p>
          Sekarang Anda sudah mengenal 9 tipe diagram, tema, ekspor/impor, editor
          visual, dan semua fitur yang tersedia. Waktunya membangun sesuatu!
        </p>
      </div>
      <router-link to="/playground" class="btn btn-primary">
        Buka Playground
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from '../components/CodeBlock.vue';
import LiveDiagram from '../components/LiveDiagram.vue';

/* =========================================================
   SNIPPETS
   ========================================================= */

const classCode = `[class]
class Kendaraan {
  +String mesin
  +start()
  +stop()
}

class Mobil {
  +int pintu
  +bukaJendela()
}

class Motor {
  +bool adaSideMirror
  +wheelie()
}

Kendaraan <|-- Mobil
Kendaraan <|-- Motor
note for Motor "Motor bisa menyelip\\ndi jalan macet"`;

const stateCode = `[state]
[*] --> Draft : Buat Artikel
Draft --> Review : Kirim ke Editor

Review : Menunggu Persetujuan
Review --> Published : Setujui
Review --> Draft : Revisi

Published : Artikel Tayang
Published --> Archived : Arsipkan
Archived --> [*]`;

const erCode = `[er]
entity User {
  PK id int
  name string
  email string
  created_at timestamp
}

entity Post {
  PK id int
  FK user_id int
  title string
  content text
  published_at timestamp
}

entity Tag {
  PK id int
  name string
}

entity PostTag {
  PK/FK post_id int
  PK/FK tag_id int
}

User 1 -- N Post : menulis
Post 1 -- N PostTag : memiliki
Tag 1 -- N PostTag : dilabeli`;

const integratedExample = `[class]
class Post {
  +int id
  +String title
  +String content
  +PostStatus status
  +publish()
  +archive()
  +reject(reason)
}

class Author {
  +int id
  +String name
  +String email
  +writePost(title, content)
}

Author "1" <|-- "N" Post
note for Post "Lifecycle:\\nDraft → Review → Published → Archived"`;
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
   THREE VIEWS
   ========================================================= */
.three-views {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin: 24px 0 32px;
}

.tv-card {
  padding: 18px 20px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast), transform var(--t-fast);
}
.tv-card:hover {
  border-color: var(--accent-border);
  transform: translateY(-2px);
}

.tv-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
}

.tv-class .tv-icon {
  background: rgba(88, 166, 255, 0.14);
  color: var(--accent);
}
.tv-state .tv-icon {
  background: rgba(163, 113, 247, 0.14);
  color: #a371f7;
}
.tv-er .tv-icon {
  background: rgba(63, 185, 80, 0.14);
  color: var(--success);
}

.tv-card h3 {
  font-size: 14.5px;
  font-weight: 700;
  margin: 0 0 6px;
  color: var(--text-strong);
}
.tv-card p {
  font-size: 12.5px;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
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

.fb-icon-class {
  background: rgba(88, 166, 255, 0.14);
  color: var(--accent);
}
.fb-icon-inherit {
  background: rgba(163, 113, 247, 0.14);
  color: #a371f7;
}
.fb-icon-note {
  background: rgba(210, 153, 34, 0.14);
  color: #d29922;
}
.fb-icon-member {
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
   STATE NOTES
   ========================================================= */
.state-notes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  margin: 16px 0 24px;
}

.sn-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.sn-symbol {
  width: 80px;
  height: 40px;
  display: grid;
  place-items: center;
  color: var(--accent);
  flex-shrink: 0;
}

.sn-card code {
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
.sn-card span {
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.4;
}

/* =========================================================
   ER LEGEND
   ========================================================= */
.er-legend {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  margin: 16px 0 24px;
}

.el-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.el-badge {
  min-width: 46px;
  height: 24px;
  border-radius: 4px;
  border: 1.5px solid;
  background: var(--bg-elevated);
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 800;
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.el-item span {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.4;
}

/* =========================================================
   INTEGRATION FLOW
   ========================================================= */
.integration-flow {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 20px 0 24px;
}

.if-step {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast);
}
.if-step:hover {
  border-color: var(--accent-border);
}

.if-num {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1.5px solid var(--accent-border);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 14px;
}

.if-body h4 {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--text-strong);
}
.if-body p {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
  line-height: 1.55;
}
.if-body code {
  font-size: 11.5px;
  padding: 1px 5px;
}

.if-arrow {
  text-align: center;
  font-size: 20px;
  color: var(--muted-2);
  line-height: 1;
  padding: 4px 0;
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
   COMPLETION BANNER
   ========================================================= */
.completion-banner {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 48px;
  padding: 24px 28px;
  background:
    radial-gradient(ellipse 100% 100% at 0% 0%, rgba(88, 166, 255, 0.1), transparent 60%),
    linear-gradient(135deg, rgba(88, 166, 255, 0.06), rgba(163, 113, 247, 0.06)),
    var(--panel);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}
.completion-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, var(--grid-dot) 1px, transparent 0);
  background-size: 20px 20px;
  opacity: 0.3;
  pointer-events: none;
}

.cb-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--accent), #a371f7);
  color: #ffffff;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow);
  position: relative;
  z-index: 1;
}

.cb-body {
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
}
.cb-body h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--text-strong);
}
.cb-body p {
  font-size: 13.5px;
  color: var(--muted);
  margin: 0;
  line-height: 1.55;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background var(--t-fast), border-color var(--t-fast), transform var(--t-fast);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.btn:hover {
  text-decoration: none;
  transform: translateY(-1px);
}
.btn-primary {
  background: var(--accent);
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(88, 166, 255, 0.3);
}
.btn-primary:hover {
  background: var(--accent-hover);
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 900px) {
  .quick-ref {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
  .three-views,
  .feature-breakdown,
  .state-notes,
  .er-legend {
    grid-template-columns: 1fr;
  }
  .completion-banner {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
}
@media (max-width: 600px) {
  .quick-ref {
    grid-template-columns: 1fr 1fr;
  }
  .next-grid {
    grid-template-columns: 1fr;
  }
  .if-step {
    padding: 14px 16px;
  }
}
</style>