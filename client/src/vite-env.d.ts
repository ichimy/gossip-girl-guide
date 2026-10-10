/// <reference types="vite/client" />

import 'react';

// 允许在 style 中使用 CSS 自定义属性（原模板的全局声明，本地保留）
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
