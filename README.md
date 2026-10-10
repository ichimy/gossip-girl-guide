# Gossip Girl Guide

**[中文说明](./README.zh-CN.md)**

An unofficial, bilingual (English / 中文) single-page guide to *Gossip Girl* — character profiles, a season-by-season timeline, the relationship map, iconic quotes, New York filming locations, fashion breakdowns, soundtrack picks, cast updates and behind-the-scenes trivia.

Built with Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui. No backend and no external CDN requests: the whole site ships as static files, fonts and images included.

## Features

- **Bilingual UI** — switch between English and 中文 from the top bar; the choice is remembered in `localStorage`, and `?lang=en` / `?lang=zh` deep links work too
- **Dark editorial design** — an "Upper East Side" palette of deep charcoal, gold and rose, defined as tokens in `client/src/tailwind-theme.css`
- **Anchor navigation** with smooth scrolling and scroll-spy highlighting
- **Scroll-reveal animations** (Framer Motion) and an interactive **ECharts relationship graph**
- **Self-contained assets** — self-hosted Playfair Display webfonts, local images, zero third-party requests

## Getting started

Install dependencies and start the dev server:

    npm install
    npm run dev

Then open http://localhost:8080/.

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server on port 8080, with HMR |
| `npm run build` | Type check + build the static site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type check only |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

The build output in `dist/` is fully static — drop it on GitHub Pages, Netlify, Vercel or any web server.

## Project structure

| Path | What it is |
| --- | --- |
| `client/index.html` | HTML entry |
| `client/public/fonts/` | Self-hosted Playfair Display webfonts |
| `client/src/i18n/` | Locale provider, language detection, `LText` type |
| `client/src/components/` | Top bar, mobile drawer, anchor links, language switcher, shadcn/ui |
| `client/src/pages/HomePage/` | One component per section, bilingual content inline |
| `client/src/tailwind-theme.css` | Design tokens (colours, fonts, radii, shadows) |
| `shared/static/images/` | Character and hero imagery |

### How the i18n works

There is no i18n framework. Content is written inline as `{ zh, en }` literals (typed as `LText`), and components read the active locale from `useLocale()`. Both languages sit side by side so contributors can proofread them together — and TypeScript errors if a translation is missing.

## Contributing

Issues and pull requests are welcome. When adding content, please fill in **both** languages: use `{ zh: '…', en: '…' }` objects so the `LText` type stays satisfied.

## License & disclaimer

Source code is released under the [MIT license](./LICENSE).

This is an unofficial, non-commercial fan project. *Gossip Girl* and all related characters, quotes and trademarks belong to Warner Bros. / CBS Studios; this project is not affiliated with or endorsed by them.

Images under `shared/static/images/` are fan board art used for illustration only and are **not** covered by the MIT license — replace them with your own assets if you redistribute this project.
