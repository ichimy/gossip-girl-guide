import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, CalendarIcon } from 'lucide-react';

import './timeline.css';
import { useLocale, type LText } from '@/i18n';

const TEXT = {
  title: { zh: '剧情时间轴', en: 'Story Timeline' },
  intro1: {
    zh: '六年青春，六季故事。从上东区的名媛舞会到布鲁克林的文艺角落，',
    en: 'Six years, six stories. From debutante balls on the Upper East Side to artsy corners of Brooklyn,',
  },
  intro2: {
    zh: '每一季都是一段无法复制的青春记忆。',
    en: 'every season is a piece of youth you can never relive.',
  },
  seasonLabel: { zh: '季', en: 'Season' },
};

interface ISeasonData {
  season: number;
  year: string;
  title: LText;
  icon: string;
  color: string;
  summary: LText;
  events: LText[];
}

const SEASONS_DATA: ISeasonData[] = [
  {
    season: 1,
    year: '2007',
    title: { zh: '神秘归来', en: 'The Mysterious Return' },
    icon: '🍂',
    color: 'hsl(26 90% 49%)',
    summary: {
      zh: 'Serena van der Woodsen 在消失一年后神秘回到纽约上东区，她的出现搅动了原本平静的社交圈。Blair 与男友 Nate 的关系因 Serena 的归来而产生裂痕，Dan 与 Serena 开始了一段跨越阶层的恋情。',
      en: 'Serena van der Woodsen returns to the Upper East Side after a year away, shaking up a social circle that had settled without her. Blair\u2019s relationship with Nate cracks because of her return, while Dan and Serena begin a romance that crosses class lines.',
    },
    events: [
      { zh: 'Serena 在 Grand Central 车站神秘现身', en: 'Serena appears mysteriously at Grand Central' },
      { zh: 'Dan 与 Serena 的跨阶层初恋', en: 'Dan and Serena\u2019s class-crossing first love' },
      { zh: 'Blair 与 Nate 感情出现裂痕', en: 'Blair and Nate\u2019s relationship starts to crack' },
      { zh: 'Chuck 的花花公子面具下的孤独', en: 'The loneliness behind Chuck\u2019s playboy mask' },
      { zh: 'Jenny 渴望融入上东区社交圈', en: 'Jenny longs to break into the Upper East Side circle' },
      { zh: 'Gossip Girl 博客引爆校园八卦', en: 'The Gossip Girl blog sets campus gossip alight' }
    ]
  },
  {
    season: 2,
    year: '2008',
    title: { zh: '爱恨纠缠', en: 'Love and Hate, Entangled' },
    icon: '❄️',
    color: 'hsl(221 83% 53%)',
    summary: {
      zh: 'Blair 和 Chuck 在分分合合中逐渐发现彼此才是真爱，但两人习惯了用游戏方式相处。Nate 住进 Dan 家后对 Jenny 产生特别感情，Jenny 的设计才华开始绽放。',
      en: 'Through endless break-ups and make-ups, Blair and Chuck slowly realise they are each other\u2019s true love — though both are addicted to playing games. Nate moves in with the Humphreys and grows close to Jenny, whose design talent starts to shine.',
    },
    events: [
      { zh: 'Blair 与 Chuck 的捕获游戏', en: 'Blair and Chuck\u2019s game of cat and mouse' },
      { zh: 'Nate 暂住 Dan 家，与 Jenny 暗生情愫', en: 'Nate stays with the Humphreys and falls for Jenny' },
      { zh: 'Jenny 获得 Waldorf 工作室机会', en: 'Jenny gets an opening at Waldorf Designs' },
      { zh: 'Serena 与 Dan 学习做普通朋友', en: 'Serena and Dan try to be just friends' },
      { zh: 'Georgina Sparks 首次登场搅局', en: 'Georgina Sparks arrives to stir up trouble' },
      { zh: 'Jenny 开始筹划个人时尚品牌', en: 'Jenny starts planning her own fashion line' }
    ]
  },
  {
    season: 3,
    year: '2009',
    title: { zh: '修成正果', en: 'Finally Together' },
    icon: '🌸',
    color: 'hsl(335 70% 72%)',
    summary: {
      zh: 'Chuck 和 Blair 的爱情长跑终于修成正果，但 Georgina 带着复仇计划强势归来。Dan 与 Serena 同父异母的兄弟 Scott 出现，上东区再次上演精彩故事。',
      en: 'Chuck and Blair\u2019s long courtship finally pays off, but Georgina returns with a revenge plan. Scott, Dan and Serena\u2019s half-brother, appears out of nowhere, and the Upper East Side drama rolls on.',
    },
    events: [
      { zh: 'Chuck 买下 Empire Hotel 成为老板', en: 'Chuck buys the Empire Hotel and becomes its owner' },
      { zh: 'Chuck 与 Blair 正式确立关系', en: 'Chuck and Blair make it official' },
      { zh: 'Georgina 复仇计划启动', en: 'Georgina\u2019s revenge plan begins' },
      { zh: 'Scott Humphrey 神秘现身', en: 'Scott Humphrey shows up out of nowhere' },
      { zh: 'Jenny 成为 Constance 新女王', en: 'Jenny becomes the new queen of Constance' },
      { zh: 'Dan 与 Olivia 的明星恋情', en: 'Dan\u2019s romance with the movie star Olivia' }
    ]
  },
  {
    season: 4,
    year: '2010',
    title: { zh: '巴黎迷情', en: 'A Paris Affair' },
    icon: '🗼',
    color: 'hsl(292 54% 76%)',
    summary: {
      zh: 'Blair 和 Serena 在巴黎度过浪漫夏天，而 Chuck 在纽约经历枪伤痛苦并失忆，甚至忘记了 Blair。失忆的 Chuck 交了法国女友，受折磨的他能否记起对 Blair 的感情仍是未知数。',
      en: 'Blair and Serena spend a romantic summer in Paris while Chuck, shot and suffering from amnesia in New York, forgets Blair entirely. He takes a French girlfriend — and whether he can remember his feelings for Blair stays uncertain.',
    },
    events: [
      { zh: 'Blair 与 Serena 巴黎夏日之旅', en: 'Blair and Serena\u2019s summer in Paris' },
      { zh: 'Chuck 中枪失忆，忘记 Blair', en: 'Chuck is shot, loses his memory and forgets Blair' },
      { zh: 'Chuck 与法国新情人出现', en: 'Chuck turns up with a new French lover' },
      { zh: 'Nate 遇到神秘女子 Juliet', en: 'Nate meets the mysterious Juliet' },
      { zh: 'Dan 与 Juliet 的复仇阴谋', en: 'Dan and Juliet\u2019s revenge plot' },
      { zh: '时尚之夜活动盛大举行', en: 'A grand fashion night takes place' }
    ]
  },
  {
    season: 5,
    year: '2011',
    title: { zh: '王室婚礼', en: 'The Royal Wedding' },
    icon: '👑',
    color: 'hsl(42 85% 58%)',
    summary: {
      zh: 'Blair 痛苦地筹备与摩纳哥王子 Louis 的王室婚礼，规矩森严的皇室让她喘不过气。Dan 发现如实书写身边的朋友错综复杂。Charlie 表妹意外归来威胁 Vander Woodsen 家族。',
      en: 'Blair painfully plans her royal wedding to Prince Louis of Monaco, suffocating under palace protocol. Dan finds that writing honestly about his friends is complicated, and cousin Charlie\u2019s sudden return threatens the van der Woodsens.',
    },
    events: [
      { zh: 'Blair 筹备与 Louis 王子的婚礼', en: 'Blair prepares her wedding to Prince Louis' },
      { zh: 'Chuck 环球之旅寻找新生活方式', en: 'Chuck travels the world looking for a new way to live' },
      { zh: 'Dan 写作陷入道德困境', en: 'Dan hits a moral wall in his writing' },
      { zh: 'Georgina 再次介入 Dan 的生活', en: 'Georgina inserts herself into Dan\u2019s life again' },
      { zh: 'Charlie 表妹意外归来', en: 'Cousin Charlie returns unexpectedly' },
      { zh: 'Blair 与 Dan 的意外组合', en: 'The unexpected pairing of Blair and Dan' }
    ]
  },
  {
    season: 6,
    year: '2012',
    title: { zh: '终极揭秘', en: 'The Final Reveal' },
    icon: '✨',
    color: 'hsl(46 100% 52%)',
    summary: {
      zh: '最终季，所有人寻找失踪的 Serena。Blair 下决心帮助 Chuck 战胜父亲以长相厮守。Dan 的新书揭露更多丑闻引起轰动。Nate 坚定不移地探查 Gossip Girl 的底细，最终身份揭晓。',
      en: 'In the final season everyone searches for the missing Serena. Blair resolves to help Chuck defeat his father so they can be together. Dan\u2019s new book stirs up an even bigger scandal, and Nate keeps digging into who Gossip Girl really is — until the identity is revealed at last.',
    },
    events: [
      { zh: 'Serena 神秘失踪后携新男友回归', en: 'Serena vanishes, then returns with a new boyfriend' },
      { zh: 'Blair 与 Chuck 低调结婚', en: 'Blair and Chuck marry quietly' },
      { zh: 'Dan 新书引爆更大丑闻', en: 'Dan\u2019s new book sparks a bigger scandal' },
      { zh: 'Nate 追查 Gossip Girl 真实身份', en: 'Nate hunts down Gossip Girl\u2019s real identity' },
      { zh: 'Dan 就是 Gossip Girl 终极揭秘', en: 'Dan is Gossip Girl — the ultimate reveal' },
      { zh: '上东区居民最后的聚会告别', en: 'The Upper East Siders gather for one last goodbye' }
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

const TimelineSection = () => {
  const { locale } = useLocale();

  const [expandedSeason, setExpandedSeason] = useState<number | null>(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      const scrolledIntoView = windowHeight - elementTop;
      const totalScrollable = elementHeight + windowHeight * 0.5;
      const progress = Math.min(Math.max(scrolledIntoView / totalScrollable, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSeason = (season: number) => {
    setExpandedSeason(prev => prev === season ? null : season);
  };

  return (
    <section id="timeline" className="w-full bg-background" ref={timelineRef}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-primary/60 rounded-full" />
            <span className="text-sm font-medium text-primary tracking-wider uppercase">
              2007 — 2012
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            {TEXT.title[locale]}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {TEXT.intro1[locale]}
            <br className="hidden md:block" />
            {TEXT.intro2[locale]}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="timeline-line" />
          <div className="timeline-progress" style={{ height: `${scrollProgress * 100}%` }} />

          {/* Seasons List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative space-y-12 md:space-y-16"
          >
            {SEASONS_DATA.map((season, index) => {
              const isExpanded = expandedSeason === season.season;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={season.season}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 z-10">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSeason(season.season)}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-[0_0_20px_-4px_rgba(0_0_0_0.6)] transition-all duration-300 border-2"
                      style={{
                        backgroundColor: isExpanded ? season.color : 'hsl(240 8% 9%)',
                        borderColor: isExpanded ? season.color : 'hsl(240 8% 22%)',
                        boxShadow: isExpanded ? `0 0 20px -4px ${season.color}60` : undefined
                      }}
                    >
                      {season.icon}
                    </motion.button>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-48px)] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <motion.div
                      className="bg-card border border-border rounded-lg shadow-[0_4px_20px_-4px_rgba(0_0_0_0.6)] overflow-hidden transition-all duration-300 hover:border-primary/40"
                      whileHover={{ y: -4 }}
                    >
                      {/* Card Header */}
                      <button
                        onClick={() => toggleSeason(season.season)}
                        className="w-full p-6 text-left flex items-start gap-4"
                      >
                        <div className="shrink-0">
                          <div className="flex items-center gap-2 mb-1">
                            <CalendarIcon className="size-4 text-muted-foreground" />
                            <span className="text-xs font-medium text-muted-foreground">
                              {season.year}
                            </span>
                          </div>
                          <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                            {locale === 'zh'
                              ? `第 ${season.season} 季`
                              : `${TEXT.seasonLabel[locale]} ${season.season}`}
                          </h3>
                          <p className="text-sm text-primary mt-1">{season.title[locale]}</p>
                        </div>
                        <div className="ml-auto shrink-0">
                          {isExpanded ? (
                            <ChevronUpIcon className="size-5 text-muted-foreground" />
                          ) : (
                            <ChevronDownIcon className="size-5 text-muted-foreground" />
                          )}
                        </div>
                      </button>

                      {/* Expandable Content */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 border-t border-border/50">
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 mt-4">
                            {season.summary[locale]}
                          </p>
                          <ul className="space-y-2">
                            {season.events.map((event, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-foreground/80"
                              >
                                <span
                                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: season.color }}
                                />
                                {event[locale]}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
