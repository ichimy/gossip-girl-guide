import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Vite 配置：root 指向 client/，开发服务器端口 8080。
 * base 默认相对路径（域名根目录、静态托管都能直接跑）；部署在子路径时
 * 用 VITE_BASE_PATH 覆盖，例如 GitHub Pages 项目页：VITE_BASE_PATH=/<repo>/
 */
export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  base: process.env.VITE_BASE_PATH || './',
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
