/*
 * @Author: wangqiaoling
 * @LastEditors: wangqiaoling
 * @Description:
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    emptyOutDir: false, // 避免dist被清空
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'lib',
      fileName: (format) => `lib.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      input: ['src/index.ts'],
      output: {
        globals: {
          vue: 'Vue'
        },
        format: 'es',
        exports: 'named'
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    },
    minify: false,
    sourcemap: true
  },
  server: {
    host: '0.0.0.0',
    port: 3100,
    open: true,
    strictPort: true
  }
});
