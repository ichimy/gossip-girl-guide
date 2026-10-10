import { motion } from 'framer-motion';
import { CrownIcon } from 'lucide-react';

import heroSkyline from '@/assets/hero-upper-east-side.svg';
import { useLocale, type LText } from '@/i18n';

const TEXT = {
  eyebrow: { zh: '上东区 · 2007 — 2012', en: 'Upper East Side · 2007 — 2012' },
  titleZh: { zh: '绯闻女孩', en: 'The Upper East Side Guide' },
  subtitle: {
    zh: 'XOXO, 上东区的秘密全在这里',
    en: 'XOXO, every Upper East Side secret lives here',
  },
  quoteMain: 'You know you love me.',
  quoteSub: { zh: '你知道你爱我。XOXO, Gossip Girl.', en: 'XOXO, Gossip Girl.' },
  scrollHint: { zh: '探索更多', en: 'Explore more' },
  scrollAria: { zh: '向下滚动查看更多', en: 'Scroll down to see more' },
};

/** 标题下方的三条速览信息 */
const META: LText[] = [
  { zh: '6 季', en: '6 seasons' },
  { zh: '121 集', en: '121 episodes' },
  { zh: 'The CW', en: 'The CW' },
];

const scrollToOverview = () => {
  const el = document.querySelector('#overview');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

const quoteVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay: 0.7 },
  },
};

const arrowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1.3, duration: 0.6 },
  },
};

export default function HeroSection() {
  const { locale } = useLocale();

  return (
    <section className="relative w-full overflow-hidden">
      {/* 夜空底色 */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[hsl(240_12%_9%)] via-[hsl(240_10%_6%)] to-[hsl(240_10%_4%)]" />

      {/* 暖金色光晕，落在天际线上方 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 64%, hsla(42,85%,58%,0.10) 0%, transparent 58%)',
        }}
      />

      {/* 上东区黄昏天际线（矢量剪影，按宽度铺满，落在标题下方） */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[length:100%_auto] bg-no-repeat"
        style={{
          backgroundImage: `url(${heroSkyline})`,
          backgroundPosition: 'center 100%',
        }}
      />

      {/* 压暗层：上重下轻，保证标题可读、天际线透出 */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[hsl(240_10%_6%)]/85 via-[hsl(240_10%_6%)]/40 to-transparent" />
      {/* 与下一区块的衔接渐隐 */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-background" />

      {/* 内容 */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 pb-24 pt-20 md:px-8 md:pb-28 md:pt-24 lg:pt-28">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 眉标 */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-[11px] uppercase tracking-[0.42em] text-primary/70"
          >
            {TEXT.eyebrow[locale]}
          </motion.p>

          {/* 王冠徽章 */}
          <motion.div variants={itemVariants} className="mb-8 mt-7">
            <span className="relative flex size-14 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-primary/15 blur-lg"
              />
              <CrownIcon className="relative size-6 text-primary" />
            </span>
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            variants={itemVariants}
            className="font-serif font-black leading-[0.95]"
          >
            <span className="block bg-gradient-to-b from-[#f7dcb4] via-[#e8b563] to-[#c99049] bg-clip-text text-5xl tracking-[0.02em] text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.65)] md:text-7xl lg:text-8xl">
              GOSSIP GIRL
            </span>
            <span className="mt-5 block text-2xl tracking-[0.3em] text-foreground/90 md:text-4xl lg:text-[42px]">
              {TEXT.titleZh[locale]}
            </span>
          </motion.h1>

          {/* 菱形分隔 */}
          <motion.div variants={itemVariants} className="my-8 flex items-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50 md:w-24" />
            <span className="size-1.5 rotate-45 bg-primary/70" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50 md:w-24" />
          </motion.div>

          {/* 副标题 */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl font-sans text-base font-light tracking-[0.08em] text-muted-foreground md:text-lg"
          >
            {TEXT.subtitle[locale]}
          </motion.p>

          {/* 速览信息 */}
          <motion.ul
            variants={itemVariants}
            className="mt-7 flex flex-wrap items-center justify-center gap-2"
          >
            {META.map((item) => (
              <li
                key={item.en}
                className="rounded-full border border-border/60 bg-white/[0.02] px-3.5 py-1 text-[11px] tracking-wider text-muted-foreground backdrop-blur-sm"
              >
                {item[locale]}
              </li>
            ))}
          </motion.ul>

          {/* 经典台词 */}
          <motion.blockquote variants={quoteVariants} className="relative mt-14 max-w-2xl px-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 select-none font-serif text-5xl leading-none text-primary/20"
            >
              {'"'}
            </span>
            <p className="font-serif text-xl italic leading-relaxed text-foreground/90 md:text-2xl">
              {TEXT.quoteMain}
            </p>
            <p className="mt-2 font-sans text-xs tracking-wide text-muted-foreground md:text-sm">
              {TEXT.quoteSub[locale]}
            </p>
          </motion.blockquote>

          {/* 滚动指示：细线 + 下移光点 */}
          <motion.div variants={arrowVariants} className="mt-14 md:mt-16">
            <button
              type="button"
              onClick={scrollToOverview}
              aria-label={TEXT.scrollAria[locale]}
              className="group flex flex-col items-center gap-3"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                {TEXT.scrollHint[locale]}
              </span>
              <span className="relative block h-12 w-px overflow-hidden bg-gradient-to-b from-primary/40 to-transparent">
                <motion.span
                  className="absolute left-1/2 top-0 size-1 -translate-x-1/2 rounded-full bg-primary"
                  animate={{ y: [0, 40, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
