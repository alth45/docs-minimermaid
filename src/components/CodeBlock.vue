<template>
  <div class="code-block" :class="`lang-${language || 'text'}`">
    <!-- Header bar (hanya muncul jika showHeader) -->
    <div v-if="showHeader" class="code-header">
      <div class="code-dots" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <span class="code-lang">{{ displayLanguage }}</span>
      <button
        class="code-copy"
        :class="{ copied }"
        :title="copied ? 'Tersalin!' : 'Salin kode'"
        :aria-label="copied ? 'Tersalin' : 'Salin kode'"
        @click="handleCopy"
      >
        <svg v-if="!copied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{{ copied ? 'Tersalin' : 'Salin' }}</span>
      </button>
    </div>

    <!-- Body -->
    <div class="code-body">
      <!-- Line numbers -->
      <div v-if="lineNumbers" class="code-gutter" aria-hidden="true">
        <span v-for="n in lineCount" :key="n">{{ n }}</span>
      </div>

      <!-- Code -->
      <pre class="code-pre"><code ref="codeEl" class="hljs" :class="language"></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

/* =========================================================
   PROPS
   ========================================================= */
interface Props {
  code: string;
  language?: string;
  /** Tampilkan header bar dengan tombol salin. Default: true */
  showHeader?: boolean;
  /** Tampilkan nomor baris. Default: false */
  lineNumbers?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  language: 'text',
  showHeader: true,
  lineNumbers: false,
});

/* =========================================================
   STATE
   ========================================================= */
const codeEl = ref<HTMLElement | null>(null);
const copied = ref(false);
let copyTimer: number | null = null;

const lineCount = computed(() => props.code.split('\n').length);

/* Label bahasa yang lebih ramah */
const LANGUAGE_LABELS: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  html: 'HTML',
  css: 'CSS',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  json: 'JSON',
  mermaid: 'Mermaid',
  text: 'Teks',
  vue: 'Vue',
};

const displayLanguage = computed(() => {
  const lang = (props.language || 'text').toLowerCase();
  return LANGUAGE_LABELS[lang] ?? lang.toUpperCase();
});

/* =========================================================
   HIGHLIGHT
   ========================================================= */
const highlight = (): void => {
  if (!codeEl.value) return;

  codeEl.value.textContent = props.code;

  // Bahasa "mermaid" tidak dikenali highlight.js — pakai plaintext agar tidak warning
  const lang = (props.language || '').toLowerCase();
  if (lang === 'mermaid' || !lang || !hljs.getLanguage(lang)) {
    codeEl.value.className = 'hljs';
  } else {
    codeEl.value.className = `hljs language-${lang}`;
  }

  hljs.highlightElement(codeEl.value);
};

onMounted(() => highlight());

watch(
  () => [props.code, props.language],
  () => nextTick(highlight),
);

/* =========================================================
   COPY
   ========================================================= */
async function handleCopy(): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(props.code);
    } else {
      // Fallback untuk browser lama / HTTP non-secure
      const ta = document.createElement('textarea');
      ta.value = props.code;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    copied.value = true;
    if (copyTimer !== null) window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => {
      copied.value = false;
      copyTimer = null;
    }, 1600);
  } catch (err) {
    console.warn('Gagal menyalin:', err);
  }
}
</script>

<style scoped>
/* =========================================================
   WRAPPER
   ========================================================= */
.code-block {
  position: relative;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 0 0 20px;
  transition: border-color var(--t-fast);
}
.code-block:hover {
  border-color: var(--border);
}

/* =========================================================
   HEADER
   ========================================================= */
.code-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px 8px 14px;
  background: var(--panel);
  border-bottom: 1px solid var(--code-border);
  user-select: none;
}

.code-dots {
  display: flex;
  gap: 5px;
}
.code-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}
.code-dots span:nth-child(1) { background: #ff5f57; opacity: 0.7; }
.code-dots span:nth-child(2) { background: #febc2e; opacity: 0.7; }
.code-dots span:nth-child(3) { background: #28c840; opacity: 0.7; }

.code-lang {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.code-copy {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  background: transparent;
  color: var(--muted);
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 11.5px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--t-fast);
}
.code-copy:hover {
  background: var(--panel-2);
  color: var(--text);
  border-color: var(--border);
}
.code-copy.copied {
  color: var(--success);
  border-color: rgba(63, 185, 80, 0.4);
  background: rgba(63, 185, 80, 0.08);
}

/* =========================================================
   BODY
   ========================================================= */
.code-body {
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
}

.code-gutter {
  display: flex;
  flex-direction: column;
  padding: 16px 10px 16px 14px;
  user-select: none;
  border-right: 1px solid var(--code-border);
  background: var(--panel);
  color: var(--muted-2);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.65;
  text-align: right;
  flex-shrink: 0;
}
.code-gutter span {
  display: block;
  min-width: 1.8ch;
}

.code-pre {
  margin: 0;
  padding: 16px 20px;
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  background: transparent;
  border: 0;
  border-radius: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.65;
}

.code-pre code,
:deep(.hljs) {
  background: transparent !important;
  padding: 0;
  border: 0;
  font-family: inherit;
  font-size: inherit;
  color: #c9d1d9;
}

/* =========================================================
   LIGHT THEME OVERRIDES untuk highlight.js
   Highlight.js membawa tema github-dark.css. Kita remap
   warna token agar tetap nyaman di light mode.
   ========================================================= */
:global([data-theme="light"]) .code-pre code,
:global([data-theme="light"]) :deep(.hljs) {
  color: #24292f;
}
:global([data-theme="light"]) :deep(.hljs-keyword),
:global([data-theme="light"]) :deep(.hljs-selector-tag),
:global([data-theme="light"]) :deep(.hljs-built_in) {
  color: #cf222e;
}
:global([data-theme="light"]) :deep(.hljs-string),
:global([data-theme="light"]) :deep(.hljs-attr) {
  color: #0a3069;
}
:global([data-theme="light"]) :deep(.hljs-comment) {
  color: #6e7781;
}
:global([data-theme="light"]) :deep(.hljs-number),
:global([data-theme="light"]) :deep(.hljs-literal) {
  color: #0550ae;
}
:global([data-theme="light"]) :deep(.hljs-title),
:global([data-theme="light"]) :deep(.hljs-function) {
  color: #8250df;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 600px) {
  .code-copy span { display: none; }
  .code-copy { padding: 5px 7px; }
  .code-pre { padding: 14px 16px; }
  .code-gutter { padding: 14px 8px 14px 10px; }
}
</style>