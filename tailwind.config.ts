/**
 * Tailwind 配置。设计 token 与动画分别定义在 client/src/tailwind-theme.css
 * 和 tw-animate-css 中，这里只保留内容扫描范围与暗色模式开关。
 */
export default {
  darkMode: 'class' as const,
  content: ['./client/src/**/*.{ts,tsx,css}'],
  plugins: [],
};
