<template>
  <div>
    <h1>
      Tema &amp; Warna
      <span class="badge badge-new">NEW</span>
    </h1>
    <p>
      MiniMermaid mendukung tema <strong>gelap</strong> dan <strong>terang</strong> dengan
      palet warna terpisah untuk kontras optimal. Warna di-<em>bake</em> langsung ke markup
      SVG — ekspor PNG/SVG selalu konsisten di luar konteks CSS halaman.
    </p>

    <!-- =========================================================
         QUICK REFERENCE
         ========================================================= -->
    <div class="quick-ref">
      <div class="qr-item">
        <code>themeName: 'dark'</code>
        <span>Tema gelap (default)</span>
      </div>
      <div class="qr-item">
        <code>themeName: 'light'</code>
        <span>Tema terang</span>
      </div>
      <div class="qr-item">
        <code>[square:red]</code>
        <span>Warna custom per-node</span>
      </div>
      <div class="qr-item">
        <code>[diamond:#ff5722]</code>
        <span>Hex color per-node</span>
      </div>
      <div class="qr-item">
        <code>THEMES.dark</code>
        <span>Objek palet dark</span>
      </div>
      <div class="qr-item">
        <code>THEMES.light</code>
        <span>Objek palet light</span>
      </div>
    </div>

    <!-- =========================================================
         1. TEMA DARK vs LIGHT
         ========================================================= -->
    <h2>1. Tema Dark vs Light</h2>
    <p>
      Pilih tema via opsi <code>themeName</code> saat memanggil
      <code>MiniMermaid.render()</code> / <code>renderTo()</code>. Default: <code>dark</code>.
      Aplikasi Playground menyediakan tombol toggle dan shortcut
      <code>Ctrl + Shift + L</code>.
    </p>

    <div class="theme-compare">
      <div class="theme-demo dark-demo">
        <div class="td-header">
          <span class="td-label">Dark (default)</span>
          <code>themeName: 'dark'</code>
        </div>
        <div class="td-canvas">
          <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="100" fill="#0d1117"/>
            <rect x="20" y="35" width="70" height="30" rx="15" fill="#58a6ff28" stroke="#58a6ff" stroke-width="2"/>
            <text x="55" y="55" text-anchor="middle" font-family="ui-sans-serif" font-size="12" font-weight="500" fill="#e6edf3">Mulai</text>
            <path d="M90,50 L130,50" stroke="#7d8590" stroke-width="2"/>
            <polygon points="130,44 140,50 130,56" fill="#7d8590"/>
            <rect x="140" y="35" width="50" height="30" rx="4" fill="#3fb95028" stroke="#3fb950" stroke-width="2"/>
            <text x="165" y="55" text-anchor="middle" font-family="ui-sans-serif" font-size="12" font-weight="500" fill="#e6edf3">Selesai</text>
          </svg>
        </div>
      </div>

      <div class="theme-demo light-demo">
        <div class="td-header">
          <span class="td-label">Light</span>
          <code>themeName: 'light'</code>
        </div>
        <div class="td-canvas">
          <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="100" fill="#ffffff"/>
            <rect x="20" y="35" width="70" height="30" rx="15" fill="#0969da28" stroke="#0969da" stroke-width="2"/>
            <text x="55" y="55" text-anchor="middle" font-family="ui-sans-serif" font-size="12" font-weight="500" fill="#1f2328">Mulai</text>
            <path d="M90,50 L130,50" stroke="#656d76" stroke-width="2"/>
            <polygon points="130,44 140,50 130,56" fill="#656d76"/>
            <rect x="140" y="35" width="50" height="30" rx="4" fill="#1a7f3728" stroke="#1a7f37" stroke-width="2"/>
            <text x="165" y="55" text-anchor="middle" font-family="ui-sans-serif" font-size="12" font-weight="500" fill="#1f2328">Selesai</text>
          </svg>
        </div>
      </div>
    </div>

    <CodeBlock language="javascript" :code="themeUsage" />

    <p class="tip">
      <strong>Kapan pakai mana?</strong> Gelap cocok untuk aplikasi developer &amp;
      presentasi dark mode. Terang ideal untuk dokumen, cetak, dan embed di web terang.
      Keduanya menjaga kontras WCAG AA.
    </p>

    <!-- =========================================================
         2. PALET DEFAULT
         ========================================================= -->
    <h2>2. Palet Default</h2>
    <p>
      Setiap node mendapat warna dari palette secara bergilir
      (<code>palette[i % palette.length]</code>). Terdapat <strong>8 warna</strong> per tema
      yang dirancang untuk kontras tinggi dan harmoni visual.
    </p>

    <div class="palette-compare">
      <div class="palette-col">
        <h4>
          <span class="pc-dot dark-dot"></span>
          Dark Palette
        </h4>
        <div class="swatch-list">
          <div
            v-for="(c, i) in darkPalette"
            :key="'d' + i"
            class="swatch"
          >
            <div class="swatch-color" :style="{ background: c.color }"></div>
            <div class="swatch-info">
              <code>{{ c.color }}</code>
              <span>{{ c.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="palette-col">
        <h4>
          <span class="pc-dot light-dot"></span>
          Light Palette
        </h4>
        <div class="swatch-list">
          <div
            v-for="(c, i) in lightPalette"
            :key="'l' + i"
            class="swatch"
          >
            <div class="swatch-color" :style="{ background: c.color }"></div>
            <div class="swatch-info">
              <code>{{ c.color }}</code>
              <span>{{ c.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p>
      Palet dapat diakses via <code>THEMES.dark.palette</code> /
      <code>THEMES.light.palette</code> — array string hex. Anda bisa override per-node
      menggunakan warna custom (lihat section 3).
    </p>

    <!-- =========================================================
         3. WARNA CUSTOM PER-NODE
         ========================================================= -->
    <h2>3. Warna Custom per-Node</h2>
    <p>
      Tambahkan <code>:warna</code> di bracket bentuk. Menerima CSS named color
      (<code>red</code>, <code>green</code>), hex (<code>#ff5722</code>), atau
      <code>rgb(...)</code>. Warna custom menimpa palette default.
    </p>

    <CodeBlock language="mermaid" :code="customColorSyntax" />
    <LiveDiagram :code="customColorSyntax" />

    <p>
      <strong>Semantik warna:</strong> warna custom berguna untuk menyampaikan makna —
      hijau = sukses, merah = error/gagal, kuning = warning, biru = info.
    </p>

    <CodeBlock language="mermaid" :code="semanticColors" />
    <LiveDiagram :code="semanticColors" />

    <!-- =========================================================
         4. STRUKTUR THEMECOLORS
         ========================================================= -->
    <h2>4. Struktur <code>ThemeColors</code></h2>
    <p>
      Setiap tema adalah objek <code>ThemeColors</code> dengan 22 slot warna. Anda bisa
      membuat tema custom dengan menduplikasi salah satu dan meng-override field tertentu.
    </p>

    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Kegunaan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="f in themeFields" :key="f.name">
          <td><code>{{ f.name }}</code></td>
          <td class="muted">{{ f.desc }}</td>
        </tr>
      </tbody>
    </table>

    <CodeBlock language="typescript" :code="customThemeCode" />

    <!-- =========================================================
         5. CSS VARIABLE (UI)
         ========================================================= -->
    <h2>5. CSS Variable (UI Layer)</h2>
    <p>
      Warna UI (header, sidebar, editor, modal) memakai <strong>CSS variable</strong> yang
      aktif via selector <code>[data-theme="..."]</code> di <code>&lt;html&gt;</code>.
      Berbeda dari warna SVG yang di-<em>bake</em>, CSS variable bisa berubah instan tanpa
      re-render.
    </p>

    <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Dark</th>
          <th>Light</th>
          <th>Fungsi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="v in cssVars" :key="v.name">
          <td><code>{{ v.name }}</code></td>
          <td>
            <span class="inline-color" :style="{ background: v.dark }"></span>
            <code class="mini">{{ v.dark }}</code>
          </td>
          <td>
            <span class="inline-color" :style="{ background: v.light }"></span>
            <code class="mini">{{ v.light }}</code>
          </td>
          <td class="muted">{{ v.desc }}</td>
        </tr>
      </tbody>
    </table>

    <p>
      Untuk toggle tema pada UI, cukup set atribut pada root:
    </p>

    <CodeBlock language="javascript" :code="cssToggleCode" />

    <!-- =========================================================
         6. EKSPOR & KONSISTENSI
         ========================================================= -->
    <h2>6. Ekspor &amp; Konsistensi</h2>
    <p>
      Karena warna SVG di-<em>bake</em> ke markup, hasil ekspor <strong>selalu konsisten</strong>
      dengan tema aktif saat ekspor — tidak bergantung pada CSS halaman.
    </p>

    <div class="export-grid">
      <div class="export-card">
        <div class="export-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
        </div>
        <h4>SVG</h4>
        <p>File <code>.svg</code> standalone — buka di browser, Figma, atau Illustrator. Warna sudah embed di markup.</p>
      </div>
      <div class="export-card">
        <div class="export-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
          </svg>
        </div>
        <h4>PNG</h4>
        <p>Render ke canvas dengan background sesuai <code>theme.canvasBg</code> — hasil transparan konsisten, tidak ada "kotak hitam".</p>
      </div>
      <div class="export-card">
        <div class="export-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
            <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </div>
        <h4>Copy SVG</h4>
        <p>Salin markup ke clipboard — paste di HTML/CMS apa saja, warna tetap seperti di preview.</p>
      </div>
    </div>

    <p class="tip">
      <strong>Penting:</strong> jika Anda meng-embed SVG ke halaman dengan tema berbeda
      (mis. SVG dark di web terang), SVG akan tetap tampil dengan warna dark-nya. Ini
      <em>by design</em> — ekspor adalah "snapshot" yang self-contained.
    </p>

    <!-- =========================================================
         7. TIPS
         ========================================================= -->
    <h2>7. Tips</h2>
    <ul>
      <li>
        <strong>Palette otomatis:</strong> biarkan library memilih warna per node. Override
        hanya saat ada semantik khusus (sukses/gagal/warning).
      </li>
      <li>
        <strong>Konsistensi:</strong> gunakan setidaknya 2–3 warna semantik yang sama di
        seluruh diagram dalam satu project.
      </li>
      <li>
        <strong>Kontras:</strong> jika override dengan warna sangat terang
        (<code>yellow</code>), teks node tetap <code>--nodeText</code> — pastikan tetap
        terbaca. Untuk warna sangat gelap, teks terang juga aman.
      </li>
      <li>
        <strong>Ekspor lintas tema:</strong> jika diagram akan dipakai di web terang
        <em>dan</em> gelap, buat 2 versi ekspor (satu dark, satu light) — warna SVG tidak
        berubah otomatis.
      </li>
      <li>
        <strong>Custom theme:</strong> untuk white-label, duplikasi <code>THEMES.dark</code>
        dan override field tertentu (mis. <code>palette</code> dengan brand colors).
      </li>
    </ul>

    <!-- =========================================================
         NEXT STEPS
         ========================================================= -->
    <div class="next-steps">
      <h3>Selanjutnya</h3>
      <div class="next-grid">
        <router-link to="/api" class="next-card">
          <strong>API Reference →</strong>
          <span>Semua opsi &amp; signature</span>
        </router-link>
        <router-link to="/playground" class="next-card">
          <strong>Playground →</strong>
          <span>Coba tema langsung</span>
        </router-link>
        <router-link to="/about" class="next-card">
          <strong>Tentang Proyek →</strong>
          <span>Roadmap &amp; kontribusi</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from '../components/CodeBlock.vue';
import LiveDiagram from '../components/LiveDiagram.vue';

/* =========================================================
   PALET DATA
   ========================================================= */
const darkPalette = [
  { color: '#58a6ff', name: 'Biru' },
  { color: '#a371f7', name: 'Ungu' },
  { color: '#3fb950', name: 'Hijau' },
  { color: '#d29922', name: 'Kuning' },
  { color: '#f778ba', name: 'Pink' },
  { color: '#39c5cf', name: 'Cyan' },
  { color: '#ff7b72', name: 'Merah Muda' },
  { color: '#bc8cff', name: 'Lavender' },
];

const lightPalette = [
  { color: '#0969da', name: 'Biru' },
  { color: '#8250df', name: 'Ungu' },
  { color: '#1a7f37', name: 'Hijau' },
  { color: '#9a6700', name: 'Kuning' },
  { color: '#bf3989', name: 'Pink' },
  { color: '#1b7c83', name: 'Cyan' },
  { color: '#cf222e', name: 'Merah' },
  { color: '#6639ba', name: 'Lavender' },
];

/* =========================================================
   THEME FIELDS
   ========================================================= */
const themeFields = [
  { name: 'canvasBg',      desc: 'Background kanvas (dipakai untuk PNG export)' },
  { name: 'nodeText',      desc: 'Teks label node' },
  { name: 'nodeCodeText',  desc: 'Teks inline code di label (`...`)' },
  { name: 'iconStroke',    desc: 'Stroke ikon Lucide di node' },
  { name: 'edgeStroke',    desc: 'Garis panah & marker' },
  { name: 'edgeLabelBg',   desc: 'Background label edge' },
  { name: 'edgeLabelText', desc: 'Teks label edge' },
  { name: 'groupStroke',   desc: 'Border kotak [group]' },
  { name: 'groupFill',     desc: 'Fill kotak [group]' },
  { name: 'groupText',     desc: 'Label kotak [group]' },
  { name: 'laneFill',      desc: 'Fill kotak swimlane' },
  { name: 'laneHeader',    desc: 'Header swimlane' },
  { name: 'laneStroke',    desc: 'Border swimlane' },
  { name: 'laneText',      desc: 'Teks header swimlane' },
  { name: 'classFill',     desc: 'Fill kotak class/ER' },
  { name: 'classStroke',   desc: 'Border kotak class/ER' },
  { name: 'classTitle',    desc: 'Teks judul class/ER' },
  { name: 'classBody',     desc: 'Teks body class/ER' },
  { name: 'noteFill',      desc: 'Fill catatan UML' },
  { name: 'noteStroke',    desc: 'Border catatan UML' },
  { name: 'noteText',      desc: 'Teks catatan UML' },
  { name: 'palette',       desc: 'Array warna default node (8 warna)' },
];

/* =========================================================
   CSS VARS
   ========================================================= */
const cssVars = [
  { name: '--bg',       dark: '#0a0e14', light: '#ffffff', desc: 'Background halaman' },
  { name: '--panel',    dark: '#131922', light: '#f6f8fa', desc: 'Panel & card' },
  { name: '--border',   dark: '#262d3a', light: '#d8dee4', desc: 'Border default' },
  { name: '--text',     dark: '#e6edf3', light: '#1f2328', desc: 'Teks utama' },
  { name: '--muted',    dark: '#8b949e', light: '#57606a', desc: 'Teks sekunder' },
  { name: '--accent',   dark: '#58a6ff', light: '#0969da', desc: 'Warna aksen' },
  { name: '--success',  dark: '#3fb950', light: '#1a7f37', desc: 'Semantik sukses' },
  { name: '--danger',   dark: '#f85149', light: '#cf222e', desc: 'Semantik error' },
];

/* =========================================================
   SNIPPETS
   ========================================================= */
const themeUsage = `import MiniMermaid from 'minimermaid';

// Dark (default)
MiniMermaid.renderTo('#dark', kode, {
  themeName: 'dark',
});

// Light
MiniMermaid.renderTo('#light', kode, {
  themeName: 'light',
});

// Atau via objek ThemeColors langsung
import { THEMES } from 'minimermaid';
MiniMermaid.renderTo('#custom', kode, {
  theme: THEMES.light,
});`;

const customColorSyntax = `->[round:green]->text["Sukses"]
->[square:red]->text["Error"]
->[diamond:#ff5722]->text["Warning"]
->[hexagon:purple]->text["Info"]`;

const semanticColors = `->[round:green]->text["✓ Valid"]
->[square:red]->text["✗ Gagal"]
->[diamond:#d29922]->text["⚠ Perlu Review"]
->[square:#58a6ff]->text["ℹ Info"]`;

const customThemeCode = `import { THEMES, MiniMermaid } from 'minimermaid';
import type { ThemeColors } from 'minimermaid';

// Duplikasi dark theme + override brand color
const brandTheme: ThemeColors = {
  ...THEMES.dark,
  palette: [
    '#ff6b6b',  // brand red
    '#4ecdc4',  // brand teal
    '#ffe66d',  // brand yellow
    '#a8e6cf',  // brand mint
    '#dcedc1',  // brand light green
    '#ffd3b6',  // brand peach
    '#ffaaa5',  // brand pink
    '#ff8b94',  // brand coral
  ],
  edgeStroke: '#ff6b6b',
};

MiniMermaid.renderTo('#diagram', kode, {
  theme: brandTheme,
});`;

const cssToggleCode = `// Ganti tema UI (tanpa re-render SVG)
document.documentElement.setAttribute('data-theme', 'light');

// Simpan preferensi
localStorage.setItem('mm-docs-theme', 'light');`;
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
   THEME COMPARE
   ========================================================= */
.theme-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0 20px;
}

.theme-demo {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.td-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  background: var(--panel-2);
}
.td-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}
.td-header code {
  font-size: 11px;
  color: var(--muted);
  background: transparent;
  border: 0;
  padding: 0;
}

.td-canvas {
  padding: 0;
  background: var(--bg-elevated);
}
.td-canvas svg {
  width: 100%;
  height: auto;
  display: block;
}

/* =========================================================
   PALETTE COMPARE
   ========================================================= */
.palette-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0 20px;
}

.palette-col h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-strong);
  margin: 0 0 10px;
  padding: 0;
}

.pc-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dark-dot { background: #0a0e14; border: 2px solid #58a6ff; }
.light-dot { background: #ffffff; border: 2px solid #0969da; }

.swatch-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.swatch {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: border-color var(--t-fast);
}
.swatch:hover {
  border-color: var(--accent-border);
}

.swatch-color {
  width: 22px;
  height: 22px;
  border-radius: 5px;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
}

.swatch-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}
.swatch-info code {
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
  background: transparent;
  border: 0;
  padding: 0;
  font-family: var(--font-mono);
}
.swatch-info span {
  font-size: 11px;
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
table td.muted {
  color: var(--muted);
  font-size: 13px;
}
table td code.mini {
  font-size: 11px;
  padding: 1px 5px;
  margin-left: 6px;
  color: var(--muted);
}

.inline-color {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  vertical-align: middle;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15);
}

/* =========================================================
   EXPORT GRID
   ========================================================= */
.export-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin: 16px 0 20px;
}

.export-card {
  padding: 18px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast);
}
.export-card:hover {
  border-color: var(--accent-border);
}

.export-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid;
  place-items: center;
  margin-bottom: 12px;
}

.export-card h4 {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 6px;
  color: var(--text-strong);
}
.export-card p {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.55;
  margin: 0;
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
  .theme-compare,
  .palette-compare {
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
  .export-grid {
    grid-template-columns: 1fr;
  }
}
</style>