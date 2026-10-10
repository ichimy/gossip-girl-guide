import { motion } from 'framer-motion';
import { QuoteIcon } from 'lucide-react';

import SectionHeader from '@/components/SectionHeader';
import { useLocale } from '@/i18n';
import { CARD, CARD_PADDING } from '@/lib/surface';

const TEXT = {
  title: { zh: '经典台词', en: 'Iconic Quotes' },
  intro: {
    zh: '那些刻在青春记忆里的句子，每一句都是上东区的秘密密码',
    en: 'Lines carved into a generation\u2019s memory — each one a secret code of the Upper East Side',
  },
};

interface IQuote {
  id: number;
  en: string;
  zh: string;
  character: string;
  season: string;
  /** 季数需要英文展示时使用（如「全季」） */
  seasonEn?: string;
}

const QUOTES: IQuote[] = [
  {
    id: 1,
    en: "Three words, eight letters, say it, and I'm yours.",
    zh: "三个词，八个字母，说出来，我就是你的。",
    character: 'Chuck Bass',
    season: 'S2',
  },
  {
    id: 2,
    en: "I'm Chuck Bass.",
    zh: "我是 Chuck Bass。",
    character: 'Chuck Bass',
    season: 'S1',
  },
  {
    id: 3,
    en: 'You know you love me. XOXO, Gossip Girl.',
    zh: '你知道你爱我。亲亲抱抱，绯闻女孩。',
    character: 'Gossip Girl',
    season: '全季',
    seasonEn: 'All seasons',
  },
  {
    id: 4,
    en: 'With friends like these, who needs armies?',
    zh: '有这样的朋友，谁还需要千军万马？',
    character: 'Blair Waldorf',
    season: 'S1',
  },
  {
    id: 5,
    en: "Those who say money can't buy happiness just don't know where to shop.",
    zh: '那些说钱买不到快乐的人，只是不知道去哪买。',
    character: 'Blair Waldorf',
    season: 'S2',
  },
  {
    id: 6,
    en: "I'm not a princess, I'm a Queen.",
    zh: '我不是公主，我是女王。',
    character: 'Blair Waldorf',
    season: 'S3',
  },
  {
    id: 7,
    en: 'Dan Humphrey, lonely boy.',
    zh: 'Dan Humphrey，孤独男孩。',
    character: 'Gossip Girl',
    season: 'S6',
  },
  {
    id: 8,
    en: 'The only way to survive high school is to have friends.',
    zh: '在高中生存下去的唯一方法就是拥有朋友。',
    character: 'Serena van der Woodsen',
    season: 'S1',
  },
  {
    id: 9,
    en: "I don't want to be like you. I want to be you.",
    zh: '我不想成为像你一样的人，我想成为你。',
    character: 'Jenny Humphrey',
    season: 'S2',
  },
  {
    id: 10,
    en: 'Power is the ultimate aphrodisiac.',
    zh: '权力是最强的催情剂。',
    character: 'Chuck Bass',
    season: 'S4',
  },
  {
    id: 11,
    en: "Sometimes you have to let go of the life you planned to have the life that's waiting for you.",
    zh: '有时候你必须放下计划好的生活，才能拥有等待你的生活。',
    character: 'Serena van der Woodsen',
    season: 'S5',
  },
  {
    id: 12,
    en: 'Love is not love which alters when it alteration finds.',
    zh: '爱不是爱，若因变化而改变。',
    character: 'Blair Waldorf',
    season: 'S3',
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const QuotesSection = () => {
  const { locale } = useLocale();

  return (
    <section id="quotes" className="w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Section Header */}
        <SectionHeader
          className="mb-12 md:mb-16"
          eyebrow={{ zh: '金句集锦', en: 'Best lines' }}
          title={TEXT.title}
          intro={TEXT.intro[locale]}
        />

        {/* Quotes Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px', amount: 0.1 }}
        >
          {QUOTES.map((quote) => (
            <motion.div
              key={quote.id}
              variants={item}
              className={`group relative ${CARD} ${CARD_PADDING} transition-all duration-300 hover:border-primary/40 hover:-translate-y-1`}
            >
              {/* Background Quote Decoration */}
              <div className="absolute top-3 left-4 text-6xl text-primary/10 font-serif leading-none select-none pointer-events-none">
                &ldquo;
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* English Quote */}
                <p className="font-serif text-base md:text-lg text-foreground leading-relaxed mb-3 min-h-[80px]">
                  {quote.en}
                </p>

                {/* 中文翻译：仅在中文界面显示（英文界面下原句即台词本身） */}
                {locale === 'zh' && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {quote.zh}
                  </p>
                )}

                {/* Divider */}
                <div className="w-8 h-px bg-gradient-to-r from-primary/60 to-transparent mb-3" />

                {/* Source - Hidden by default, shown on hover */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QuoteIcon className="size-3 text-primary/60" />
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      {quote.character}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {locale === 'en' ? (quote.seasonEn ?? quote.season) : quote.season}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default QuotesSection;
