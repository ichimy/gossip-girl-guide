import type { ReactNode } from 'react';

import { useLocale, type LText } from '@/i18n';

interface SectionHeaderProps {
  /** 区块标题 */
  title: LText;
  /** 标题上方的窄字距小标（可选，用于交代该区块的语境） */
  eyebrow?: LText;
  /** 标题下方的一句话简介 */
  intro?: ReactNode;
  /** 居中排版用于整块内容对称的区块（配乐、关系图） */
  align?: 'left' | 'center';
  className?: string;
}

/**
 * 统一的区块标题：金色竖条 + 衬线标题 + 简介。
 * 全站区块共用，保证字号、间距、配色一致。
 */
export const SectionHeader = ({
  title,
  eyebrow,
  intro,
  align = 'left',
  className = '',
}: SectionHeaderProps) => {
  const { locale } = useLocale();
  const isCentered = align === 'center';

  return (
    <div className={className}>
      {eyebrow && (
        <p
          className={`mb-3 font-sans text-[11px] uppercase tracking-[0.34em] text-primary/70 ${
            isCentered ? 'text-center' : ''
          }`}
        >
          {eyebrow[locale]}
        </p>
      )}

      <div
        className={`flex items-center gap-3 ${isCentered ? 'justify-center' : ''}`}
      >
        {/* 居左排版用竖条；居中排版去掉竖条，避免标题被挤得偏离中心 */}
        {!isCentered && (
          <span aria-hidden="true" className="h-6 w-1 shrink-0 rounded-full bg-primary/60" />
        )}
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title[locale]}
        </h2>
      </div>

      {/* 居中排版用一条短金线补回视觉重心 */}
      {isCentered && (
        <span
          aria-hidden="true"
          className="mx-auto mt-5 block h-px w-20 bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        />
      )}

      {intro && (
        <p
          className={`${isCentered ? 'mt-5' : 'mt-4'} text-base leading-relaxed text-muted-foreground md:text-lg ${
            isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
