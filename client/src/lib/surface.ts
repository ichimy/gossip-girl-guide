/**
 * 卡片与面板的统一表面样式。
 * 全站卡片共用这几个常量，避免圆角、阴影、边框各写各的。
 */

/** 实心内容卡片：角色、取景地、台词、趣闻、演员卡等 */
export const CARD =
  'bg-card border border-border rounded-lg shadow-[0_4px_20px_-4px_rgba(0_0_0_0.6)]';

/** 卡片悬停：金色描边 + 上浮 4px */
export const CARD_HOVER =
  'transition-all duration-300 hover:border-primary/40 hover:-translate-y-1';

/** 毛玻璃面板：图表容器、说明块等需要透出背景层次的地方 */
export const PANEL = 'bg-card/80 border border-border/50 rounded-lg backdrop-blur-md';

/** 内边距两档：常规卡片与紧凑卡片 */
export const CARD_PADDING = 'p-6';
export const CARD_PADDING_COMPACT = 'p-5';
