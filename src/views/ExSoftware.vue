<template>
  <div>
    <h1>
      Arsitektur Software
      <span class="badge badge-demo">Studi Kasus</span>
    </h1>
    <p>
      Studi kasus pemodelan arsitektur software modern: <b>Network Graph</b> untuk topologi
      service, <b>Mindmap</b> untuk peta komponen &amp; tanggung jawab, dan
      <b>Sequence Diagram</b> untuk alur komunikasi antar service.
    </p>

    <!-- =========================================================
         QUICK OVERVIEW
         ========================================================= -->
    <div class="quick-ref">
      <div class="qr-item">
        <code>[network]</code>
        <span>Topologi service</span>
      </div>
      <div class="qr-item">
        <code>[mindmap]</code>
        <span>Peta komponen</span>
      </div>
      <div class="qr-item">
        <code>[sequence]</code>
        <span>Alur komunikasi</span>
      </div>
      <div class="qr-item">
        <code>loop ... end</code>
        <span>Blok perulangan</span>
      </div>
      <div class="qr-item">
        <code>A --&gt; B</code>
        <span>Panah sinkron</span>
      </div>
      <div class="qr-item">
        <code>A --&gt;&gt; B</code>
        <span>Panah balasan (dashed)</span>
      </div>
    </div>

    <!-- =========================================================
         SECTION 1: NETWORK GRAPH — TOPOLOGI
         ========================================================= -->
    <h2>
      1. Network Graph — Topologi Service
      <span class="badge badge-feature">Inti Arsitektur</span>
    </h2>
    <p>
      Network Graph memvisualisasikan hubungan antar service dalam sistem. Layout otomatis
      menempatkan service dengan koneksi terbanyak di tengah (hub), dengan service lain
      mengelilingi dalam ring konsentris berdasarkan jarak dari hub.
    </p>

    <CodeBlock language="mermaid" :code="networkCode" />
    <LiveDiagram :code="networkCode" show-toolbar />

    <div class="feature-breakdown">
      <div class="fb-card">
        <div class="fb-icon fb-icon-service">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <div>
          <strong>7 Service</strong>
          <p>Frontend, API, DB, Cache, Queue, Auth, Monitoring</p>
        </div>
      </div>

      <div class="fb-card">
        <div class="fb-icon fb-icon-hub">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div>
          <strong>1 Hub Otomatis</strong>
          <p>Backend API — node dengan koneksi terbanyak</p>
        </div>
      </div>

      <div class="fb-card">
        <div class="fb-icon fb-icon-edge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
        <div>
          <strong>9 Koneksi</strong>
          <p>Berarah &amp; tidak berarah dengan label</p>
        </div>
      </div>

      <div class="fb-card">
        <div class="fb-icon fb-icon-style">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <path d="M18 6L6 18M6 6l12 12" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <div>
          <strong>3 Edge Style</strong>
          <p>Coba toggle toolbar — smooth, step, straight</p>
        </div>
      </div>
    </div>

    <p class="tip">
      <strong>Auto-hub:</strong> node dengan koneksi terbanyak otomatis diletakkan di tengah.
      Ubah urutan deklarasi atau tambah koneksi untuk memindahkan hub.
    </p>

    <!-- =========================================================
         SECTION 2: MINDMAP — PETA KOMPONEN
         ========================================================= -->
    <h2>
      2. Mindmap — Peta Komponen
      <span class="badge badge-new">NEW</span>
    </h2>
    <p>
      Mindmap sempurna untuk memetakan struktur proyek dan tanggung jawab per layer —
      sebelum atau sesudah diagram teknis. Setiap cabang level-1 mewakili "zona" arsitektur
      dengan warna berbeda.
    </p>

    <CodeBlock language="mermaid" :code="mindmapCode" />
    <LiveDiagram :code="mindmapCode" />

    <h3>Menggabungkan dengan Network Graph</h3>
    <p>
      Mindmap cocok untuk <em>bird's-eye view</em> (komponen &amp; tanggung jawab), sedangkan
      network graph cocok untuk <em>topologi runtime</em> (siapa memanggil siapa). Gunakan
      keduanya bersama untuk dokumentasi lengkap.
    </p>

    <!-- =========================================================
         SECTION 3: SEQUENCE — ALUR API
         ========================================================= -->
    <h2>3. Sequence Diagram — Alur API</h2>
    <p>
      Sequence diagram memodelkan urutan waktu interaksi antar service — dari request
      pengguna hingga response. Contoh di bawah adalah alur login dengan caching dan
      loop retry saat API key kedaluwarsa.
    </p>

    <CodeBlock language="mermaid" :code="sequenceCode" />
    <LiveDiagram :code="sequenceCode" show-toolbar />

    <div class="sequence-notes">
      <div class="sn-card">
        <div class="sn-symbol">
          <svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg" width="60" height="20">
            <line x1="5" y1="10" x2="55" y2="10" stroke="currentColor" stroke-width="1.5" />
            <polygon points="55,5 55,15 48,10" fill="currentColor" />
          </svg>
        </div>
        <div>
          <code>--&gt;</code>
          <span>Panah sinkron (solid)</span>
        </div>
      </div>

      <div class="sn-card">
        <div class="sn-symbol">
          <svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg" width="60" height="20">
            <line x1="5" y1="10" x2="55" y2="10" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" />
            <polygon points="55,5 55,15 48,10" fill="currentColor" />
          </svg>
        </div>
        <div>
          <code>--&gt;&gt;</code>
          <span>Panah balasan (dashed)</span>
        </div>
      </div>

      <div class="sn-card">
        <div class="sn-symbol">
          <svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg" width="60" height="20">
            <rect x="5" y="3" width="50" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2" />
            <text x="30" y="13" text-anchor="middle" font-size="8" fill="currentColor" font-family="monospace">loop</text>
          </svg>
        </div>
        <div>
          <code>loop ... end</code>
          <span>Blok perulangan</span>
        </div>
      </div>
    </div>

    <!-- =========================================================
         SECTION 4: SKENARIO KEGAGALAN
         ========================================================= -->
    <h2>4. Sequence — Skenario Kegagalan</h2>
    <p>
      Sequence diagram sangat baik untuk memodelkan <strong>skenario kegagalan</strong> —
      membantu engineer memahami alur error handling. Contoh di bawah menunjukkan alur
      ketika token kedaluwarsa: API mengembalikan 401, frontend mencoba refresh token
      sekali, dan jika gagal juga, redirect ke login.
    </p>

    <CodeBlock language="mermaid" :code="sequenceErrorCode" />
    <LiveDiagram :code="sequenceErrorCode" />

    <!-- =========================================================
         SECTION 5: TIPS
         ========================================================= -->
    <h2>5. Tips untuk Diagram Arsitektur</h2>
    <ul>
      <li>
        <strong>Mulai dari big picture:</strong> gunakan Mindmap atau Network Graph untuk
        overview, lalu zoom-in dengan Sequence untuk alur spesifik.
      </li>
      <li>
        <strong>Satu diagram satu concerns:</strong> jangan campurkan topologi runtime dan
        deployment — pisahkan jadi diagram berbeda.
      </li>
      <li>
        <strong>Label koneksi:</strong> selalu beri label edge network graph (mis.
        <code>REST API</code>, <code>Query</code>, <code>Publish</code>) agar maksud
        hubungan jelas.
      </li>
      <li>
        <strong>Sequence untuk error path:</strong> dokumentasikan skenario gagal
        (timeout, unauthorized, rate limit) — bukan hanya happy path.
      </li>
      <li>
        <strong>Loop untuk retry:</strong> gunakan <code>loop</code> di sequence untuk
        menunjukkan mekanisme retry eksplisit.
      </li>
      <li>
        <strong>Konsisten penamaan:</strong> gunakan nama service yang sama di semua
        diagram (network, mindmap, sequence) untuk keterbacaan lintas dokumen.
      </li>
    </ul>

    <!-- =========================================================
         NEXT STEPS
         ========================================================= -->
    <div class="next-steps">
      <h3>Contoh Proyek Lainnya</h3>
      <div class="next-grid">
        <router-link to="/examples/ecommerce" class="next-card">
          <strong>Alur E-Commerce →</strong>
          <span>Swimlane + Timeline</span>
        </router-link>
        <router-link to="/examples/uml" class="next-card">
          <strong>Desain Sistem (UML) →</strong>
          <span>Class, State &amp; ER Diagram</span>
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

const networkCode = `[network]
fe : "Frontend (React)"
be : "Backend API"
db : "PostgreSQL"
cache : "Redis Cache"
queue : "RabbitMQ"
auth : "Auth Service"
monitor : "Monitoring"

fe --- be : "REST API"
be --> db : "Baca/Tulis"
be --> cache : "Caching"
be --> queue : "Publish Event"
be --> auth : "Validasi Token"
auth --> db : "Cek User"
queue --> monitor : "Metrics"
be --> monitor : "Log & Trace"
fe --> monitor : "Analytics"`;

const mindmapCode = `[mindmap]
E-Commerce Platform
  Frontend
    React SPA
    Mobile App (React Native)
    Admin Dashboard
  Backend Services
    Product Service
    Order Service
    Payment Service
    Notification Service
  Data Layer
    PostgreSQL
    Redis Cache
    Elasticsearch
  Infrastructure
    Kubernetes
    CI/CD Pipeline
    Monitoring Stack`;

const sequenceCode = `[sequence]
participant Klien
participant API
participant Cache
participant DB
participant Auth

Klien -> API: POST /login
API -> Cache: Cek rate limit
Cache --> API: OK (5 req/menit)

API -> DB: SELECT * FROM users
DB --> API: User record
API -> Auth: Verify password
Auth --> API: Valid

API --> Klien: 200 OK + JWT

loop Refresh profile
  Klien -> API: GET /profile
  API -> Cache: Cek cache
  Cache --> API: HIT
  API --> Klien: 200 OK (cached)
end`;

const sequenceErrorCode = `[sequence]
participant Frontend
participant API
participant Auth

Frontend -> API: GET /protected
API -> Auth: Validasi token
Auth --> API: Token expired (401)
API --> Frontend: 401 Unauthorized

Frontend -> Auth: Refresh token
Auth --> Frontend: Refresh gagal

Frontend --> Frontend: Redirect ke /login`;
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

.fb-icon-service {
  background: rgba(88, 166, 255, 0.14);
  color: var(--accent);
}
.fb-icon-hub {
  background: rgba(163, 113, 247, 0.14);
  color: #a371f7;
}
.fb-icon-edge {
  background: rgba(210, 153, 34, 0.14);
  color: #d29922;
}
.fb-icon-style {
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
   SEQUENCE NOTES
   ========================================================= */
.sequence-notes {
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
  width: 70px;
  height: 30px;
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
  .sequence-notes {
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