<template>
  <div class="playground-page">
    <!-- ==================== HEADER ==================== -->
    <header class="pg-header">
      <h1>Live Playground</h1>
      <p>
        Ubah kode di kiri, diagram ter-render otomatis di kanan. Kode tersimpan otomatis
        di browser Anda — refresh tidak akan hilang.
      </p>
    </header>

    <!-- ==================== TOOLBAR ==================== -->
    <div class="pg-toolbar">
      <div class="pg-toolbar-group">
        <label for="pg-preset">Contoh</label>
        <select id="pg-preset" v-model="selectedPreset" class="pg-select">
          <option value="">— Pilih tipe —</option>
          <option v-for="p in presets" :key="p.key" :value="p.key">{{ p.label }}</option>
        </select>
      </div>

      <div class="pg-toolbar-group">
        <label for="pg-edge">Edge</label>
        <select id="pg-edge" v-model="edgeStyle" class="pg-select">
          <option value="smooth">Smooth</option>
          <option value="step">Step</option>
          <option value="straight">Straight</option>
        </select>
      </div>

      <div class="pg-toolbar-group">
        <button
          class="pg-btn"
          :title="`Tema diagram: ${renderTheme === 'dark' ? 'Gelap' : 'Terang'}`"
          @click="toggleRenderTheme"
        >
          <svg v-if="renderTheme === 'dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <span>{{ renderTheme === 'dark' ? 'Terang' : 'Gelap' }}</span>
        </button>
      </div>

      <div class="pg-toolbar-spacer"></div>

      <div class="pg-toolbar-group pg-actions">
        <button class="pg-btn" title="Salin SVG ke clipboard" @click="copySvg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span class="pg-btn-label">Copy</span>
        </button>

        <button class="pg-btn" title="Unduh SVG" @click="downloadSvg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          <span class="pg-btn-label">SVG</span>
        </button>

        <button class="pg-btn" title="Unduh PNG" @click="downloadPng">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span class="pg-btn-label">PNG</span>
        </button>

        <button class="pg-btn pg-btn-primary" title="Bagikan URL (Ctrl+S)" @click="share">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span class="pg-btn-label">Share</span>
        </button>
      </div>
    </div>

    <!-- ==================== SPLIT ==================== -->
    <div class="pg-split">
      <!-- Editor pane -->
      <div class="pg-pane">
        <div class="pg-pane-header">
          <span class="pg-pane-label">Kode</span>
          <span class="pg-pane-meta">{{ lineCount }} baris · {{ code.length }} karakter</span>
        </div>
        <textarea
          v-model="code"
          spellcheck="false"
          autocomplete="off"
          autocapitalize="off"
          placeholder="Tulis kode diagram di sini..."
        ></textarea>
      </div>

      <!-- Preview pane -->
      <div class="pg-pane" :data-preview-theme="renderTheme">
        <div class="pg-pane-header">
          <span class="pg-pane-label">Preview</span>
          <span v-if="errors.length === 0" class="pg-pane-status ok">✓ {{ detectedType }}</span>
          <span v-else class="pg-pane-status err">⚠ {{ errors.length }} error</span>
        </div>
        <div ref="canvasEl" class="pg-canvas"></div>
      </div>
    </div>

    <!-- ==================== ERRORS ==================== -->
    <div v-if="errors.length > 0" class="pg-errors">
      <div class="pg-errors-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span>{{ errors.length }} error sintaks</span>
      </div>
      <ul>
        <li v-for="(err, i) in errors" :key="i">{{ err }}</li>
      </ul>
    </div>

    <!-- ==================== HINTS ==================== -->
    <div class="pg-hints">
      <span>
        <kbd>Ctrl</kbd>+<kbd>S</kbd> share
        · <kbd>Ctrl</kbd>+<kbd>Enter</kbd> render ulang
      </span>
    </div>

    <!-- ==================== TOAST ==================== -->
    <Transition name="pg-toast">
      <div v-if="toastMsg" class="pg-toast" :class="{ err: toastErr }">{{ toastMsg }}</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import MiniMermaid from 'minimermaid';

/* =========================================================
   TIPE
   ========================================================= */
type EdgeStyleName = 'smooth' | 'step' | 'straight';
type ThemeName = 'dark' | 'light';

const STORAGE_KEY = 'mm-playground-source';

/* =========================================================
   PRESETS — 9 tipe diagram
   ========================================================= */
interface Preset {
  key: string;
  label: string;
  code: string;
}

const presets: Preset[] = [
  {
    key: 'flowchart',
    label: 'Flowchart',
    code: `[horizontal]
[group "Sistem Autentikasi"]
  [cabang]->[diamond:orange]->text["Cek *Kredensial*?"]
    ->ya["Valid"]
      ->[round:green]->text["Login **Sukses**"]->node
      ->[square]->text["Dashboard Admin"]
    ->tidak["Invalid"]
      ->[square:red]->text["Akses Ditolak"]`,
  },
  {
    key: 'swimlane',
    label: 'Swimlane',
    code: `[horizontal]

[lane "Pelanggan"]
  ->[round]->text["Mulai"]->node
  ->[square]->icon["shopping-cart"]->text["Pesan Barang"]->node
  ->[square:green]->icon["package-check"]->text["Terima Barang"]

[lane "Sistem"]
  [cabang]->[diamond]->icon["credit-card"]->text["Pembayaran?"]
    ->ya["Lunas"]
      ->[square]->icon["check-circle"]->text["Validasi"]->node
      ->[square]->icon["truck"]->text["Pilih Kurir"]
    ->tidak["Gagal"]
      ->[square:red]->text["Batalkan"]`,
  },
  {
    key: 'sequence',
    label: 'Sequence',
    code: `[sequence]
participant Pengguna
participant API
participant Database

Pengguna -> API: POST /login
API -> Database: SELECT * FROM users
Database --> API: Data User
API --> Pengguna: 200 OK (JWT)

loop Refresh
  Pengguna -> API: GET /profile
  API --> Pengguna: Data Profil
end`,
  },
  {
    key: 'class',
    label: 'Class (UML)',
    code: `[class]
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
note for Motor "Motor bisa menyelip di jalan macet"`,
  },
  {
    key: 'state',
    label: 'State',
    code: `[state]
[*] --> Draft : Buat Artikel
Draft --> Review : Kirim Editor

Review : Menunggu Persetujuan
Review --> Published : Setujui
Review --> Draft : Revisi

Published : Artikel Tayang
Published --> Archived : Arsipkan
Archived --> [*]`,
  },
  {
    key: 'network',
    label: 'Network',
    code: `[network]
be : "Backend API"
fe : "Frontend (React)"
db : "Database SQL"
cache : "Redis Cache"
queue : "RabbitMQ"

fe --- be : "REST API"
be --> db : "Baca/Tulis"
be --> cache : "Caching"
be --> queue : "Publish Event"`,
  },
  {
    key: 'er',
    label: 'ER Diagram',
    code: `[er]
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
Tag 1 -- N PostTag : dilabeli`,
  },
  {
    key: 'mindmap',
    label: 'Mindmap',
    code: `[mindmap]
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
  Launch`,
  },
  {
    key: 'timeline',
    label: 'Timeline',
    code: `[timeline]
title : Sejarah MiniMermaid
2020 : Peluncuran Beta : 500 pengguna awal
2021 : Rilis 1.0 : 10K pengguna
2022 : Ekspansi Asia : Kantor di Singapura
2023 : Series A : $5M
2024 : Rilis 2.0`,
  },
];

const DEFAULT_CODE = presets[0]!.code;

/* =========================================================
   HELPER — hash / theme / localStorage
   ========================================================= */
function decodeHashSource(): string | null {
  if (!location.hash.startsWith('#d=')) return null;
  try {
    const encoded = location.hash.slice(3);
    const b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

function encodeSource(src: string): string {
  const bytes = new TextEncoder().encode(src);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function readGlobalTheme(): ThemeName {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

function getInitialCode(): string {
  const fromHash = decodeHashSource();
  if (fromHash) return fromHash;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
  } catch { /* ignore */ }
  return DEFAULT_CODE;
}

/* =========================================================
   STATE
   ========================================================= */
const code = ref<string>(getInitialCode());
const canvasEl = ref<HTMLElement | null>(null);
const errors = ref<string[]>([]);
const selectedPreset = ref<string>('');
const edgeStyle = ref<EdgeStyleName>('smooth');
const renderTheme = ref<ThemeName>(readGlobalTheme());

const toastMsg = ref<string>('');
const toastErr = ref<boolean>(false);
let toastTimer: number | null = null;

const lineCount = computed(() => code.value.split('\n').length);

const detectedType = computed(() => {
  const first = code.value.trim().toLowerCase();
  if (first.startsWith('[sequence]')) return 'Sequence';
  if (first.startsWith('[class]')) return 'Class (UML)';
  if (first.startsWith('[state]')) return 'State';
  if (first.startsWith('[network]')) return 'Network';
  if (first.startsWith('[er]')) return 'ER Diagram';
  if (first.startsWith('[mindmap]')) return 'Mindmap';
  if (first.startsWith('[timeline]')) return 'Timeline';
  return 'Flowchart';
});

/* =========================================================
   TOAST
   ========================================================= */
function showToast(msg: string, isErr = false): void {
  toastMsg.value = msg;
  toastErr.value = isErr;
  if (toastTimer !== null) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastMsg.value = '';
    toastTimer = null;
  }, 2200);
}

/* =========================================================
   RENDER
   ========================================================= */
let frameId: number | null = null;

function scheduleRender(): void {
  if (frameId !== null) return;
  frameId = requestAnimationFrame(() => {
    frameId = null;
    renderDiagram();
  });
}

function renderDiagram(): void {
  if (!canvasEl.value) return;

  try {
    const result = MiniMermaid.render(code.value, {
      edgeStyle: edgeStyle.value,
      themeName: renderTheme.value,
      getIcon: MiniMermaid.getLucideIcon,
    });
    canvasEl.value.innerHTML = result.svg;
    errors.value = result.errors;
  } catch (err) {
    console.error('MiniMermaid render error:', err);
    errors.value = [(err as Error).message || 'Render gagal'];
    canvasEl.value.innerHTML = '';
  }
}

/* =========================================================
   ACTIONS
   ========================================================= */
async function copySvg(): Promise<void> {
  const svg = canvasEl.value?.querySelector('svg');
  if (!svg) {
    showToast('Tidak ada SVG untuk disalin', true);
    return;
  }
  try {
    await navigator.clipboard.writeText(svg.outerHTML);
    showToast('SVG disalin ✓');
  } catch {
    showToast('Gagal menyalin SVG', true);
  }
}

function downloadSvg(): void {
  const svg = canvasEl.value?.querySelector('svg');
  if (!svg) {
    showToast('Tidak ada SVG untuk diunduh', true);
    return;
  }
  let str = svg.outerHTML;
  if (!str.includes('xmlns="http://www.w3.org/2000/svg"')) {
    str = str.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  }
  const blob = new Blob([str], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'diagram.svg';
  a.click();
  URL.revokeObjectURL(url);
  showToast('SVG diunduh ✓');
}

function downloadPng(): void {
  const svgEl = canvasEl.value?.querySelector('svg') as SVGSVGElement | null;
  if (!svgEl) {
    showToast('Tidak ada SVG untuk diunduh', true);
    return;
  }

  let svgString = svgEl.outerHTML;
  if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
    svgString = svgString.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  }

  const viewBoxStr = svgEl.getAttribute('viewBox') || '0 0 800 600';
  const [, , vbW, vbH] = viewBoxStr.split(' ').map(Number);
  if (!vbW || !vbH) {
    showToast('ViewBox tidak valid', true);
    return;
  }

  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = vbW * scale;
  canvas.height = vbH * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    showToast('Canvas tidak didukung', true);
    return;
  }

  ctx.fillStyle = renderTheme.value === 'light' ? '#ffffff' : '#0d1117';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    const pngUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = 'diagram.png';
    a.click();
    showToast('PNG diunduh ✓');
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    showToast('Gagal membuat PNG', true);
  };
  img.src = url;
}

async function share(): Promise<void> {
  const encoded = encodeSource(code.value);
  const base = location.href.split('#')[0];
  const shareUrl = `${base}#d=${encoded}`;
  try {
    await navigator.clipboard.writeText(shareUrl);
    showToast('URL disalin ke clipboard ✓');
  } catch {
    prompt('Salin URL berikut:', shareUrl);
  }
}

function toggleRenderTheme(): void {
  renderTheme.value = renderTheme.value === 'dark' ? 'light' : 'dark';
}

/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */
function handleKeydown(e: KeyboardEvent): void {
  const mod = e.ctrlKey || e.metaKey;
  if (!mod) return;

  if (e.key === 's' || e.key === 'S') {
    e.preventDefault();
    void share();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    renderDiagram();
    showToast('Dirender ulang ✓');
  }
}

/* =========================================================
   LIFECYCLE
   ========================================================= */
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  nextTick(renderDiagram);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (frameId !== null) cancelAnimationFrame(frameId);
  if (toastTimer !== null) window.clearTimeout(toastTimer);
  if (saveTimer !== null) window.clearTimeout(saveTimer);
});

/* =========================================================
   WATCHERS
   ========================================================= */
let saveTimer: number | null = null;

watch(code, () => {
  scheduleRender();

  // Debounced save ke localStorage
  if (saveTimer !== null) window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, code.value);
    } catch { /* quota / disabled */ }
    saveTimer = null;
  }, 500);
});

watch([edgeStyle, renderTheme], () => scheduleRender());

watch(selectedPreset, (val) => {
  if (!val) return;
  const p = presets.find((x) => x.key === val);
  if (p) {
    code.value = p.code;
    selectedPreset.value = '';
  }
});
</script>

<style scoped>
/* =========================================================
   FULL-WIDTH LAYOUT
   ========================================================= */
.playground-page {
  max-width: none;
  position: relative;
}

/* =========================================================
   HEADER
   ========================================================= */
.pg-header {
  margin-bottom: 20px;
}
.pg-header h1 {
  margin-bottom: 6px;
}
.pg-header p {
  color: var(--muted);
  font-size: 15px;
  margin: 0 0 0;
  max-width: 72ch;
}

/* =========================================================
   TOOLBAR
   ========================================================= */
.pg-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: 12px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.pg-toolbar-group {
  display: flex;
  align-items: center;
  gap: 6px;
}
.pg-toolbar-group label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.pg-toolbar-spacer {
  flex: 1;
  min-width: 8px;
}

.pg-select {
  background: var(--panel-2);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 5px 8px;
  font-size: 12.5px;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: border-color var(--t-fast);
}
.pg-select:hover { border-color: var(--accent-border); }
.pg-select:focus { border-color: var(--accent); }

.pg-actions {
  gap: 6px;
}

.pg-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background: var(--panel-2);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
}
.pg-btn:hover {
  background: var(--bg-elevated);
  border-color: var(--accent-border);
  color: var(--accent);
}

.pg-btn-primary {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}
.pg-btn-primary:hover {
  background: var(--accent-hover);
  color: #ffffff;
  border-color: var(--accent-hover);
}

/* =========================================================
   SPLIT
   ========================================================= */
.pg-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  height: 60vh;
  min-height: 480px;
  max-height: 800px;
  margin-bottom: 12px;
}

.pg-pane {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.pg-pane-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  background: var(--panel-2);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.pg-pane-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.pg-pane-meta {
  font-size: 11.5px;
  color: var(--muted-2);
  font-family: var(--font-mono);
}

.pg-pane-status {
  font-size: 11.5px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}
.pg-pane-status.ok {
  color: var(--success);
  background: rgba(63, 185, 80, 0.1);
  border: 1px solid rgba(63, 185, 80, 0.3);
}
.pg-pane-status.err {
  color: var(--danger);
  background: rgba(248, 81, 73, 0.1);
  border: 1px solid rgba(248, 81, 73, 0.3);
}

.pg-pane textarea {
  flex: 1;
  width: 100%;
  min-height: 0;
  resize: none;
  background: transparent;
  color: var(--text);
  border: 0;
  outline: none;
  padding: 14px 16px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.65;
  tab-size: 2;
}

.pg-canvas {
  flex: 1;
  min-height: 0;
  padding: 20px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: radial-gradient(circle at 1px 1px, var(--grid-dot) 1px, transparent 0);
  background-size: 20px 20px;
  transition: background-color var(--t-normal);
}

/* Preview theme override — independen dari tema UI */
.pg-pane[data-preview-theme="dark"] .pg-canvas {
  background-color: #0d1117;
}
.pg-pane[data-preview-theme="light"] .pg-canvas {
  background-color: #ffffff;
  background-image: radial-gradient(circle at 1px 1px, #d8dee4 1px, transparent 0);
}

.pg-canvas :deep(svg) {
  width: 100%;
  height: auto;
  max-width: 100%;
  display: block;
}

/* =========================================================
   ERRORS
   ========================================================= */
.pg-errors {
  padding: 12px 16px;
  background: rgba(248, 81, 73, 0.08);
  border: 1px solid rgba(248, 81, 73, 0.35);
  border-radius: var(--radius);
  color: var(--danger);
  font-size: 12.5px;
  font-family: var(--font-mono);
  margin-bottom: 12px;
}
.pg-errors-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  margin-bottom: 6px;
}
.pg-errors ul {
  margin: 0;
  padding-left: 20px;
  color: var(--text);
  font-family: var(--font-mono);
}
.pg-errors li {
  margin: 2px 0;
  font-size: 12px;
  line-height: 1.5;
}
.pg-errors li::marker { color: var(--danger); }

/* =========================================================
   HINTS
   ========================================================= */
.pg-hints {
  padding: 10px 12px;
  font-size: 11.5px;
  color: var(--muted-2);
}
.pg-hints kbd {
  display: inline-block;
  background: var(--panel-2);
  border: 1px solid var(--border);
  border-bottom-width: 2px;
  border-radius: 4px;
  padding: 1px 6px;
  margin: 0 2px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: var(--text);
  line-height: 1.4;
  min-width: 18px;
  text-align: center;
}

/* =========================================================
   TOAST
   ========================================================= */
.pg-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 18px;
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--success);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  pointer-events: none;
}
.pg-toast.err {
  border-color: var(--danger);
  color: var(--danger);
}

.pg-toast-enter-active,
.pg-toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.pg-toast-enter-from,
.pg-toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(12px);
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 1100px) {
  .pg-btn-label { display: none; }
  .pg-btn { padding: 5px 8px; }
}

@media (max-width: 900px) {
  .pg-split {
    grid-template-columns: 1fr;
    height: auto;
    max-height: none;
  }
  .pg-pane {
    min-height: 360px;
    height: 42vh;
  }
}

@media (max-width: 600px) {
  .pg-toolbar {
    padding: 8px 10px;
    gap: 6px;
  }
  .pg-toolbar-group label {
    display: none;
  }
  .pg-hints {
    text-align: center;
  }
}
</style>