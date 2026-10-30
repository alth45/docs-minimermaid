<template>
  <div class="live-diagram-wrapper">
    <!-- Toolbar (opsional) -->
    <div v-if="showToolbar" class="ld-toolbar">
      <div class="ld-toolbar-group">
        <label for="ld-edge-style">Gaya Edge</label>
        <select
          id="ld-edge-style"
          v-model="currentEdgeStyle"
          class="ld-select"
        >
          <option value="smooth">Smooth</option>
          <option value="step">Step</option>
          <option value="straight">Straight</option>
        </select>
      </div>
      <span class="ld-theme-indicator" :title="`Tema: ${currentTheme}`">
        <span class="ld-dot"></span>
        {{ currentTheme === 'dark' ? 'Gelap' : 'Terang' }}
      </span>
    </div>

    <!-- Canvas -->
    <div
      ref="canvasEl"
      class="ld-canvas"
      :style="{ minHeight: `${minHeight}px` }"
    ></div>

    <!-- Error box -->
    <div v-if="errors.length > 0" class="ld-errors">
      <div class="ld-errors-header">
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import MiniMermaid from 'minimermaid';

/* =========================================================
   PROPS
   ========================================================= */
interface Props {
  code: string;
  edgeStyle?: 'smooth' | 'step' | 'straight';
  /** Tampilkan toolbar gaya edge + indikator tema. Default: false */
  showToolbar?: boolean;
  /** Tinggi minimum canvas dalam px. Default: 300 */
  minHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  edgeStyle: 'smooth',
  showToolbar: false,
  minHeight: 300,
});

/* =========================================================
   STATE
   ========================================================= */
const canvasEl = ref<HTMLElement | null>(null);
const errors = ref<string[]>([]);
const currentEdgeStyle = ref<'smooth' | 'step' | 'straight'>(props.edgeStyle);
const currentTheme = ref<'dark' | 'light'>('dark');

let themeObserver: MutationObserver | null = null;

/* =========================================================
   THEME DETECTION
   ========================================================= */
function readCurrentTheme(): 'dark' | 'light' {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

function setupThemeObserver(): void {
  currentTheme.value = readCurrentTheme();

  themeObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'data-theme') {
        const next = readCurrentTheme();
        if (next !== currentTheme.value) {
          currentTheme.value = next;
          renderDiagram(); // re-render dengan themeName baru
        }
      }
    }
  });

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
}

/* =========================================================
   RENDER
   ========================================================= */
function renderDiagram(): void {
  if (!canvasEl.value) return;

  try {
    const result = MiniMermaid.render(props.code, {
      edgeStyle: currentEdgeStyle.value,
      themeName: currentTheme.value,
      getIcon: MiniMermaid.getLucideIcon,
    });

    canvasEl.value.innerHTML = result.svg;
    errors.value = result.errors;
  } catch (err) {
    // Safety net: kalaupun library crash (bukan sekadar error parse),
    // kita tampilkan sebagai error biasa agar UI tidak blank.
    console.error('MiniMermaid render error:', err);
    errors.value = [(err as Error).message || 'Render gagal'];
  }
}

/* =========================================================
   LIFECYCLE
   ========================================================= */
onMounted(() => {
  setupThemeObserver();
  nextTick(renderDiagram);
});

onBeforeUnmount(() => {
  themeObserver?.disconnect();
  themeObserver = null;
});

/* =========================================================
   WATCHERS
   ========================================================= */
watch(() => props.code, () => nextTick(renderDiagram));
watch(() => props.edgeStyle, (val) => {
  currentEdgeStyle.value = val;
});
watch(currentEdgeStyle, () => renderDiagram());
</script>

<style scoped>
/* =========================================================
   WRAPPER
   ========================================================= */
.live-diagram-wrapper {
  position: relative;
  margin: 0 0 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-elevated);
  transition: border-color var(--t-normal), background var(--t-normal);
}

/* =========================================================
   TOOLBAR
   ========================================================= */
.ld-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  font-size: 12.5px;
}

.ld-toolbar-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ld-toolbar-group label {
  color: var(--muted);
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.ld-select {
  background: var(--panel-2);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: border-color var(--t-fast);
}
.ld-select:hover { border-color: var(--accent-border); }
.ld-select:focus { border-color: var(--accent); }

.ld-theme-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 11.5px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--panel-2);
}
.ld-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

/* =========================================================
   CANVAS (dot grid pattern — theme-aware)
   ========================================================= */
.ld-canvas {
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: radial-gradient(circle at 1px 1px, var(--grid-dot) 1px, transparent 0);
  background-size: 20px 20px;
  overflow: auto;
  transition: background-color var(--t-normal);
}

/* Inner SVG constraint — cegah diagram raksasa scroll horizontal
   berlebihan (max-width tetap 100%, tinggi auto) */
.ld-canvas :deep(svg) {
  width: 100%;
  height: auto;
  max-width: 100%;
  display: block;
}

/* =========================================================
   ERRORS
   ========================================================= */
.ld-errors {
  padding: 12px 16px;
  background: rgba(248, 81, 73, 0.08);
  border-top: 1px solid rgba(248, 81, 73, 0.35);
  color: var(--danger);
  font-size: 12.5px;
  font-family: var(--font-mono);
}
.ld-errors-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  margin-bottom: 6px;
}
.ld-errors ul {
  margin: 0;
  padding-left: 20px;
  color: var(--text);
}
.ld-errors li {
  margin: 2px 0;
  font-size: 12px;
  line-height: 1.5;
}
.ld-errors li::marker { color: var(--danger); }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 600px) {
  .ld-canvas {
    padding: 14px;
  }
  .ld-toolbar {
    flex-wrap: wrap;
    gap: 6px;
    padding: 6px 10px;
  }
  .ld-theme-indicator { display: none; }
}
</style>