import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Vite 配置：root 指向 client/，开发服务器端口 8080。
 */
export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  server: {
    port: 8080,
    // 页面会引用 client/ 之外的 shared/static 图片资源
    fs: {
      allow: [path.resolve(__dirname)],
    },
  },
  preview: {
    port: 8080,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
