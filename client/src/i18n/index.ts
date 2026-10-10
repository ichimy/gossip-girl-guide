export { LocaleProvider, useLocale } from './locale';
export type { Locale, LocaleContextValue } from './locale';

/**
 * 双语内容类型：页面内容直接写成 { zh, en } 字面量，用 locale 取值，
 * 便于贡献者在同一个位置看到两种语言、方便校对。
 */
export interface LText {
  zh: string;
  en: string;
}

/** 双语列表（如台词、标签） */
export type LTextList = {
  zh: string[];
  en: string[];
};
