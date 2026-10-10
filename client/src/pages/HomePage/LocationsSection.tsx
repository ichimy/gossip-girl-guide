import React, { useState } from 'react';
import { MapPinIcon, CopyIcon, CheckIcon, EyeIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import SectionHeader from '@/components/SectionHeader';
import { useLocale, type LText } from '@/i18n';
import { CARD } from '@/lib/surface';

type CategoryKey = 'all' | 'park' | 'hotel' | 'school' | 'restaurant' | 'landmark';

const TEXT = {
  title: { zh: '纽约取景打卡指南', en: 'New York Filming Locations' },
  intro: {
    zh: '16 个经典拍摄地，跟着《绯闻女孩》走遍曼哈顿',
    en: '16 iconic filming spots — tour Manhattan with Gossip Girl',
  },
  sceneLabel: { zh: '名场面', en: 'Iconic scene' },
  copyAddress: { zh: '复制地址', en: 'Copy address' },
  empty: { zh: '该分类下暂无取景地', en: 'No locations in this category yet' },
};

const CATEGORIES: Array<{ key: CategoryKey; label: LText }> = [
  { key: 'all', label: { zh: '全部', en: 'All' } },
  { key: 'park', label: { zh: '公园', en: 'Parks' } },
  { key: 'hotel', label: { zh: '酒店', en: 'Hotels' } },
  { key: 'school', label: { zh: '学校', en: 'Schools' } },
  { key: 'restaurant', label: { zh: '餐厅', en: 'Restaurants' } },
  { key: 'landmark', label: { zh: '地标', en: 'Landmarks' } },
];

interface ILocation {
  id: number;
  name: string;
  nameEn: string;
  address: string;
  category: CategoryKey;
  scene: LText;
  season: string;
  icon: string;
}

const LOCATIONS: ILocation[] = [
  { id: 1, name: '大都会博物馆台阶', nameEn: 'The Met Steps', address: '1000 5th Ave, New York, NY 10028', category: 'landmark', scene: { zh: 'Blair 的午餐王座，每天与跟班们坐在这里统治康斯坦斯中学的社交等级', en: "Blair's lunchtime throne, where she ruled Constance's social hierarchy with her minions every day" }, season: 'S1-S6', icon: '🏛️' },
  { id: 2, name: '中央车站', nameEn: 'Grand Central Terminal', address: '89 E 42nd St, New York, NY 10017', category: 'landmark', scene: { zh: 'Serena 从寄宿学校神秘归来的经典开场，Dan 在人群中第一次看到她', en: 'The classic opening: Serena returns mysteriously from boarding school and Dan sees her for the first time in the crowd' }, season: 'S1-S5', icon: '🚂' },
  { id: 3, name: '帝国酒店', nameEn: 'The Empire Hotel', address: '44 W 63rd St, New York, NY 10023', category: 'hotel', scene: { zh: 'Chuck 买下这家酒店后，屋顶酒吧成为权力博弈和与 Blair 浪漫重聚的据点', en: "After Chuck buys the hotel, its rooftop bar becomes the stage for power plays and romantic reunions with Blair" }, season: 'S3-S6', icon: '🏨' },
  { id: 4, name: '纽约宫殿酒店', nameEn: 'The Palace Hotel (Lotte New York Palace)', address: '455 Madison Ave, New York, NY 10022', category: 'hotel', scene: { zh: 'van der Woodsen 和 Bass 家族前几季的住所，Dan 紧张地在这里接 Serena 第一次约会', en: "Home to the van der Woodsens and the Basses in the early seasons, and where a nervous Dan picks Serena up for their first date" }, season: 'S1-S3', icon: '🏰' },
  { id: 5, name: '贝塞斯达露台与喷泉', nameEn: 'Bethesda Terrace & Fountain', address: 'Mid-Park at 72nd St, Central Park, NY 10024', category: 'park', scene: { zh: 'Chuck 和 Blair 在喷泉前深情拥吻，中央公园最浪漫的打卡地', en: "Chuck and Blair's passionate kiss by the fountain — Central Park's most romantic photo spot" }, season: 'S1-S4', icon: '⛲' },
  { id: 6, name: '帝国大厦', nameEn: 'Empire State Building', address: '20 W 34th St, New York, NY 10001', category: 'landmark', scene: { zh: 'Chuck 在观景台等待 Blair，两人最终和解的定情之地', en: 'Chuck waits for Blair on the observation deck — where the two finally reconcile' }, season: 'S3-S5', icon: '🏙️' },
  { id: 7, name: '弓桥', nameEn: 'Bow Bridge', address: 'Central Park, New York, NY 10024', category: 'park', scene: { zh: 'Chuck 和 Blair 在桥上漫步的浪漫场景，中央公园最具标志性的铁桥', en: "A romantic walk for Chuck and Blair on Central Park's most iconic cast-iron bridge" }, season: 'S2-S4', icon: '🌉' },
  { id: 8, name: '哥伦比亚大学', nameEn: 'Columbia University', address: '116th St & Broadway, New York, NY 10027', category: 'school', scene: { zh: '剧中作为 Yale 场景的取景地，Blair 和 Serena 的大学时光', en: 'Used as a stand-in for Yale — the college years of Blair and Serena' }, season: 'S4-S5', icon: '🎓' },
  { id: 9, name: '第五大道 1136 号', nameEn: "1136 5th Ave (Blair's Building)", address: '1136 5th Ave, New York, NY 10029', category: 'landmark', scene: { zh: 'Blair 家的外立面，上东区最知名的公寓楼之一', en: 'The facade of Blair\u2019s home, one of the best-known apartment buildings on the Upper East Side' }, season: 'S1-S6', icon: '🏠' },
  { id: 10, name: '广场酒店', nameEn: 'The Plaza Hotel', address: '768 5th Ave, New York, NY 10019', category: 'hotel', scene: { zh: 'Blair 在酒店举办奢华派对和名媛社交活动的经典场景', en: 'Where Blair hosts her lavish parties and debutante social events' }, season: 'S1-S3', icon: '✨' },
  { id: 11, name: '圣詹姆斯教堂', nameEn: 'St. James Church', address: 'Madison Ave & E 71st St, New York, NY 10021', category: 'landmark', scene: { zh: 'Blair 与摩纳哥王子 Louis 举行盛大王室婚礼的教堂', en: "The church where Blair and Prince Louis of Monaco hold their grand royal wedding" }, season: 'S5', icon: '⛪' },
  { id: 12, name: '中央公园沃尔曼溜冰场', nameEn: 'Central Park Wollman Rink', address: 'Central Park, New York, NY 10019', category: 'park', scene: { zh: '角色们在冬季溜冰的浪漫场景，纽约冬日约会圣地', en: 'Winter skating scenes for the whole cast — a New York date-night classic' }, season: 'S2-S6', icon: '⛸️' },
  { id: 13, name: '迪伦糖果吧', nameEn: "Dylan's Candy Bar", address: '1111 3rd Ave, New York, NY 10065', category: 'restaurant', scene: { zh: 'Blair 和 Serena 逛街时最爱的甜品店，色彩缤纷的糖果天堂', en: "Blair and Serena's favourite sweet shop while shopping — a colourful candy paradise" }, season: 'S1-S3', icon: '🍬' },
  { id: 14, name: '巴里奥奇诺餐厅', nameEn: 'Barrio Chino', address: '10 Thompson St, New York, NY 10012', category: 'restaurant', scene: { zh: '角色们聚餐和社交的热门餐厅，上流社会年轻人的聚集地', en: 'A favourite hangout for dinners and socialising among the young upper class' }, season: 'S2-S4', icon: '🍽️' },
  { id: 15, name: '布莱恩特公园', nameEn: 'Bryant Park', address: '42nd St & 6th Ave, New York, NY 10018', category: 'park', scene: { zh: '时尚周活动场地和角色们休闲散步的场景，纽约时尚中心', en: 'Fashion Week venue and a casual strolling spot — the centre of New York fashion' }, season: 'S3-S5', icon: '🌳' },
  { id: 16, name: '高线公园', nameEn: 'The High Line', address: 'New York, NY 10011', category: 'park', scene: { zh: 'Dan 和 Serena 在废弃高架铁路改造的公园中漫步谈心的场景', en: 'Dan and Serena walk and talk through the park built on a disused elevated railway' }, season: 'S4-S6', icon: '🚶' },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function LocationsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { locale } = useLocale();

  const filtered = activeCategory === 'all'
    ? LOCATIONS
    : LOCATIONS.filter((l) => l.category === activeCategory);

  const handleCopy = async (address: string, id: number) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section className="w-full" id="locations">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Section Header */}
        <SectionHeader
          className="mb-12 md:mb-16"
          eyebrow={{ zh: '纽约 · 16 处', en: 'New York · 16 spots' }}
          title={TEXT.title}
          intro={TEXT.intro[locale]}
        />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10 ml-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              {cat.label[locale]}
            </button>
          ))}
        </div>

        {/* Locations Grid */}
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filtered.map((loc) => (
            <motion.div
              key={loc.id}
              variants={item}
              className={`group relative ${CARD} overflow-hidden transition-all duration-300 hover:border-primary/40 hover:-translate-y-1`}
              onMouseEnter={() => setHoveredId(loc.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card Header */}
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{loc.icon}</span>
                  <span className="text-xs text-primary/80 font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                    {loc.season}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                  {locale === 'zh' ? loc.name : loc.nameEn}
                </h3>
                <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                  {locale === 'zh' ? loc.nameEn : loc.name}
                </p>
              </div>

              {/* Address */}
              <div className="px-5 pb-4">
                <div className="flex items-start gap-2">
                  <MapPinIcon className="size-3.5 text-primary/60 mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground leading-relaxed flex-1 min-w-0">
                    {loc.address}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(loc.address, loc.id);
                    }}
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors p-1"
                    aria-label={TEXT.copyAddress[locale]}
                  >
                    {copiedId === loc.id ? (
                      <CheckIcon className="size-3.5 text-success" />
                    ) : (
                      <CopyIcon className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Hover Scene Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-background/95 via-background/90 to-background/80 backdrop-blur-sm p-5 flex flex-col justify-end transition-opacity duration-300 ${
                  hoveredId === loc.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <EyeIcon className="size-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {TEXT.sceneLabel[locale]}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {loc.scene[locale]}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground bg-card/50 px-2 py-1 rounded">
                    {CATEGORIES.find((c) => c.key === loc.category)?.label[locale]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {TEXT.empty[locale]}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
