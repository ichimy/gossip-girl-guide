import React from 'react';
import { CalendarIcon, TvIcon, BookOpenIcon, AwardIcon, StarIcon, TrophyIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import SectionHeader from '@/components/SectionHeader';
import { useLocale, type LText } from '@/i18n';
import { CARD, CARD_PADDING, PANEL } from '@/lib/surface';

const TEXT = {
  title: { zh: '剧集概览', en: 'Series Overview' },
  intro: {
    zh: '从 2007 年秋季到 2012 年冬季，《绯闻女孩》用六年时间书写了上东区最奢华的青春物语。改编自 Cecily von Ziegesar 的同名畅销小说，这部剧不仅定义了整整一代人的时尚审美，更成为青春偶像剧史上无法逾越的经典。',
    en: "From the autumn of 2007 to the winter of 2012, Gossip Girl spent six years chronicling the Upper East Side's most extravagant coming-of-age story. Adapted from Cecily von Ziegesar's bestselling novels, it defined a generation's sense of style and became an unrepeatable classic of teen drama.",
  },
  awardsTitle: { zh: '荣誉与奖项', en: 'Awards & Honors' },
  settingLabel: { zh: '📍 故事背景：', en: '📍 Setting: ' },
  settingBody: {
    zh: '纽约曼哈顿上东区（Upper East Side）—— 这里是全美最富裕的社区之一，汇聚了顶级私立学校、奢侈品旗舰店和百年历史的豪华公寓。剧中的康斯坦斯·比尔拉德学校（Constance Billard）和圣裘德学校（St. Jude\u2019s）虽然是虚构的，但灵感来源于真实的上东区精英教育机构。',
    en: "Manhattan's Upper East Side — one of the wealthiest neighbourhoods in the United States, home to elite private schools, luxury flagships and century-old apartment buildings. Constance Billard and St. Jude's are fictional, but they were inspired by real Upper East Side institutions.",
  },
};

interface IOverviewCardProps {
  icon: React.ReactNode;
  label: LText;
  value: LText;
  description?: LText;
}

const OverviewCard: React.FC<IOverviewCardProps> = ({ icon, label, value, description }) => {
  const { locale } = useLocale();

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -4, borderColor: 'hsla(42, 85%, 58%, 0.4)' }}
    className={`group relative ${CARD} ${CARD_PADDING} transition-all duration-300`}
  >
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground mb-1">{label[locale]}</p>
        <p className="text-xl font-bold text-foreground font-serif tracking-tight">{value[locale]}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{description[locale]}</p>
        )}
      </div>
    </div>
    </motion.div>
  );
};

interface IBadgeProps {
  icon: React.ReactNode;
  text: LText;
  variant?: 'gold' | 'pink' | 'default';
}

const Badge: React.FC<IBadgeProps> = ({ icon, text, variant = 'default' }) => {
  const { locale } = useLocale();
  const variantClasses = {
    gold: 'bg-primary/10 text-primary border-primary/20',
    pink: 'bg-accent/10 text-accent border-accent/20',
    default: 'bg-muted/50 text-muted-foreground border-border',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${variantClasses[variant]}`}
    >
      {icon}
      <span>{text[locale]}</span>
    </motion.div>
  );
};

const OverviewSection: React.FC = () => {
  const { locale } = useLocale();

  const overviewData = [
    {
      icon: <CalendarIcon className="size-6" />,
      label: { zh: '播出年份', en: 'Air dates' },
      value: { zh: '2007 - 2012', en: '2007 - 2012' },
      description: {
        zh: '五年青春陪伴，从秋季入学到冬季终章',
        en: 'Six seasons of growing up, from fall enrollment to the winter finale',
      },
    },
    {
      icon: <TvIcon className="size-6" />,
      label: { zh: '季数 / 集数', en: 'Seasons / Episodes' },
      value: { zh: '6 季 / 121 集', en: '6 seasons / 121 episodes' },
      description: {
        zh: '每集约 42 分钟，总计超过 84 小时的上东区故事',
        en: 'About 42 minutes per episode — more than 84 hours of Upper East Side drama',
      },
    },
    {
      icon: <BookOpenIcon className="size-6" />,
      label: { zh: '原著作者', en: 'Original author' },
      value: { zh: 'Cecily von Ziegesar', en: 'Cecily von Ziegesar' },
      description: {
        zh: '改编自同名畅销小说系列，还原纽约上流社会青春物语',
        en: "Adapted from the bestselling novel series about Manhattan's privileged teenagers",
      },
    },
    {
      icon: <StarIcon className="size-6" />,
      label: { zh: '播出平台', en: 'Network' },
      value: { zh: 'The CW', en: 'The CW' },
      description: {
        zh: '美国 CW 电视台，每周二晚 21:00 黄金档播出',
        en: 'Aired on The CW in the US primetime slot',
      },
    },
  ];

  const awards = [
    {
      icon: <TrophyIcon className="size-4" />,
      text: {
        zh: '青少年选择奖 最佳剧情剧集 (2008-2010 连续三年)',
        en: 'Teen Choice Award, Choice Drama Series (three years running, 2008-2010)',
      },
      variant: 'gold' as const,
    },
    {
      icon: <AwardIcon className="size-4" />,
      text: { zh: 'Blake Lively 最佳突破 TV 女星奖', en: 'Blake Lively, Breakout TV Star' },
      variant: 'pink' as const,
    },
    {
      icon: <StarIcon className="size-4" />,
      text: { zh: 'Leighton Meester 最佳剧情 TV 女演员', en: 'Leighton Meester, Choice TV Actress (Drama)' },
      variant: 'gold' as const,
    },
    {
      icon: <TrophyIcon className="size-4" />,
      text: {
        zh: '纽约市设立 "Gossip Girl Day" (1月26日)',
        en: 'New York City declared a "Gossip Girl Day" (January 26)',
      },
      variant: 'pink' as const,
    },
  ];

  return (
    <section id="overview" className="w-full bg-gradient-to-b from-[hsl(240_10%_8%)] to-[hsl(240_10%_5%)] relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
        {/* 区块标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <SectionHeader
            eyebrow={{ zh: '关于这部剧', en: 'About the show' }}
            title={TEXT.title}
            intro={TEXT.intro[locale]}
          />
        </motion.div>

        {/* 四宫格数据卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {overviewData.map((item, index) => (
            <motion.div
              key={item.label.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <OverviewCard {...item} />
            </motion.div>
          ))}
        </div>

        {/* 奖项与荣誉徽章 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-foreground font-serif mb-6 flex items-center gap-2">
            <TrophyIcon className="size-5 text-primary" />
            {TEXT.awardsTitle[locale]}
          </h3>
          <div className="flex flex-wrap gap-3">
            {awards.map((award, index) => (
              <motion.div
                key={award.text.en}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Badge {...award} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 补充信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`mt-12 p-6 ${PANEL}`}
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-primary font-semibold">{TEXT.settingLabel[locale]}</span>
            {TEXT.settingBody[locale]}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OverviewSection;
