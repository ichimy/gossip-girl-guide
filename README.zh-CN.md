# Gossip Girl Guide · 绯闻女孩上东区指南

**[English](./README.md)**

《绯闻女孩》粉丝向单页资料站：角色图鉴、六季剧情时间轴、CP 关系图、经典台词、纽约取景地打卡、时尚穿搭解析、原声配乐、演员现状与幕后彩蛋。全站中英双语。

技术栈：Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui。没有后端，也不请求任何外部 CDN —— 字体和图片都在仓库里，构建产物是纯静态文件。

## 功能亮点

- **中英双语**：顶栏「中 / EN」切换，选择会存进 `localStorage`；也支持 `?lang=zh` / `?lang=en` 直接分享指定语言
- **暗色杂志风设计**：深灰底 + 奢华金 + 玫瑰粉，设计变量集中在 `client/src/tailwind-theme.css`
- **锚点导航**：平滑滚动 + 滚动高亮当前区块
- **滚动揭示动效**（Framer Motion）与 **ECharts 交互式关系图谱**
- **完全自包含**：Playfair Display 字体与图片全部本地化，零第三方请求

## 本地开发

安装依赖并启动开发服务器：

    npm install
    npm run dev

打开 http://localhost:8080/ 即可。

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器（8080 端口，热更新） |
| `npm run build` | 类型检查 + 构建静态产物到 `dist/` |
| `npm run preview` | 本地预览构建产物 |
| `npm run typecheck` | 仅类型检查 |
| `npm run lint` | ESLint 检查 |
| `npm run format` | Prettier 格式化 |

`dist/` 是纯静态产物，可直接部署到 GitHub Pages、Netlify、Vercel 或任意静态服务器。

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `client/index.html` | 入口 HTML |
| `client/public/fonts/` | 本地托管的 Playfair Display 字体 |
| `client/src/i18n/` | 语言 Provider、语言探测、`LText` 类型 |
| `client/src/components/` | 顶部导航、移动端抽屉、锚点链接、语言切换、shadcn/ui |
| `client/src/pages/HomePage/` | 每个区块一个组件，双语文案就地维护 |
| `client/src/tailwind-theme.css` | 设计 token（配色、字体、圆角、阴影） |
| `shared/static/images/` | 角色与 Hero 图片 |

### 翻译是怎么组织的

项目没有引入 i18n 框架。文案以 `{ zh, en }` 字面量就地写在内容旁（类型为 `LText`），组件通过 `useLocale()` 取当前语言。中英文并排便于对照校对，而且漏翻译时 TypeScript 会直接报错。

## 参与贡献

欢迎提 issue 或 PR。新增内容时请**补齐两种语言**：写成 `{ zh: '…', en: '…' }`，以满足 `LText` 类型约束。

## 授权与声明

源代码基于 [MIT 协议](./LICENSE) 开源。

本项目是非官方、非商业的粉丝作品。《绯闻女孩》及相关角色、台词、商标版权归 Warner Bros. / CBS Studios 所有，本项目与其无隶属或授权关系。

`shared/static/images/` 下的图片仅用于粉丝向展示，**不在 MIT 授权范围内**；如需分发本项目，请替换为你自己的素材。
