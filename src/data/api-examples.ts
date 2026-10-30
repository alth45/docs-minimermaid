/* =========================================================
   API EXAMPLES — kumpulan string contoh untuk halaman Api.vue
   Dipisah agar tidak bikin error `</script>` di SFC Vue.
   File .ts tidak di-parse sebagai SFC → tag aman.
   ========================================================= */

/* =========================================================
   INSTALL
   ========================================================= */
export const installNpm = `npm install minimermaid`;

export const installCdn = `<!-- UMD build — expose window.MiniMermaid -->
<script src="https://unpkg.com/minimermaid/minimermaid.umd.js"></script>
<script>
  MiniMermaid.renderTo('#diagram', \`
    [horizontal]
    ->[round]->text["Mulai"]->node
    ->[square]->text["Selesai"]
  \`);
</script>`;

/* =========================================================
   RENDER API
   ========================================================= */
export const apiRender = `import MiniMermaid from 'minimermaid';

const { svg, errors } = MiniMermaid.render(
  \`->[round]->text["Mulai"]->node
->[triangle]->text["Selesai"]\`,
  {
    edgeStyle: 'smooth',
    themeName: 'dark',
    getIcon: MiniMermaid.getLucideIcon,
  },
);

if (errors.length === 0) {
  document.querySelector('#out')!.innerHTML = svg;
}`;

export const renderReturn = `interface RenderResult {
  svg: string;        // string SVG lengkap (dengan <svg> root)
  errors: string[];   // daftar error parse (kosong bila sukses)
}`;

export const apiRenderTo = `MiniMermaid.renderTo('#diagram', source, options);
// atau via HTMLElement langsung:
MiniMermaid.renderTo(document.getElementById('diagram')!, source, options);`;

/* =========================================================
   ICON HELPER
   ========================================================= */
export const iconHelper = `// Cukup teruskan resolver — node dengan ->icon["..."]
// akan otomatis di-render dengan ikon Lucide.
MiniMermaid.renderTo('#diagram', \`
  ->[round]->icon["user"]->text["Profil"]
  ->[square]->icon["shopping-cart"]->text["Pesanan"]
  ->[triangle]->icon["check-circle"]->text["Selesai"]
\`, {
  getIcon: MiniMermaid.getLucideIcon,
});`;

/* =========================================================
   DOCUMENT API
   ========================================================= */
export const apiExport = `import MiniMermaid from 'minimermaid';

const json = MiniMermaid.exportJson(kodeSumber, {
  theme: 'light',
  edgeStyle: 'step',
  includeModel: true,
});

// Unduh sebagai file
const blob = new Blob([json], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'diagram.mmd.json';
a.click();
URL.revokeObjectURL(url);`;

export const apiImport = `const raw = await file.text();  // dari <input type="file">
const result = MiniMermaid.importJson(raw);

if (result.source) {
  editor.value = result.source;
  setTheme(result.theme);
  setEdgeStyle(result.edgeStyle);
  render();
}

if (result.errors.length > 0) {
  console.warn('Import warnings:', result.errors);
}`;

export const importResultType = `interface ImportResult {
  source: string;         // kode diagram
  theme: 'dark' | 'light';
  edgeStyle: 'smooth' | 'step' | 'straight';
  type: DiagramType;      // flowchart | sequence | class | ...
  errors: string[];       // warning non-fatal
}`;

export const apiRoundtrip = `// Export
const json = MiniMermaid.exportJson(source);

// Simpan ke disk / database / localStorage
localStorage.setItem('my-diagram', json);

// Nanti: restore
const saved = localStorage.getItem('my-diagram')!;
const { source: restoredSource } = MiniMermaid.importJson(saved);
MiniMermaid.renderTo('#diagram', restoredSource);`;

/* =========================================================
   THEME API
   ========================================================= */
export const apiTheme = `import MiniMermaid, { THEMES } from 'minimermaid';
import type { ThemeColors } from 'minimermaid';

// Pakai tema bawaan
MiniMermaid.renderTo('#d1', source, { themeName: 'light' });

// Atau akses objek theme langsung
MiniMermaid.renderTo('#d2', source, { theme: THEMES.light });

// Custom brand theme
const brand: ThemeColors = {
  ...THEMES.dark,
  palette: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf'],
};
MiniMermaid.renderTo('#d3', source, { theme: brand });`;

/* =========================================================
   TYPES
   ========================================================= */
export const apiTypes = `export type DiagramType =
  | 'flowchart' | 'sequence' | 'class' | 'state'
  | 'network' | 'er' | 'mindmap' | 'timeline';

export type EdgeStyle = 'smooth' | 'step' | 'straight';
export type ThemeName = 'dark' | 'light';

export interface ThemeColors { /* 22 field */ }
export interface TextMeasurer { measure(text: string): number }

export interface CompileOptions {
  measure?: TextMeasurer;
  edgeStyle?: EdgeStyle;
  getIcon?: (name: string) => string | undefined;
  theme?: ThemeColors;
  themeName?: ThemeName;
}

export interface MiniMermaidDocument {
  version: string;
  generator: string;
  type: DiagramType;
  source: string;
  theme: ThemeName;
  edgeStyle: EdgeStyle;
  model?: { direction: Direction; nodes: NodeSpec[]; edges: EdgeSpec[] };
}`;

export const apiTypesImport = `import type {
  CompileOptions,
  ThemeColors,
  MiniMermaidDocument,
  DiagramType,
  EdgeStyle,
} from 'minimermaid';`;

/* =========================================================
   FRAMEWORK INTEGRATION
   ========================================================= */
export const reactExample = `import { useEffect, useRef } from 'react';
import MiniMermaid from 'minimermaid';

export function Diagram({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    MiniMermaid.renderTo(ref.current, code, {
      edgeStyle: 'smooth',
      themeName: 'dark',
      getIcon: MiniMermaid.getLucideIcon,
    });
  }, [code]);

  return <div ref={ref} />;
}`;

export const vueExample = `<template>
  <div v-html="svg"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MiniMermaid from 'minimermaid';

const props = defineProps<{ code: string }>();

const svg = computed(() => {
  const { svg, errors } = MiniMermaid.render(props.code, {
    edgeStyle: 'smooth',
    themeName: 'dark',
    getIcon: MiniMermaid.getLucideIcon,
  });
  if (errors.length > 0) console.warn(errors);
  return svg;
});
</script>`;

export const svelteExample = `<script lang="ts">
  import { onMount } from 'svelte';
  import MiniMermaid from 'minimermaid';

  export let code: string;
  let el: HTMLDivElement;

  $: if (el) {
    MiniMermaid.renderTo(el, code, {
      edgeStyle: 'smooth',
      getIcon: MiniMermaid.getLucideIcon,
    });
  }
</script>

<div bind:this={el}></div>`;

export const vanillaExample = `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/minimermaid/minimermaid.umd.js"></script>
</head>
<body>
  <div id="diagram"></div>
  <script>
    MiniMermaid.renderTo('#diagram', \`
      [horizontal]
      ->[round]->text["Mulai"]->node
      ->[diamond]->text["Cek?"]
        ->ya["Ya"]->[square:green]->text["OK"]
    \`, {
      getIcon: MiniMermaid.getLucideIcon,
    });
  </script>
</body>
</html>`;

/* =========================================================
   MODULAR IMPORTS
   ========================================================= */
export const apiModular = `// Impor API publik lengkap
import MiniMermaid from 'minimermaid';

// Impor named — cocok untuk tree-shaking
import MiniMermaid, { THEMES, DOC_VERSION } from 'minimermaid';

// Impor fungsi spesifik (advanced)
import { compile } from 'minimermaid/core/compile';
import { exportDocument, parseDocumentJson } from 'minimermaid/core/document';

// Impor engine spesifik (untuk SSR / custom renderer)
import { renderErDiagram } from 'minimermaid/core/er-diagram';
import { renderMindmap } from 'minimermaid/core/mindmap';`;

/* =========================================================
   TROUBLESHOOTING
   ========================================================= */
export interface TroubleshootItem {
    problem: string;
    solution: string;
    code?: string;
}

export const troubleshooting: TroubleshootItem[] = [
    {
        problem: 'Diagram kosong (SVG tidak muncul)',
        solution:
            'Periksa result.errors. Bila non-empty, cek pesan error untuk baris yang bermasalah. ' +
            'Bila kosong, pastikan source tidak kosong dan viewBox tidak 0×0.',
        code: `const { svg, errors } = MiniMermaid.render(source);
console.log('errors:', errors);`,
    },
    {
        problem: 'Ikon tidak tampil (kotak kosong)',
        solution:
            'Pastikan opsi getIcon di-set ke MiniMermaid.getLucideIcon. ' +
            'Nama ikon harus kebab-case (user, shopping-cart — bukan User atau ShoppingCart).',
        code: `MiniMermaid.renderTo('#d', source, {
  getIcon: MiniMermaid.getLucideIcon,  // WAJIB
});`,
    },
    {
        problem: 'Kontras buruk saat embed di web terang',
        solution:
            'Warna SVG di-bake dari themeName saat render. ' +
            'Render ulang dengan themeName: "light" untuk tema terang.',
        code: `MiniMermaid.renderTo('#d', source, { themeName: 'light' });`,
    },
    {
        problem: 'Link node tidak berfungsi (React/Vue)',
        solution:
            'Gunakan dangerouslySetInnerHTML / v-html. Sanitizer yang agresif ' +
            '(mis. DOMPurify default) bisa membuang tag anchor dan title.',
        code: `<div dangerouslySetInnerHTML={{ __html: svg }} />`,
    },
    {
        problem: 'Import .mmd.json gagal tanpa pesan jelas',
        solution:
            'Cek importJson result.errors — biasanya versi atau tipe mismatch. ' +
            'Source tetap dipakai bila ada.',
        code: `const r = MiniMermaid.importJson(raw);
console.log('warnings:', r.errors, 'source valid:', !!r.source);`,
    },
    {
        problem: 'Bundle terlalu besar (~200 KB gzipped)',
        solution:
            'Gunakan modular import + custom icon resolver. ' +
            'Ikon Lucide (~1500 ikon) menyumbang ~70% ukuran.',
        code: `// Hanya daftarkan ikon yang dipakai
const myIcons = { user: ..., check: ... };
const getIcon = (name) => myIcons[name];`,
    },
];