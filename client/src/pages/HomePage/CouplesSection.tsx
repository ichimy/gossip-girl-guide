import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { HeartIcon, StarIcon, CrownIcon, SparklesIcon } from 'lucide-react';
import { useRef } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { Image } from '@/components/ui/image';
import { CARD, CARD_PADDING_COMPACT, PANEL } from '@/lib/surface';
import serenaImg from '../../../../shared/static/images/serena.webp';
import blairImg from '../../../../shared/static/images/blair.webp';
import chuckImg from '../../../../shared/static/images/chuck.webp';
import nateImg from '../../../../shared/static/images/nate.webp';
import danImg from '../../../../shared/static/images/dan.webp';
import jennyImg from '../../../../shared/static/images/jenny.webp';
import vanessaImg from '../../../../shared/static/images/vanessa.webp';
import georginaImg from '../../../../shared/static/images/georgina.webp';
import { useLocale, type LText, type Locale } from '@/i18n';

const TEXT = {
  title: { zh: 'CP关系图', en: 'Relationship Map' },
  intro: {
    zh: '上东区最错综复杂的爱情关系网——从冤家到灵魂伴侣，从青梅竹马到王室婚姻',
    en: 'The most tangled love web on the Upper East Side — from sworn rivals to soulmates, childhood sweethearts to a royal marriage',
  },
  connections: { zh: '关系连线:', en: 'Connections:' },
  relationType: { zh: '关系类型:', en: 'Type:' },
};

/** 关系性质的展示文案（内部 key 仍用中文，便于与图表配置对应） */
const NATURE_LABEL: Record<string, LText> = {
  挚爱: { zh: '挚爱', en: 'True love' },
  青梅: { zh: '青梅', en: 'Childhood sweetheart' },
  婚姻: { zh: '婚姻', en: 'Marriage' },
  短暂: { zh: '短暂', en: 'Brief fling' },
  暧昧: { zh: '暧昧', en: 'Flirtation' },
  复杂: { zh: '复杂', en: 'Complicated' },
  好友: { zh: '好友', en: 'Friends' },
};

const natureLabel = (key: string, locale: Locale) => NATURE_LABEL[key]?.[locale] ?? key;

// ============ Data ============

interface ICharacter {
  id: string;
  name: string;
  shortName: string;
  gender: 'female' | 'male';
  tag?: string;
  photo?: string;
}

interface IRelationship {
  source: string;
  target: string;
  label: LText;
  type: '挚爱' | '青梅' | '婚姻' | '短暂' | '暧昧' | '复杂' | '好友';
  quote?: LText;
}

const CHARACTERS: ICharacter[] = [
  { id: 'blair', name: 'Blair Waldorf', shortName: 'Blair', gender: 'female', tag: 'Queen B', photo: blairImg },
  { id: 'chuck', name: 'Chuck Bass', shortName: 'Chuck', gender: 'male', tag: 'Bad Boy', photo: chuckImg },
  { id: 'serena', name: 'Serena van der Woodsen', shortName: 'Serena', gender: 'female', tag: 'Queen S', photo: serenaImg },
  { id: 'nate', name: 'Nate Archibald', shortName: 'Nate', gender: 'male', tag: 'Golden Boy', photo: nateImg },
  { id: 'dan', name: 'Dan Humphrey', shortName: 'Dan', gender: 'male', tag: 'Lonely Boy', photo: danImg },
  { id: 'jenny', name: 'Jenny Humphrey', shortName: 'Jenny', gender: 'female', tag: 'Little J', photo: jennyImg },
  { id: 'vanessa', name: 'Vanessa Abrams', shortName: 'Vanessa', gender: 'female', tag: 'V', photo: vanessaImg },
  { id: 'georgina', name: 'Georgina Sparks', shortName: 'Georgina', gender: 'female', tag: 'G', photo: georginaImg },
  { id: 'louis', name: 'Louis Grimaldi', shortName: 'Louis', gender: 'male', tag: 'Prince' },
  { id: 'carter', name: 'Carter Baizen', shortName: 'Carter', gender: 'male', tag: 'Con Man' },
];

const RELATIONSHIPS: IRelationship[] = [
  { source: 'chuck', target: 'blair', label: { zh: 'Chair', en: 'Chair' }, type: '挚爱', quote: { zh: '"Three words, eight letters, say it, and I\'m yours."', en: '"Three words, eight letters, say it, and I\'m yours."' } },
  { source: 'serena', target: 'dan', label: { zh: 'S&D', en: 'S&D' }, type: '挚爱', quote: { zh: '"我从来没有忘记过她。"', en: '"I never forgot her."' } },
  { source: 'nate', target: 'blair', label: { zh: '高中情侣', en: 'High-school couple' }, type: '青梅', quote: { zh: '"从幼儿园开始，我就知道他是我要嫁的人。"', en: '"Since kindergarten, I knew he was the one I would marry."' } },
  { source: 'nate', target: 'serena', label: { zh: '短暂交往', en: 'Brief relationship' }, type: '短暂' },
  { source: 'nate', target: 'vanessa', label: { zh: '长期交往', en: 'Long-term relationship' }, type: '青梅' },
  { source: 'nate', target: 'jenny', label: { zh: '暧昧', en: 'Flirtation' }, type: '暧昧' },
  { source: 'blair', target: 'louis', label: { zh: '婚姻', en: 'Marriage' }, type: '婚姻', quote: { zh: '"我要的是童话般的婚礼。"', en: '"I want a fairy-tale wedding."' } },
  { source: 'dan', target: 'vanessa', label: { zh: '好友/前任', en: 'Friends / exes' }, type: '好友' },
  { source: 'serena', target: 'carter', label: { zh: '复杂关系', en: 'Complicated' }, type: '复杂' },
  { source: 'chuck', target: 'vanessa', label: { zh: '短暂交往', en: 'Brief relationship' }, type: '短暂' },
  { source: 'dan', target: 'georgina', label: { zh: '一夜情', en: 'One night' }, type: '复杂' },
  { source: 'serena', target: 'nate', label: { zh: '三角关系', en: 'Love triangle' }, type: '短暂' },
];

const typeColorMap: Record<string, string> = {
  '挚爱': '#e84393',
  '青梅': '#fd79a8',
  '婚姻': '#74b9ff',
  '短暂': '#a29bfe',
  '暧昧': '#d63031',
  '复杂': '#e17055',
  '好友': '#00b894',
};

const typeLineStyleMap: Record<string, { type?: string; width: number }> = {
  '挚爱': { width: 4 },
  '青梅': { width: 3 },
  '婚姻': { width: 3 },
  '短暂': { width: 1.5 },
  '暧昧': { type: 'dashed', width: 2 },
  '复杂': { type: 'dashed', width: 2 },
  '好友': { width: 2 },
};

// ============ ECharts Option Builder ============

function buildGraphOption(locale: Locale): EChartsOption {
  const nodes = CHARACTERS.map((char) => ({
    id: char.id,
    name: char.shortName,
    fullName: char.name,
    tag: char.tag,
    gender: char.gender,
    symbolSize: char.photo ? 60 : (char.gender === 'female' ? 55 : 50),
    symbol: char.photo ? `image://${char.photo}` : undefined,
    itemStyle: {
      color: char.photo ? undefined : (char.gender === 'female' ? '#e84393' : '#d4a574'),
      borderColor: char.id === 'blair' ? '#f1c40f' : (char.photo ? '#d4a574' : '#555'),
      borderWidth: char.id === 'blair' ? 3 : 2,
      shadowColor: char.id === 'blair' ? 'rgba(241,196,15,0.4)' : 'rgba(0,0,0,0.5)',
      shadowBlur: char.id === 'blair' ? 20 : 10,
    },
    label: {
      show: true,
      position: 'bottom' as const,
      fontSize: 12,
      fontWeight: (char.id === 'blair' ? 'bold' : 'normal') as 'bold' | 'normal',
    },
    category: char.gender,
  }));

  const links = RELATIONSHIPS.map((rel) => ({
    source: rel.source,
    target: rel.target,
    relLabel: rel.label[locale],
    relType: rel.type,
    quote: rel.quote?.[locale],
    lineStyle: {
      color: typeColorMap[rel.type],
      width: typeLineStyleMap[rel.type].width,
      type: (typeLineStyleMap[rel.type].type || 'solid') as 'solid' | 'dashed' | 'dotted',
      curveness: 0.15,
    },
  }));

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(26,26,35,0.95)',
      borderColor: '#444',
      textStyle: { color: '#f0f0f0', fontSize: 13 },
      // ECharts 的 formatter 入参是「对象 | 对象数组」联合类型，
      // 这里按运行时实际形态（graph 节点/连线）取值
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          const char = CHARACTERS.find((c) => c.id === params.data.id);
          const rels = RELATIONSHIPS.filter(
            (r) => r.source === params.data.id || r.target === params.data.id
          );
          const relHtml = rels
            .map((r) => {
              const otherId = r.source === params.data.id ? r.target : r.source;
              const other = CHARACTERS.find((c) => c.id === otherId);
              return `<div style="margin:4px 0;color:${typeColorMap[r.type]}">● ${r.label[locale]} — ${other?.shortName} (${natureLabel(r.type, locale)})</div>`;
            })
            .join('');
          return `<div style="min-width:180px">
            <div style="font-size:15px;font-weight:bold;margin-bottom:6px">${params.data.fullName}</div>
            ${char?.tag ? `<div style="color:#888;font-size:12px;margin-bottom:8px">${char.tag}</div>` : ''}
            <div style="border-top:1px solid #444;padding-top:6px;margin-top:6px">
              <div style="color:#888;font-size:11px;margin-bottom:4px">${TEXT.connections[locale]}</div>
              ${relHtml}
            </div>
          </div>`;
        }
        if (params.dataType === 'edge') {
          const rel = RELATIONSHIPS.find(
            (r) =>
              (r.source === params.data.source && r.target === params.data.target) ||
              (r.source === params.data.target && r.target === params.data.source)
          );
          const src = CHARACTERS.find((c) => c.id === params.data.source);
          const tgt = CHARACTERS.find((c) => c.id === params.data.target);
          return `<div style="min-width:200px">
            <div style="font-size:14px;font-weight:bold;color:${typeColorMap[rel?.type || '短暂']};margin-bottom:6px">
              ${rel?.label[locale] ?? ''}
            </div>
            <div style="color:#ccc;font-size:12px">${src?.shortName} ↔ ${tgt?.shortName}</div>
            <div style="color:#888;font-size:11px;margin-top:4px">${TEXT.relationType[locale]} ${natureLabel(rel?.type ?? '', locale)}</div>
            ${rel?.quote ? `<div style="color:#d4a574;font-size:11px;font-style:italic;margin-top:6px;border-top:1px solid #444;padding-top:6px">${rel.quote}</div>` : ''}
          </div>`;
        }
        return '';
      },
    },
    legend: {
      show: true,
      orient: 'horizontal' as const,
      bottom: 0,
      textStyle: { color: '#999', fontSize: 11 },
      data: Object.keys(typeColorMap).map((key) => natureLabel(key, locale)),
      itemWidth: 20,
      itemHeight: 3,
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 400,
          gravity: 0.08,
          edgeLength: [120, 200],
          layoutAnimation: true,
        },
        roam: true,
        draggable: true,
        focusNodeAdjacency: true,
        categories: [
          { name: 'female', itemStyle: { color: '#e84393' } },
          { name: 'male', itemStyle: { color: '#d4a574' } },
        ],
        data: nodes,
        links: links,
        lineStyle: {
          color: '#666',
          curveness: 0.15,
        },
        label: {
          show: true,
          position: 'bottom' as const,
          fontSize: 12,
          color: '#e0e0e0',
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4,
          },
          itemStyle: {
            shadowBlur: 25,
            shadowColor: 'rgba(212,165,116,0.6)',
          },
        },
      },
    ],
    grid: {
      top: 20,
      bottom: 60,
      left: 20,
      right: 20,
    },
  };

  return option;
}

// ============ Mobile Card Data ============

const MOBILE_COUPLES = [
  {
    shortName: 'Chair',
    name1: 'Chuck Bass',
    name2: 'Blair Waldorf',
    photo1: chuckImg,
    photo2: blairImg,
    nature: '挚爱' as const,
    quote: { zh: '"Three words, eight letters, say it, and I\'m yours."', en: '"Three words, eight letters, say it, and I\'m yours."' },
    description: { zh: '从冤家到灵魂伴侣，全剧最经典的爱情线。', en: 'From rivals to soulmates — the most iconic love story of the series.' },
    color: 'from-[#e84393] to-[#d4a574]',
  },
  {
    shortName: 'S&D',
    name1: 'Serena',
    name2: 'Dan Humphrey',
    photo1: serenaImg,
    photo2: danImg,
    nature: '挚爱' as const,
    quote: { zh: '"我从来没有忘记过她。"', en: '"I never forgot her."' },
    description: { zh: '布鲁克林男孩与上东区公主的跨越阶级之恋。', en: 'A Brooklyn boy and an Upper East Side princess, in love across the class divide.' },
    color: 'from-[#74b9ff] to-[#d4a574]',
  },
  {
    shortName: 'B&N',
    name1: 'Blair',
    name2: 'Nate Archibald',
    photo1: blairImg,
    photo2: nateImg,
    nature: '青梅' as const,
    quote: { zh: '"从幼儿园开始，我就知道他是我要嫁的人。"', en: '"Since kindergarten, I knew he was the one I was going to marry."' },
    description: { zh: '从幼儿园就开始的初恋，纯真而美好。', en: 'A first love that began in kindergarten — innocent and sweet.' },
    color: 'from-[#fd79a8] to-[#fab1a0]',
  },
  {
    shortName: 'B&L',
    name1: 'Blair',
    name2: 'Louis Grimaldi',
    photo1: blairImg,
    photo2: undefined,
    nature: '婚姻' as const,
    quote: { zh: '"我要的是童话般的婚礼。"', en: '"I want a fairy-tale wedding."' },
    description: { zh: '摩纳哥王子的浪漫求婚，但最终她选择了Chuck。', en: 'A romantic proposal from a Monaco prince — but in the end she chose Chuck.' },
    color: 'from-[#74b9ff] to-[#a29bfe]',
  },
];

const natureIcons = {
  '挚爱': <HeartIcon className="size-4 text-[#e84393]" />,
  '青梅': <StarIcon className="size-4 text-[#d4a574]" />,
  '婚姻': <CrownIcon className="size-4 text-[#74b9ff]" />,
  '过客': <SparklesIcon className="size-4 text-[#888]" />,
  '短暂': <SparklesIcon className="size-4 text-[#a29bfe]" />,
  '暧昧': <HeartIcon className="size-4 text-[#d63031]" />,
  '复杂': <SparklesIcon className="size-4 text-[#e17055]" />,
  '好友': <StarIcon className="size-4 text-[#00b894]" />,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// ============ Component ============

export default function CouplesSection() {
  const chartRef = useRef<ReactECharts>(null);
  const { locale } = useLocale();

  return (
    <section id="couples" className="w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionHeader
            align="center"
            eyebrow={{ zh: '爱情关系网', en: 'Love & Relationships' }}
            title={TEXT.title}
            intro={TEXT.intro[locale]}
          />
        </motion.div>

        {/* Desktop: ECharts Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className={`hidden md:block ${PANEL} p-4`}
        >
          <ReactECharts
            ref={chartRef}
            option={buildGraphOption(locale)}
            style={{ height: '600px', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>

        {/* Mobile: Card List */}
        <motion.div
          className="md:hidden space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {MOBILE_COUPLES.map((couple) => (
            <motion.div
              key={couple.shortName}
              variants={itemVariants}
              className={`${CARD} ${CARD_PADDING_COMPACT}`}
            >
              {/* Couple Photos */}
              <div className="flex items-center justify-center gap-4 mb-4">
                {couple.photo1 ? (
                  <Image
                    src={couple.photo1}
                    alt={couple.name1}
                    className="w-16 h-16 rounded-full object-cover object-top border-2 border-primary/30 shadow-[0_0_12px_rgba(212_165_116_0.3)]"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-card border-2 border-border flex items-center justify-center text-muted-foreground font-serif text-lg">
                    {couple.name1.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col items-center">
                  <span className={`text-xs font-semibold bg-gradient-to-r ${couple.color} bg-clip-text text-transparent`}>
                    {couple.shortName}
                  </span>
                  {natureIcons[couple.nature]}
                </div>
                {couple.photo2 ? (
                  <Image
                    src={couple.photo2}
                    alt={couple.name2}
                    className="w-16 h-16 rounded-full object-cover object-top border-2 border-primary/30 shadow-[0_0_12px_rgba(212_165_116_0.3)]"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-card border-2 border-border flex items-center justify-center text-muted-foreground font-serif text-lg">
                    {couple.name2.charAt(0)}
                  </div>
                )}
              </div>

              {/* Names */}
              <div className="text-center mb-3">
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {couple.name1} & {couple.name2}
                </h3>
                <span className="text-xs text-muted-foreground">{natureLabel(couple.nature, locale)}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground text-center mb-3">
                {couple.description[locale]}
              </p>

              {/* Quote */}
              <div className="p-3 rounded-md bg-primary/5 border border-primary/20">
                <p className="text-xs text-foreground/80 italic text-center">
                  {couple.quote[locale]}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
