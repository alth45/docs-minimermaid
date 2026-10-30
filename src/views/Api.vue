<template>
  <div>
    <h1>Referensi API</h1>
    <p>
      Dokumentasi lengkap public API MiniMermaid — dari instalasi, fungsi rendering,
      opsi konfigurasi, hingga integrasi dengan framework populer.
    </p>

    <!-- =========================================================
         QUICK REFERENCE
         ========================================================= -->
    <div class="quick-ref">
      <div class="qr-item">
        <code>render(source, opts)</code>
        <span>Kembalikan string SVG</span>
      </div>
      <div class="qr-item">
        <code>renderTo(target, source, opts)</code>
        <span>Render langsung ke DOM</span>
      </div>
      <div class="qr-item">
        <code>exportJson(source, opts)</code>
        <span>Serialisasi ke .mmd.json</span>
      </div>
      <div class="qr-item">
        <code>importJson(raw)</code>
        <span>Parse dokumen .mmd.json</span>
      </div>
      <div class="qr-item">
        <code>getLucideIcon(name)</code>
        <span>Resolver ikon Lucide</span>
      </div>
      <div class="qr-item">
        <code>themeName: 'dark'</code>
        <span>Pilih tema global</span>
      </div>
    </div>

    <!-- =========================================================
         1. INSTALASI
         ========================================================= -->
    <h2>1. Instalasi</h2>

    <h3>NPM</h3>
    <CodeBlock language="bash" :code="installNpm" />

    <h3>CDN (UMD)</h3>
    <p>
      Untuk proyek HTML sederhana tanpa bundler. Library diekspos sebagai
      <code>window.MiniMermaid</code>.
    </p>
    <CodeBlock language="html" :code="installCdn" />

    <!-- =========================================================
         2. RENDERING API
         ========================================================= -->
    <h2>2. Rendering API</h2>

    <h3>2.1 <code>MiniMermaid.render()</code></h3>
    <p>
      Mengembalikan string SVG murni — cocok untuk React, Vue, Svelte, atau penyimpanan ke
      database.
    </p>
    <CodeBlock language="typescript" :code="apiRender" />

    <table>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Tipe</th>
          <th>Default</th>
          <th>Deskripsi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>source</code></td>
          <td><code>string</code></td>
          <td>—</td>
          <td>Kode diagram (wajib)</td>
        </tr>
        <tr>
          <td><code>options</code></td>
          <td><code>CompileOptions</code></td>
          <td><code>{}</code></td>
          <td>Konfigurasi (opsional)</td>
        </tr>
      </tbody>
    </table>

    <p><strong>Return:</strong></p>
    <CodeBlock language="typescript" :code="renderReturn" />

    <h3>2.2 <code>MiniMermaid.renderTo()</code></h3>
    <p>
      Render langsung ke elemen DOM — set <code>innerHTML</code> pada target. Error
      di-log ke <code>console.warn</code>.
    </p>
    <CodeBlock language="typescript" :code="apiRenderTo" />

    <p>
      <code>target</code> menerima CSS selector (<code>'#diagram'</code>) atau
      <code>HTMLElement</code> langsung.
    </p>

    <!-- =========================================================
         3. COMPILE OPTIONS
         ========================================================= -->
    <h2>3. Opsi Konfigurasi (<code>CompileOptions</code>)</h2>
    <p>
      Semua opsi bersifat opsional. Bila tidak diset, library menggunakan default yang
      menghasilkan SVG identik dengan Playground.
    </p>

    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Tipe</th>
          <th>Default</th>
          <th>Deskripsi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>edgeStyle</code></td>
          <td><code>'smooth' | 'step' | 'straight'</code></td>
          <td><code>'smooth'</code></td>
          <td>Gaya garis panah antar node</td>
        </tr>
        <tr>
          <td><code>theme</code></td>
          <td><code>ThemeColors</code></td>
          <td><code>THEMES.dark</code></td>
          <td>Objek palet warna lengkap</td>
        </tr>
        <tr>
          <td><code>themeName</code></td>
          <td><code>'dark' | 'light'</code></td>
          <td><code>'dark'</code></td>
          <td>Shortcut untuk tema bawaan</td>
        </tr>
        <tr>
          <td><code>getIcon</code></td>
          <td><code>(name: string) =&gt; string | undefined</code></td>
          <td><code>undefined</code></td>
          <td>Resolver ikon SVG (mis. Lucide)</td>
        </tr>
        <tr>
          <td><code>measure</code></td>
          <td><code>TextMeasurer</code></td>
          <td><code>heuristic</code></td>
          <td>Pengukur teks (Canvas / custom)</td>
        </tr>
      </tbody>
    </table>

    <p class="tip">
      <strong>Prioritas tema:</strong> jika <code>theme</code> dan <code>themeName</code>
      diberikan bersamaan, <code>theme</code> (objek) yang menang. Gunakan
      <code>themeName</code> untuk tema bawaan, <code>theme</code> untuk custom palette.
    </p>

    <!-- =========================================================
         4. ICON HELPER
         ========================================================= -->
    <h2>4. Icon Helper — <code>getLucideIcon</code></h2>
    <p>
      Untuk mengaktifkan ikon Lucide di node, teruskan
      <code>MiniMermaid.getLucideIcon</code> ke opsi <code>getIcon</code>.
    </p>

    <CodeBlock language="typescript" :code="iconHelper" />

    <p>
      <code>getLucideIcon(name)</code> mencari ikon di registry Lucide (1500+ ikon),
      mengonversi format Lucide ke string SVG, dan mengembalikan
      <code>string</code> (atau <code>undefined</code> bila nama tidak dikenal).
    </p>

    <p>
      Nama ikon menggunakan format <strong>kebab-case</strong>:
      <code>user</code>, <code>shopping-cart</code>, <code>check-circle</code>,
      <code>arrow-right</code>, dst. Lihat daftar lengkap di
      <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer">lucide.dev/icons</a>.
    </p>

    <!-- =========================================================
         5. DOCUMENT API
         ========================================================= -->
    <h2>
      5. Document API (.mmd.json)
      <span class="badge badge-new">NEW</span>
    </h2>
    <p>
      Simpan/restore state diagram lengkap (source + tema + edgeStyle) sebagai satu file
      JSON portabel.
    </p>

    <h3>5.1 <code>MiniMermaid.exportJson()</code></h3>
    <CodeBlock language="typescript" :code="apiExport" />

    <p>
      <code>ExportDocumentOptions</code>:
    </p>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Tipe</th>
          <th>Default</th>
          <th>Deskripsi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>theme</code></td>
          <td><code>ThemeName</code></td>
          <td><code>'dark'</code></td>
          <td>Tema saat ini (disimpan di dokumen)</td>
        </tr>
        <tr>
          <td><code>edgeStyle</code></td>
          <td><code>EdgeStyle</code></td>
          <td><code>'smooth'</code></td>
          <td>Gaya edge saat ini</td>
        </tr>
        <tr>
          <td><code>includeModel</code></td>
          <td><code>boolean</code></td>
          <td><code>true</code></td>
          <td>Sertakan hasil parse (nodes/edges) — informatif</td>
        </tr>
      </tbody>
    </table>

    <h3>5.2 <code>MiniMermaid.importJson()</code></h3>
    <CodeBlock language="typescript" :code="apiImport" />

    <p>
      <code>ImportResult</code> mengembalikan bagian-bagian yang bisa langsung diterapkan
      ke UI. Field <code>errors</code> bersifat non-fatal — jika source valid tapi
      versi/tipe berbeda, import tetap berjalan dengan warning.
    </p>

    <CodeBlock language="typescript" :code="importResultType" />

    <h3>5.3 Contoh roundtrip</h3>
    <CodeBlock language="typescript" :code="apiRoundtrip" />

    <!-- =========================================================
         6. THEME API
         ========================================================= -->
    <h2>6. Theme API</h2>
    <p>
      Tema adalah objek <code>ThemeColors</code> dengan 22 slot warna. Tema bawaan
      tersedia via <code>MiniMermaid.THEMES</code>.
    </p>

    <CodeBlock language="typescript" :code="apiTheme" />

    <p>
      Untuk membuat custom theme, duplikasi salah satu tema bawaan dan override field
      tertentu. Lihat halaman <router-link to="/theme">Tema &amp; Warna</router-link>
      untuk daftar lengkap field.
    </p>

    <!-- =========================================================
         7. TYPESCRIPT TYPES
         ========================================================= -->
    <h2>7. TypeScript Types</h2>
    <p>
      Semua tipe di-export dari entry point — gunakan untuk autocomplete dan type safety.
    </p>

    <CodeBlock language="typescript" :code="apiTypes" />

    <p>Impor tipe dengan <code>import type</code> agar tidak menambah bundle size:</p>
    <CodeBlock language="typescript" :code="apiTypesImport" />

    <!-- =========================================================
         8. FRAMEWORK INTEGRATION
         ========================================================= -->
    <h2>8. Integrasi Framework</h2>

    <h3>8.1 React</h3>
    <CodeBlock language="jsx" :code="reactExample" />

    <h3>8.2 Vue 3</h3>
    <CodeBlock language="vue" :code="vueExample" />

    <h3>8.3 Svelte</h3>
    <CodeBlock language="svelte" :code="svelteExample" />

    <h3>8.4 Vanilla JavaScript (HTML)</h3>
    <CodeBlock language="html" :code="vanillaExample" />

    <!-- =========================================================
         9. MODULAR IMPORTS (TREE-SHAKING)
         ========================================================= -->
    <h2>9. Modular Imports (Tree-Shaking)</h2>
    <p>
      Untuk mengurangi bundle size, impor hanya bagian yang diperlukan. Semua fungsi dan
      tipe di-export dari <code>lib.ts</code>.
    </p>

    <CodeBlock language="typescript" :code="apiModular" />

    <p>
      Jika hanya butuh rendering flowchart (tanpa ER, Mindmap, Timeline, dst.), impor
      langsung dari <code>core/parser</code> dan <code>rendering/diagram</code> —
      menghemat ~40% bundle.
    </p>

    <!-- =========================================================
         10. TROUBLESHOOTING
         ========================================================= -->
    <h2>10. Troubleshooting</h2>

    <div class="troubleshoot-list">
      <div v-for="(t, i) in troubleshooting" :key="i" class="troubleshoot-item">
        <div class="ts-problem">
          <span class="ts-icon">!</span>
          <strong>{{ t.problem }}</strong>
        </div>
        <div class="ts-solution">{{ t.solution }}</div>
        <CodeBlock
          v-if="t.code"
          language="typescript"
          :code="t.code"
          :show-header="false"
        />
      </div>
    </div>

    <!-- =========================================================
         11. LIMITATIONS
         ========================================================= -->
    <h2>11. Batasan yang Diketahui</h2>
    <ul>
      <li>
        <strong>Browser-only icon resolver:</strong> <code>getLucideIcon</code> mengimpor
        seluruh registry Lucide. Untuk SSR atau ukuran bundle minimal, sediakan resolver
        kustom yang hanya memuat ikon yang dipakai.
      </li>
      <li>
        <strong>DOM measurement:</strong> pipeline <code>core/</code> bebas DOM, tapi
        presisi ukuran teks optimal hanya saat <code>measure</code> di-inject dari UI
        (Canvas measurer). Tanpa ini, gunakan heuristik (default) yang cukup akurat untuk
        ASCII.
      </li>
      <li>
        <strong>Interactive nodes di SSR:</strong> hasil SVG berisi tag anchor dan
        title — jangan di-<em>sanitize</em> dengan library yang membuang dua tag tersebut.
      </li>
      <li>
        <strong>Timeline tanpa edge style:</strong> timeline selalu horizontal linear.
        Opsi <code>edgeStyle</code> diabaikan untuk tipe diagram ini.
      </li>
      <li>
        <strong>Tidak ada Web Worker:</strong> parsing berjalan sinkronus di main thread.
        Untuk diagram sangat besar (&gt;500 node), pertimbangkan chunking sendiri.
      </li>
    </ul>

    <!-- =========================================================
         NEXT STEPS
         ========================================================= -->
    <div class="next-steps">
      <h3>Selanjutnya</h3>
      <div class="next-grid">
        <router-link to="/about" class="next-card">
          <strong>Tentang Proyek →</strong>
          <span>Roadmap &amp; kontribusi</span>
        </router-link>
        <router-link to="/theme" class="next-card">
          <strong>Tema &amp; Warna →</strong>
          <span>Palet &amp; custom theme</span>
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
import {
  installNpm,
  installCdn,
  apiRender,
  renderReturn,
  apiRenderTo,
  iconHelper,
  apiExport,
  apiImport,
  importResultType,
  apiRoundtrip,
  apiTheme,
  apiTypes,
  apiTypesImport,
  reactExample,
  vueExample,
  svelteExample,
  vanillaExample,
  apiModular,
  troubleshooting,
} from '../data/api-examples';
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
table td code {
  font-size: 11.5px;
  white-space: nowrap;
}

/* =========================================================
   TROUBLESHOOTING
   ========================================================= */
.troubleshoot-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0 24px;
}

.troubleshoot-item {
  padding: 14px 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--t-fast);
}
.troubleshoot-item:hover {
  border-color: var(--accent-border);
}

.ts-problem {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.ts-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(248, 81, 73, 0.12);
  color: var(--danger);
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}
.ts-problem strong {
  color: var(--text-strong);
  font-size: 14px;
}

.ts-solution {
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 8px;
  padding-left: 30px;
}

.troubleshoot-item :deep(.code-block) {
  margin: 0 !important;
  margin-left: 30px !important;
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
  .troubleshoot-item :deep(.code-block) {
    margin-left: 0 !important;
  }
  .ts-solution {
    padding-left: 0;
  }
}
@media (max-width: 600px) {
  .quick-ref {
    grid-template-columns: 1fr 1fr;
  }
  .next-grid {
    grid-template-columns: 1fr;
  }
  table td code {
    white-space: normal;
  }
}
</style>