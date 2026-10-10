# Gossip Girl 绯闻女孩 - 上东区完全指南 - 需求拆解文档

## 产品概述

- **产品类型**: 粉丝向内容展示单页/落地页
- **场景类型**: <scene_type>prototype-app</scene_type>
- **目标用户**: 《绯闻女孩》剧迷、美剧爱好者、时尚/纽约文化关注者
- **核心价值**: 打造沉浸式、奢华感的剧集全方位资料库，满足剧迷收藏与打卡需求
- **界面语言**: zh-CN（含部分英文原台词/名称）
- **主题偏好**: dark（深灰/黑色背景，金色/粉色点缀，Upper East Side 奢华感）
- **导航模式**: 锚点导航
- **导航布局**: Topbar（顶部固定，支持平滑滚动跳转）

---

## 页面结构总览

> **说明**：本项目为单页应用，所有内容通过锚点区块划分，以下为页面区块结构

**页面文件**: `HomePage.tsx`

| 区块名称 | 锚点 | 区块说明 |
|---------|------|---------|
| 封面/Hero区 | `#hero` | 大标题、副标题、经典引言、氛围背景 |
| 剧集概览 | `#overview` | 播出信息、季数集数、收视率与奖项卡片 |
| 主要角色 | `#characters` | 8位核心角色卡片网格（演员、标签、简介） |
| 剧情时间线 | `#timeline` | 六季核心剧情与关键事件时间轴展示 |
| CP关系图 | `#couples` | 经典爱情线可视化展示（关系连线/矩阵） |
| 经典台词 | `#quotes` | 双语经典台词引用卡片集锦 |
| 取景地指南 | `#locations` | 纽约15+打卡地列表/卡片（地址、对应剧情） |
| 时尚穿搭 | `#fashion` | 角色风格解析（Blair/Serena）及时尚影响 |
| 经典配乐 | `#soundtrack` | 剧中经典歌曲/插曲列表展示 |
| 演员现状 | `#cast-now` | 6位主演现实发展现状简介 |
| 彩蛋与趣闻 | `#trivia` | 幕后花絮、客串明星、重启版等趣味事实 |
| 页脚 | `#footer` | XOXO 风格签名与版权信息 |

---

## 导航配置

> **说明**：此表为顶部固定导航栏生成的数据源，锚点需与页面结构总览一致

- **导航布局**: Topbar（顶部固定，半透明毛玻璃背景，滚动时高亮当前区块）
- **导航项**:
  | 导航文字 | 锚点 |
  |---------|------|
  | 首页 | `#hero` |
  | 剧集概览 | `#overview` |
  | 角色图鉴 | `#characters` |
  | 剧情时间轴 | `#timeline` |
  | CP关系 | `#couples` |
  | 经典台词 | `#quotes` |
  | 取景打卡 | `#locations` |
  | 时尚穿搭 | `#fashion` |
  | 原声配乐 | `#soundtrack` |
  | 演员现状 | `#cast-now` |
  | 幕后彩蛋 | `#trivia` |

---

## 功能列表

> **说明**：每个内容区块的核心展示与交互功能点，供页面生成使用

- **区块**: 封面/Hero区 (`#hero`)
  - **区块目标**: 营造 Upper East Side 奢华氛围，确立页面基调
  - **功能点**:
    - 动态渐变背景与金色粒子/光晕动画效果
    - 主标题“GOSSIP GIRL 绯闻女孩”入场淡入与缩放动画
    - 副标题与经典引言排版展示，支持鼠标悬停微交互
    - 向下滚动提示箭头（点击平滑滚动至下一区块）

- **区块**: 剧集概览 (`#overview`)
  - **区块目标**: 快速呈现剧集核心基础数据与荣誉
  - **功能点**:
    - 四宫格数据卡片展示（年份、季数/集数、电视台、原著作者）
    - 奖项与收视率指标徽章化设计（青少年选择奖等）
    - 卡片悬停时边框发光与轻微上浮效果
    - 背景融入纽约天际线或上东区抽象几何图形

- **区块**: 主要角色 (`#characters`)
  - **区块目标**: 清晰展示8位核心角色档案与人物标签
  - **功能点**:
    - 响应式卡片网格布局（桌面端4列/平板2列/手机1列）
    - 角色头像占位区（CSS图形/首字母徽章代替真实图片）
    - 标签云展示角色特质（如“Queen B”、“花花公子”、“Outsider”）
    - 卡片翻转或展开交互：悬停显示一句话简介与演员真名

- **区块**: 剧情时间线 (`#timeline`)
  - **区块目标**: 按季梳理六年剧情脉络与关键转折
  - **功能点**:
    - 垂直/之字形时间轴布局，节点按年份（2007-2012）排列
    - 节点点击/悬停展开该季核心剧情梗概与关键事件列表
    - 时间轴进度条随页面滚动动态填充
    - 每季配专属季节色调或图标区分（如S1秋季入学、S6冬季结局）

- **区块**: CP关系图 (`#couples`)
  - **区块目标**: 可视化呈现剧中错综复杂的爱情关系网
  - **功能点**:
    - 关系图谱/连线矩阵展示核心CP（Chair, S&D, B&N, B&L等）
    - 节点间连线粗细/颜色代表关系强度与性质（冤家、挚爱、青梅）
    - 悬停连线高亮并浮现经典台词或关系标签
    - 支持响应式降级为垂直关系卡片列表（移动端适配）

- **区块**: 经典台词 (`#quotes`)
  - **区块目标**: 沉浸式呈现10+句双语经典台词
  - **功能点**:
    - 引用卡片样式排版（大字号英文+小字号中文翻译）
    - 卡片背景采用深色纹理与金色引号装饰
    - 鼠标悬停时卡片背景微亮并显示出处（角色/季数）
    - 支持横向滑动浏览（移动端）或瀑布流布局（桌面端）

- **区块**: 取景地指南 (`#locations`)
  - **区块目标**: 提供15+纽约实景打卡地的剧情对照指南
  - **功能点**:
    - 图文列表/卡片网格展示（地址、地标名称、对应经典场景）
    - 标签筛选功能（按“公园”、“酒店”、“学校”、“餐厅”分类）
    - 地址一键复制提示与地图图标占位
    - 悬停显示取景地背后的剧集名场面描述

- **区块**: 时尚穿搭 (`#fashion`)
  - **区块目标**: 解析剧中标志性时尚风格与文化影响
  - **功能点**:
    - 左右对比布局展示 Blair（复古名媛/发带/学院风）与 Serena（波西米亚/随性风）
    - 时尚元素关键词标签与影响力说明（Vogue/Anna Wintour 评价）
    - 悬停切换风格色板（Blair粉金系 vs Serena 蓝金系）
    - 搭配建议或标志性单品图标化展示

- **区块**: 经典配乐 (`#soundtrack`)
  - **区块目标**: 展示剧中奠定氛围的经典歌曲与插曲
  - **功能点**:
    - 音乐列表卡片（歌名、歌手、专辑、出现场景）
    - 模拟播放器UI样式（进度条、播放/暂停图标占位）
    - 悬停高亮当前歌曲，背景色随音乐情绪微调
    - 片头曲概念（The Pierces - Secret）重点突出展示

- **区块**: 演员现状 (`#cast-now`)
  - **区块目标**: 呈现6位主演戏外真实人生轨迹
  - **功能点**:
    - 人物现状时间轴或卡片列表（婚姻、事业转型、家庭）
    - “剧中 vs 现实”对比标签（如“Queen S → 死侍妻子”）
    - 悬停展开详细现状简介与代表作品链接占位
    - 排版采用优雅杂志访谈风格

- **区块**: 彩蛋与趣闻 (`#trivia`)
  - **区块目标**: 收集幕后花絮、客串与冷知识增加趣味性
  - **功能点**:
    - 网格化趣味卡片（Dan是GG、大表姐试镜、市长客串、重启版等）
    - 卡片采用“揭秘”样式（点击/悬翻揭示完整趣闻）
    - 图标化分类（🎬客串、🔄重启、🤫幕后、🏆荣誉）
    - 随机展示或滚动加载动效增强探索感

- **区块**: 页脚 (`#footer`)
  - **区块目标**: 优雅收尾，强化品牌签名与情感共鸣
  - **功能点**:
    - “XOXO, Gossip Girl” 手写体风格签名居中展示
    - 社交媒体分享占位图标（微博、小红书、Twitter等）
    - 版权信息与制作声明（粉丝非官方整理）
    - 返回顶部按钮（平滑滚动至 `#hero`）

-------

# UI 设计指南

> **场景类型**: <scene_type>prototype-app</scene_type>（应用架构设计）
> **确认检查**: 本指南适用于可交互的应用/网站/工具。如果产出物是静态报告或带进度的教程，请使用对应场景的模板。

> ℹ️ Section 1-2 为设计意图与决策上下文。Code agent 实现时以 Section 3 及之后的具体参数为准。

## 1. Design Archetype (设计原型)

### 1.1 内容理解
- **目标用户**: 《绯闻女孩》剧迷、美剧爱好者、纽约时尚文化关注者
- **核心目的**: 提供沉浸式、高质感的剧集资料库，满足粉丝收藏、打卡与怀旧需求
- **期望情绪**: 奢华、神秘、时尚、怀旧（Upper East Side 名媛氛围）
- **需避免的感受**: 廉价感、视觉杂乱、信息过载、缺乏层次

### 1.2 设计语言
- **Aesthetic Direction**: 暗色奢华杂志风。以深邃黑灰为基底，搭配奢华金与玫瑰粉点缀，结合半透明毛玻璃卡片与经典衬线排版，营造高端时尚杂志与私人俱乐部的质感。
- **Visual Signature**: 
  1. 极深灰背景 (`hsl(240 10% 5%)`) 搭配微光渐变，消除纯黑死板感
  2. 衬线标题 + 无衬线正文的强烈字重对比，复刻时尚刊头排版
  3. 半透明磨砂容器 (`backdrop-blur`) + 极细暗金边框，构建精致层级
  4. 金色/粉色作为交互与装饰强调色，克制使用（<10% 面积）
- **Emotional Tone**: 优雅、神秘、高配得感。如同翻开一本私人珍藏的 Upper East Side 社交年鉴。
- **Design Style**: **Frosted Glass 毛玻璃** (暗色质感+半透明层次+精细边框) + **Editorial 经典排版** (大字重对比+衬线/无衬线混搭) — 完美契合剧集的奢华时尚与名媛社交属性。
- **Application Type**: Landing/单页展示站

## 2. Design Principles (设计理念)
1. **氛围优先，信息次之**：首屏必须通过排版、留白与微动效瞬间建立“上东区奢华”基调，避免数据堆砌破坏沉浸感。
2. **杂志级排版节奏**：利用字号递减、字重对比（`font-black` vs `font-light`）与充裕留白控制阅读呼吸感，长内容区块需穿插视觉锚点（如金色引号、角色首字母徽章）。
3. **克制的高光点缀**：强调色仅用于关键交互、标题彩条、CP连线与状态提示。大面积区域保持低饱和度深灰，让金色/粉色成为“聚光灯”。
4. **平滑的叙事动线**：单页锚点滚动需配合视差淡入与区块揭示动效，模拟翻阅杂志或浏览画廊的流畅体验。

## 3. Color System (色彩系统)

> 基于内容理解推导配色方案，确保整体协调。
> **⚠️ App 场景配色规则**：App 子场景**禁止使用**共用预设配色方案库中的 7 个方案。App 必须根据产品定位、品牌特征和目标用户自主设计完整配色体系，参考「配色基础原则」中的衍生规则从基础色推导。

**配色设计理由**：暗色背景模拟夜晚曼哈顿的深邃与私密感；极深灰(`hsl(240 10% 5%)`)替代纯黑提升屏幕阅读舒适度；奢华金(`hsl(42 85% 58%)`)呼应剧中财富与名媛标签；玫瑰粉(`hsl(335 70% 72%)`)作为次级强调色，隐喻青春、浪漫与 Blair 的标志性发带色调。

### 3.1 主题颜色

> **App 场景约束**：当 Application Type = App 时，`primary` 与 `accent` 必须遵循「App 场景 Primary / Accent 映射规则」及差异阈值要求，避免主色与强调色过于接近。

| 角色 | CSS 变量 | Tailwind Class | HSL 值 | 设计说明 |
|-----|---------|----------------|--------|---------|
| bg | `--background` | `bg-background` | `hsl(240 10% 5%)` | 极深灰蓝，模拟深夜都市氛围，降低纯黑刺眼感 |
| surface | `--card` | `bg-card` | `hsl(240 8% 9%)` | 稍亮深灰，用于卡片/容器，与背景形成微弱层次 |
| text | `--foreground` | `text-foreground` | `hsl(0 0% 96%)` | 暖白，保证深色背景下的极高可读性 |
| textMuted | `--muted-foreground` | `text-muted-foreground` | `hsl(240 5% 65%)` | 中灰，用于次要说明、元数据、非激活态 |
| primary | `--primary` | `bg-primary` | `hsl(42 85% 58%)` | 奢华金，主行动/标题强调，传递财富与精致感 |
| primary-foreground | `--primary-foreground` | `text-primary-foreground` | `hsl(0 0% 10%)` | 深黑金，用于金色背景上的文字，确保对比度 ≥ 7:1 |
| accent | `--accent` | `bg-accent` | `hsl(335 70% 72%)` | 玫瑰粉，次级交互反馈/装饰色带/CP连线 |
| accent-foreground | `--accent-foreground` | `text-accent-foreground` | `hsl(0 0% 100%)` | 纯白，用于粉色背景上的文字 |
| border | `--border` | `border-border` | `hsl(240 8% 22%)` | 暗灰金，极细边框，构建毛玻璃容器边界 |

> **Color Token 语义速查（供 code agent 参考）**:
> - `primary` → 主行动：按钮填充、激活态高亮、关键操作 CTA、主标题点缀
> - `accent` → 状态反馈：Ghost/Outline 按钮 hover、DropdownMenu focus、Toggle 激活、Skeleton 占位背景、CP关系连线
> - `muted` → 静态非交互：禁用态背景、次级说明背景、占位文字色（`text-muted-foreground`）
> - **选择原则**：用户"可以点击" → primary；交互"正在发生" → accent；内容"不可操作" → muted

### 3.2.1 Topbar 颜色（仅当使用 Topbar 导航时参考）

> **重要**：shadcn/ui 没有 Topbar 组件，**不存在** `--topbar-*`、`--header`、`--navbar-*` 等内置 CSS 变量。请勿编造这些变量名。

**正确做法**：
- Topbar 背景使用配色方案中 `header` 角色的 HSL 值（此处复用 `bg` 或 `surface` 衍生），直接写入组件样式，例如 `bg-[hsl(240_10%_7%)]`；或在 CSS 中自行声明变量（如 `--topbar-bg`）后通过 Tailwind 引用
- 文字色需根据背景明度选择 `foreground` 或 `white`/`black`，确保对比度 ≥ 4.5:1
- 当 `header` 色与 `bg`（页面背景）相同时，需为 Topbar 添加底部边框（`border-b border-border`）以区分导航区与内容区
- **本方案 Topbar 实现**：背景 `bg-[hsl(240_10%_7%)]` + 底部边框 `border-b border-[hsl(240_8%_20%)]`，文字使用 `text-foreground`，当前锚点高亮使用 `text-primary`

## 4. Typography (字体排版)
- **Heading**: `"Playfair Display", "Noto Serif SC", "Songti SC", serif` (时尚衬线体，营造杂志刊头与奢华感)
- **Body**: `"Inter", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif` (现代无衬线，保证长文可读性与多端兼容)
- **字体导入**: 使用系统字体栈优先，`Playfair Display` 可通过 `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&display=swap');` 引入，备选回退至系统衬线。
- **层级规范**: H1 `font-black tracking-tight`, H2 `font-bold`, H3 `font-semibold`, Body `font-normal leading-relaxed`。中英文混排时，英文标题可适当缩小字号 (`-2px`) 以匹配中文视觉重心。

## 5. Global Layout Structure (全局布局结构)

### 5.1 Page Content Zones (页面区块配置)

> ⚠️ **全局统一规则**：以下参数为所有页面共享的**唯一**内容区定义。禁止按页面拆分、禁止为不同页面定义不同的 max-w。
> 禁止使用 `max-w-full` 或 `w-full` 作为内容区最大宽度（大屏溢出风险，违反全局布局契约）。

**Standard Content Zone（全页面统一）**:
- **Maximum Width**: `max-w-6xl` (约 1152px，兼顾内容密度与奢华留白)
- **Padding**: `px-4 md:px-8 py-16 md:py-24` (移动端紧凑，桌面端充裕呼吸空间)
- **Alignment**: `mx-auto`
- **Vertical Spacing**: `gap-8` / `space-y-24` (区块间大间距，保持 8px 倍数一致性)

**宽内容溢出策略**：当页面内某个组件（如多列表格、甘特图）超出 Standard Content Zone 宽度时，在该组件外层使用 `overflow-x-auto` 实现横向滚动，禁止为此放大容器 max-w。

**Hero/Banner 区块**（如适用）:
- **Width**: `w-full`（仅背景可全宽，内部文字内容仍受 Standard Content Zone 的 max-w 约束）
- **Padding**: `0`
- **Background**: `bg-gradient-to-b from-[hsl(240_10%_8%)] to-[hsl(240_10%_5%)]` 叠加极淡金色径向光晕 `radial-gradient(circle at 50% 30%, hsla(42,85%,58%,0.08) 0%, transparent 60%)`

## 6. Visual Effects & Motion (视觉效果与动效)

- **Header/Hero 视觉方案**: 全宽渐变背景 + 顶部微光晕 + 居中衬线大标题。无独立图片，依赖排版与 CSS 几何光斑营造氛围。
- **装饰手法**: 区块标题左侧添加 `w-1 h-6 bg-primary/60 rounded-full` 彩条；引用区块使用超大号半透明金色引号 `text-6xl text-primary/20` 作为背景装饰；卡片悬停时边框过渡至 `border-primary/40`。
- **圆角**: `rounded-lg` (8px) 用于内容卡片，`rounded-full` 用于按钮与标签，`rounded-sm` (4px) 用于时间轴节点。全局保持克制，避免过度圆润破坏奢华锐利感。
- **阴影**: `shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)]` 用于悬浮卡片，深色主题下使用偏冷暗的投影增强层次。
- **复杂背景文字处理**:
  - 渐变背景: 标题文字使用 `text-foreground`，若叠加在光晕区则添加 `drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]` 确保对比度
  - 图片背景: 不适用（本项目以 CSS 图形/文字为主）
  - 有色背景: 明确指定 `text-primary-foreground` 或 `text-accent-foreground`，对比度均 ≥ 4.5:1

### 6.1 动效意图

> 本节只声明动效意图（what / why），不提供实现细节（how）；禁止输出 `@keyframes` / cubic-bezier 字符串 / 完整 CSS 声明 / 具体实现技术选型。

- **整体动效风格**: 优雅、短促、以 opacity + 微位移为主，模拟高级杂志翻页与画廊灯光渐亮的质感。
- **页面入场**: 首屏 Hero 区标题与副标题依次淡入上移（stagger 延迟约 150ms），营造“大幕拉开”的仪式感。
- **滚动揭示**: 各内容区块进入视口时，卡片/列表以轻微上移+淡入方式依次显现，节奏从容（非快速闪现），增强阅读沉浸感。
- **列表项动效 · 变更模式**: `增量增删`（如时间轴节点加载、角色卡片网格渲染）
- **列表项动效 · 意图**: 节奏从容，采用 stagger 错峰入场（相邻元素延迟 50-80ms），避免整块同时出现造成的视觉冲击。
- **对话框/弹层**: 无（本项目无模态弹窗需求）
- **关键交互微动效**: 卡片悬停时轻微上浮 (`translate-y-[-4px]`) + 边框发光过渡；锚点导航点击后平滑滚动至目标区块，顶部导航项高亮状态切换伴随下划线宽度扩展动画。

## 7. Components (组件指南)

> **必须引用 Color System 中的颜色角色**（如 `primary`、`accent`、`border`）
> 每个组件需定义 Default/Hover/Active/Focus/Disabled 状态

### Buttons
- **Primary**: 背景 `bg-primary` / 文字 `text-primary-foreground` / Hover `bg-primary/90` / Active `bg-primary/80` / Focus `ring-2 ring-primary/50 ring-offset-2 ring-offset-background` / Disabled `opacity-50 cursor-not-allowed`
- **Secondary**: 背景 `bg-card` / 边框 `border-border` / 文字 `text-foreground` / Hover `border-primary/50 bg-primary/5` / Active `bg-primary/10`
- **Ghost**: 背景 透明 / 文字 `text-foreground` / Hover `bg-accent/10 text-accent` / Active `bg-accent/20`
- **Outline**: 背景 透明 / 边框 `border-border` / 文字 `text-foreground` / Hover `border-primary text-primary bg-primary/5`

### Form Elements (筛选/搜索输入框)
- **输入框**: 背景 `bg-card` / 边框 `border-border` / Focus `ring-2 ring-primary/40 border-primary/60` / Placeholder `text-muted-foreground`
- **标签/徽章**: 背景 `bg-accent/10` / 文字 `text-accent` / 边框 `border-accent/20` / Hover `bg-accent/20`

### Cards (角色/取景地/台词/趣闻卡片)
- 背景 `bg-card` / 边框 `border-border` / 阴影 `shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)]` / 圆角 `rounded-lg` / 内边距 `p-6`
- Hover: `border-primary/40 translate-y-[-4px] transition-all duration-300`
- Focus: `ring-2 ring-primary/50 ring-offset-2 ring-offset-background`

### Menu / Dropdown (导航下拉/筛选菜单)
- 容器: `bg-card border border-border shadow-xl rounded-lg p-2`
- **菜单项 Focus/Hover**: `bg-accent/10 text-accent rounded-md`

### Skeleton (加载占位)
- **加载占位**: `bg-muted animate-pulse rounded` (使用 `muted` 角色或 `hsl(240 8% 15%)`)

### Timeline Node (时间轴节点)
- 默认: 中心圆点 `w-4 h-4 rounded-full bg-border border-2 border-card`
- 激活/当前: `bg-primary border-primary shadow-[0_0_12px_hsla(42,85%,58%,0.5)]`
- 连线: `w-0.5 bg-border/50`

## 8. Flexibility Note (灵活性说明)

> **一致性优先原则**：多页应用（MPA）中，所有页面必须使用相同的核心参数（最大宽度、容器边距、圆角、阴影等），确保整体设计语言统一。
>
> **允许的微调范围**（code agent 可自行判断）：
> - 响应式断点适配（如移动端边距可减小至 `px-4`，网格列数从 4→2→1）
> - 页面内部的局部间距（如卡片内边距根据内容密度微调 `p-4`~`p-8`）
> - 单页组件（如 Modal/Tooltip）的独立样式
> - Hero 区高度在移动端可适当压缩至 `h-[60vh]`
>
> **禁止的随意变更**：
> - ❌ 不同区块使用不同的最大宽度
> - ❌ 不同区块使用不同的圆角/阴影风格
> - ❌ 引入与“暗色奢华”无关的高饱和度霓虹色或卡通装饰

## 9. Signature & Constraints (设计签名与禁区)

### DO (视觉签名)
1. **衬线标题 + 极细无衬线正文**: `font-[Playfair_Display]` 用于所有 H1/H2，搭配 `font-light` 副标题，复刻时尚杂志排版。
2. **毛玻璃层级容器**: 核心内容卡片使用 `bg-card/80 backdrop-blur-md border border-border/50`，在深色背景上营造通透悬浮感。
3. **金色高光点缀**: 关键数据、CP连线、时间轴激活态、引用块左侧彩条统一使用 `hsl(42 85% 58%)`，使用面积严格控制在 10% 以内。
4. **滚动视差淡入**: 区块进入视口时执行 `opacity: 0 -> 1, translateY: 20px -> 0` 的平滑过渡，配合 stagger 延迟。

### DON'T (禁止做法)
> 通用约束参见「通用约束」。以下为 Prototype 特有：
- ❌ 使用高饱和度纯黑 (`#000000`) 或纯白 (`#ffffff`) 作为大面积背景/文字
- ❌ 在卡片或内容区使用彩虹渐变、霓虹光效或过于活泼的圆角 (`rounded-3xl` 以上)
- ❌ 导航栏使用不透明纯色平铺，必须保持半透明毛玻璃质感以透出页面滚动内容
- ❌ 角色卡片或时间轴节点使用真实剧照图片（需求明确：用文字/图标/CSS图形代替）
- ❌ 锚点跳转使用生硬跳切，必须实现 `scroll-behavior: smooth` 并处理 Topbar 遮挡偏移 (`scroll-margin-top`)