import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, StarIcon, RefreshCwIcon, EyeIcon, TrophyIcon } from 'lucide-react';

import { useLocale, type LText } from '@/i18n';

const TEXT = {
  title: { zh: '彩蛋与趣闻', en: 'Trivia & Easter Eggs' },
  intro: {
    zh: '幕后花絮、客串明星、重启版……上东区的秘密远不止于此',
    en: 'Behind-the-scenes stories, guest stars, the reboot… the Upper East Side keeps plenty more secrets',
  },
  reveal: { zh: '点击揭秘', en: 'Tap to reveal' },
};

interface ITriviaItem {
  id: number;
  category: 'guest' | 'reboot' | 'behind' | 'award';
  title: LText;
  summary: LText;
  detail: LText;
  icon: string;
}

const TRIVIA_DATA: ITriviaItem[] = [
  {
    id: 1,
    category: 'behind',
    title: { zh: 'Dan 就是 Gossip Girl', en: 'Dan is Gossip Girl' },
    summary: { zh: '最终季揭晓的最大悬念', en: 'The biggest reveal of the final season' },
    detail: { zh: '在第六季大结局中，Dan Humphrey 被揭露就是运营 Gossip Girl 博客的神秘人物。他用自己的亲身经历写出了上流社会的另一面，最终也因此收获了 Serena 的芳心。', en: 'In the season six finale, Dan Humphrey is unmasked as the mysterious voice behind the Gossip Girl blog. He turned his own life into a window on high society — and won Serena over in the end.' },
    icon: '🤫',
  },
  {
    id: 2,
    category: 'guest',
    title: { zh: '大表姐曾试镜 Serena', en: 'Jennifer Lawrence auditioned for Serena' },
    summary: { zh: 'Jennifer Lawrence 的错失角色', en: 'The role that got away' },
    detail: { zh: '在剧集选角初期，后来凭借《饥饿游戏》和《X战警》爆红的 Jennifer Lawrence 曾参与 Serena 角色的试镜，但最终角色落在了 Blake Lively 身上。', en: 'Early in casting, Jennifer Lawrence — later famous for The Hunger Games and X-Men — read for Serena, but the part went to Blake Lively.' },
    icon: '🎬',
  },
  {
    id: 3,
    category: 'guest',
    title: { zh: '纽约市长亲自客串', en: 'The Mayor of New York dropped by' },
    summary: { zh: '第 100 集庆功特别时刻', en: 'A special moment for episode 100' },
    detail: { zh: '在 Gossip Girl 第 100 集庆功记者会上，时任纽约市长 Bloomberg 亲自到场，并宣布将 1 月 26 日定为纽约市的"Gossip Girl Day"。', en: 'At the press event marking the 100th episode, then-Mayor Bloomberg appeared in person and declared 26 January "Gossip Girl Day" in New York City.' },
    icon: '🎬',
  },
  {
    id: 4,
    category: 'guest',
    title: { zh: 'Lady Gaga 惊喜出镜', en: 'Lady Gaga made a surprise appearance' },
    summary: { zh: '流行天后的跨界演出', en: 'A pop icon crossing over' },
    detail: { zh: 'Lady Gaga 在剧中客串演出，与主角们产生互动。此外，冬兵 Sebastian Stan、川普女儿 Ivanka Trump 等大牌明星也曾挤破头争取短短几秒的客串机会。', en: 'Lady Gaga guest-starred and shared scenes with the leads. Sebastian Stan and Ivanka Trump were among the names angling for a few seconds of screen time too.' },
    icon: '🎬',
  },
  {
    id: 5,
    category: 'reboot',
    title: { zh: '2021 年 HBO Max 重启版', en: 'The 2021 HBO Max reboot' },
    summary: { zh: '新一代上东区故事', en: 'A new generation on the Upper East Side' },
    detail: { zh: '2021 年 7 月，HBO Max 推出了《绯闻女孩》重启版，延续原版故事讲述八年后新一代富二代男女们的错综复杂关系。Kristen Bell 回归担任旁白。', en: 'In July 2021 HBO Max launched a Gossip Girl reboot, picking up eight years later with a new generation of privileged teenagers and their tangled relationships. Kristen Bell returned as the narrator.' },
    icon: '🔄',
  },
  {
    id: 6,
    category: 'award',
    title: { zh: '连续三年青少年选择奖', en: 'Three years of Teen Choice Awards' },
    summary: { zh: '2008-2010 最佳剧情剧集', en: 'Choice Drama Series 2008-2010' },
    detail: { zh: '《绯闻女孩》自 2008 年起连续三年获得美国青少年选择奖最佳剧情剧集奖，Blake Lively 也凭借该剧获得最佳突破 TV 女星奖和最佳剧情 TV 女演员奖。', en: 'The show won the Teen Choice Award for Choice Drama Series three years running from 2008, while Blake Lively picked up Breakout TV Star and Choice TV Actress (Drama).' },
    icon: '🏆',
  },
  {
    id: 7,
    category: 'behind',
    title: { zh: 'Queen B 原型是真人', en: 'Queen B was based on a real person' },
    summary: { zh: '奥利维亚·巴勒莫的灵感来源', en: 'Inspired by Olivia Palermo' },
    detail: { zh: 'Blair Waldorf 的角色原型被认为是纽约社交名媛奥利维亚·巴勒莫（Olivia Palermo），她标志性的发带和学院风穿搭成为无数女生模仿的对象。', en: 'Blair Waldorf is widely believed to be modelled on New York socialite Olivia Palermo, whose headbands and preppy outfits were copied by girls everywhere.' },
    icon: '🤫',
  },
  {
    id: 8,
    category: 'behind',
    title: { zh: '片头曲的诞生', en: 'How the theme song was born' },
    summary: { zh: 'The Pierces - Secret', en: 'The Pierces - Secret' },
    detail: { zh: '剧中片头概念曲 The Pierces 的《Secret》以其神秘慵懒的嗓音完美契合了 Gossip Girl 的旁白气质，成为剧集最具辨识度的音乐符号。', en: 'The Pierces\' "Secret" matched the tone of Gossip Girl\'s narration perfectly with its mysterious, languid vocal, becoming the show\'s most recognisable musical signature.' },
    icon: '🤫',
  },
  {
    id: 9,
    category: 'reboot',
    title: { zh: '重启版第二季即完结', en: 'The reboot ended after season two' },
    summary: { zh: '2023 年被 HBO Max 取消', en: 'Cancelled by HBO Max in 2023' },
    detail: { zh: '新版《绯闻女孩》在播出两季后于 2023 年 1 月被 HBO Max 取消。主创 Josh Safran 透露希望为该剧找到新的下家，但复活之路漫长而艰难。', en: 'The new Gossip Girl was cancelled by HBO Max in January 2023 after two seasons. Showrunner Josh Safran said he hoped to find the show a new home, but a revival proved a long, hard road.' },
    icon: '🔄',
  },
  {
    id: 10,
    category: 'award',
    title: { zh: '时尚界的宠儿', en: 'A darling of the fashion world' },
    summary: { zh: 'Vogue 与 Anna Wintour 的推崇', en: 'Championed by Vogue and Anna Wintour' },
    detail: { zh: '女魔头 Anna Wintour 是 Blake Lively 的头号迷妹，逢人就夸她是"美国的国民美女"，经常带她去秀场坐前排。老佛爷 Karl Lagerfeld 更是亲自给她拍广告。', en: 'Anna Wintour is Blake Lively\'s number one fan, calling her "America\'s sweetheart" at every turn and bringing her to the front row. Karl Lagerfeld even shot an ad campaign with her himself.' },
    icon: '🏆',
  },
  {
    id: 11,
    category: 'guest',
    title: { zh: 'Sebastian Stan 客串', en: 'Sebastian Stan cameoed' },
    summary: { zh: '"冬兵"的早期演出', en: 'An early role for the Winter Soldier' },
    detail: { zh: '后来在漫威宇宙中饰演"冬兵"巴基的 Sebastian Stan 曾在《绯闻女孩》中客串演出，当时他还远未获得如今的国际知名度。', en: 'Sebastian Stan, later Bucky Barnes in the Marvel universe, guest-starred on Gossip Girl long before he was known worldwide.' },
    icon: '🎬',
  },
  {
    id: 12,
    category: 'behind',
    title: { zh: '希拉里·达夫客串', en: 'Hilary Duff cameoed' },
    summary: { zh: '第三季大明星一角', en: 'A movie-star role in season three' },
    detail: { zh: '迪士尼童星出身的 Hilary Duff 在第三季中客串饰演一位大明星角色，与 Dan Humphrey 展开热恋，成为该季最受关注的客串之一。', en: 'Former Disney child star Hilary Duff guest-starred in season three as a famous actress who falls for Dan Humphrey — one of the season\'s most talked-about cameos.' },
    icon: '🤫',
  },
];

const CATEGORY_MAP = {
  all: { label: { zh: '全部趣闻', en: 'All stories' } as LText, icon: SparklesIcon },
  guest: { label: { zh: '客串明星', en: 'Guest stars' } as LText, icon: StarIcon },
  reboot: { label: { zh: '重启动态', en: 'Reboot' } as LText, icon: RefreshCwIcon },
  behind: { label: { zh: '幕后花絮', en: 'Behind the scenes' } as LText, icon: EyeIcon },
  award: { label: { zh: '荣誉奖项', en: 'Awards' } as LText, icon: TrophyIcon },
};

type CategoryKey = keyof typeof CATEGORY_MAP;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function TriviaSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { locale } = useLocale();

  const filteredData =
    activeCategory === 'all'
      ? TRIVIA_DATA
      : TRIVIA_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="trivia" className="w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-primary/60 rounded-full" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {TEXT.title[locale]}
            </h2>
          </div>
          <p className="text-muted-foreground text-lg ml-4">
            {TEXT.intro[locale]}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 ml-4">
          {(Object.keys(CATEGORY_MAP) as CategoryKey[]).map((key) => {
            const { label, icon: Icon } = CATEGORY_MAP[key];
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                <Icon className="size-4" />
                {label[locale]}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((trivia) => {
              const isExpanded = expandedId === trivia.id;
              return (
                <motion.div
                  key={trivia.id}
                  layout
                  variants={itemVariants}
                  onClick={() => setExpandedId(isExpanded ? null : trivia.id)}
                  className={`bg-card border rounded-lg p-6 cursor-pointer transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0_0_0_0.6)] ${
                    isExpanded
                      ? 'border-primary/60 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/40 hover:translate-y-[-4px]'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl shrink-0">{trivia.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg leading-tight">
                        {trivia.title[locale]}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">{trivia.summary[locale]}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-border/50">
                          <p className="text-foreground/90 text-sm leading-relaxed">
                            {trivia.detail[locale]}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isExpanded && (
                    <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                      <span className="text-primary">{TEXT.reveal[locale]}</span> →
                    </p>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
