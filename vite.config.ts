import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // ← UBAH: dari '../src/lib.ts' ke folder vendor lokal
      'minimermaid': resolve(__dirname, 'vendor/minimermaid/lib.ts'),
    },
  },
});