import React from 'react';
import { CrownIcon, SparklesIcon, GemIcon, ShirtIcon, RibbonIcon, StarIcon, QuoteIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import blairImg from '../../../../shared/static/images/blair.webp';
import serenaImg from '../../../../shared/static/images/serena.webp';
import SectionHeader from '@/components/SectionHeader';
import { useLocale, type LText } from '@/i18n';
import { CARD } from '@/lib/surface';

const TEXT = {
  title: { zh: '时尚穿搭', en: 'Fashion & Style' },
  intro: {
    zh: '上东区两大女王的风格对决——Blair 的精致名媛风 vs Serena 的随性波西米亚风',
    en: "A style showdown between the Upper East Side's two queens — Blair's polished debutante look vs Serena's effortless boho",
  },
  signatureItems: { zh: '标志性单品', en: 'Signature pieces' },
  influenceTitle: { zh: '时尚影响力', en: 'Fashion influence' },
  blairEffect: { zh: 'Blair 效应', en: 'The Blair effect' },
  serenaEffect: { zh: 'Serena 效应', en: 'The Serena effect' },
  vogueQuote: {
    zh: '《绯闻女孩》不仅仅是一部电视剧，它是当代年轻人的时尚圣经。Blair 和 Serena 的穿搭直接影响了全球快时尚品牌的设计方向。',
    en: 'Gossip Girl was more than a TV show — it was a style bible for a generation. Blair and Serena\u2019s wardrobes directly shaped the direction of fast-fashion brands worldwide.',
  },
  vogueSource: { zh: '—— Vogue 时尚评论', en: '— Vogue' },
};

const FASHION_DATA = {
  blair: {
    name: 'Blair Waldorf',
    title: { zh: '复古名媛风', en: 'Vintage debutante' },
    subtitle: { zh: 'Queen B 的精致衣橱', en: "Queen B's curated wardrobe" },
    photo: blairImg,
    color: 'from-[hsl(335_70%_72%)] to-[hsl(42_85%_58%)]',
    borderColor: 'border-[hsl(335_70%_72%)]',
    bgColor: 'bg-[hsl(335_70%_72%)]',
    textColor: 'text-[hsl(335_70%_72%)]',
    bgLight: 'bg-[hsl(335_70%_72%)]/10',
    tags: [
      { zh: '发带控', en: 'Headband addict' },
      { zh: '学院风', en: 'Preppy' },
      { zh: '复古连衣裙', en: 'Vintage dresses' },
      { zh: '高定礼服', en: 'Couture gowns' },
      { zh: '珍珠配饰', en: 'Pearls' },
      { zh: '蝴蝶结', en: 'Bows' },
    ] as LText[],
    items: [
      { icon: RibbonIcon, name: { zh: '标志性发带', en: 'The signature headband' }, desc: { zh: '右侧蝴蝶结是 Blair 的灵魂标识', en: 'A bow on the right — Blair\u2019s soul signature' } },
      { icon: GemIcon, name: { zh: '珍珠项链', en: 'Pearl necklace' }, desc: { zh: '上东区名媛的标配珠宝', en: 'Standard-issue jewellery for an Upper East Side princess' } },
      { icon: ShirtIcon, name: { zh: '格纹百褶裙', en: 'Plaid pleated skirt' }, desc: { zh: 'Constance 校服风延伸', en: 'An extension of the Constance uniform look' } },
      { icon: CrownIcon, name: { zh: '高定晚礼服', en: 'Couture gown' }, desc: { zh: 'Met Gala 级别的红毯造型', en: 'Met Gala-level red-carpet dressing' } },
    ],
    quote: { zh: '"那些说钱买不到快乐的人，他们只是不知道去哪买。"', en: '"Those who say money can\'t buy happiness just don\'t know where to shop."' },
    influence: {
      zh: 'Blair 的发带造型引领了 2008-2012 年全球少女时尚潮流，成为复古学院风的代名词。',
      en: "Blair's headbands drove global teen fashion from 2008 to 2012 and became shorthand for the vintage preppy look.",
    },
  },
  serena: {
    name: 'Serena van der Woodsen',
    title: { zh: '波西米亚随性风', en: 'Effortless boho' },
    subtitle: { zh: 'Golden Girl 的自由灵魂', en: "The Golden Girl's free spirit" },
    photo: serenaImg,
    color: 'from-[hsl(42_85%_58%)] to-[hsl(200_70%_65%)]',
    borderColor: 'border-[hsl(42_85%_58%)]',
    bgColor: 'bg-[hsl(42_85%_58%)]',
    textColor: 'text-[hsl(42_85%_58%)]',
    bgLight: 'bg-[hsl(42_85%_58%)]/10',
    tags: [
      { zh: '金色长发', en: 'Golden waves' },
      { zh: '流苏元素', en: 'Fringe' },
      { zh: '随性连衣裙', en: 'Slip dresses' },
      { zh: '皮夹克', en: 'Leather jackets' },
      { zh: '长靴', en: 'Tall boots' },
      { zh: '度假风', en: 'Resort wear' },
    ] as LText[],
    items: [
      { icon: SparklesIcon, name: { zh: '金属感连衣裙', en: 'Metallic dress' }, desc: { zh: '派对女王的不二之选', en: 'The party queen\u2019s first choice' } },
      { icon: ShirtIcon, name: { zh: '做旧皮夹克', en: 'Worn-in leather jacket' }, desc: { zh: '叛逆与优雅的完美平衡', en: 'Rebellion and elegance in perfect balance' } },
      { icon: StarIcon, name: { zh: '过膝长靴', en: 'Over-the-knee boots' }, desc: { zh: '秋冬街拍标志性单品', en: 'The autumn street-style staple' } },
      { icon: CrownIcon, name: { zh: '度假风长裙', en: 'Resort maxi dress' }, desc: { zh: 'Hamptons 周末度假必备', en: 'Essential for Hamptons weekends' } },
    ],
    quote: { zh: '"我不需要成为任何人期待的样子，我只做 Serena。"', en: '"I don\'t need to be who anyone expects me to be. I\'m just Serena."' },
    influence: {
      zh: 'Anna Wintour 公开称赞 Blake Lively 为"美国的国民美女"，Serena 的随性风格成为 Vogue 多次专题报道的灵感来源。',
      en: 'Anna Wintour publicly called Blake Lively "America\'s sweetheart", and Serena\'s relaxed style inspired several Vogue features.',
    },
  },
};

const FashionSection: React.FC = () => {
  const { locale } = useLocale();

  return (
    <section id="fashion" className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
      {/* Section Header */}
      <SectionHeader
        className="mb-12 md:mb-16"
        eyebrow={{ zh: 'Blair vs Serena', en: 'Blair vs Serena' }}
        title={TEXT.title}
        intro={TEXT.intro[locale]}
      />

      {/* Style Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
        {/* Blair */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className={`group relative ${CARD} overflow-hidden transition-all duration-300 hover:border-[hsl(335_70%_72%)]/40 hover:-translate-y-1`}
        >
          {/* Character Photo */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={FASHION_DATA.blair.photo}
              alt={FASHION_DATA.blair.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(335_70%_72%)] to-[hsl(42_85%_58%)] flex items-center justify-center text-primary-foreground font-serif font-bold text-xl shrink-0 border-2 border-[hsl(335_70%_72%)]/50 shadow-[0_0_12px_rgba(232_67_147_0.3)]">
                B
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground drop-shadow-[0_2px_4px_rgba(0_0_0_0.8)]">
                  {FASHION_DATA.blair.name}
                </h3>
                <p className="text-[hsl(335_70%_72%)] font-medium text-sm">
                  {FASHION_DATA.blair.title[locale]}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 pt-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {FASHION_DATA.blair.tags.map((tag) => (
                <span
                  key={tag.en}
                  className="px-3 py-1 text-xs rounded-full bg-[hsl(335_70%_72%)]/10 text-[hsl(335_70%_72%)] border border-[hsl(335_70%_72%)]/20 hover:bg-[hsl(335_70%_72%)]/20 transition-colors"
                >
                  {tag[locale]}
                </span>
              ))}
            </div>

            {/* Signature Items */}
            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {TEXT.signatureItems[locale]}
              </h4>
              {FASHION_DATA.blair.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name.en}
                    className="flex items-start gap-3 p-3 rounded-md bg-[hsl(335_70%_72%)]/5 hover:bg-[hsl(335_70%_72%)]/10 transition-colors"
                  >
                    <Icon className="size-5 text-[hsl(335_70%_72%)] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-foreground font-medium text-sm">{item.name[locale]}</p>
                      <p className="text-muted-foreground text-xs">{item.desc[locale]}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            <div className="relative p-4 rounded-md bg-[hsl(335_70%_72%)]/5 border border-[hsl(335_70%_72%)]/20">
              <QuoteIcon className="size-4 text-[hsl(335_70%_72%)]/40 absolute top-3 left-3" />
              <p className="text-foreground text-sm italic pl-6">
                {FASHION_DATA.blair.quote[locale]}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Serena */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`group relative ${CARD} overflow-hidden transition-all duration-300 hover:border-[hsl(42_85%_58%)]/40 hover:-translate-y-1`}
        >
          {/* Character Photo */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={FASHION_DATA.serena.photo}
              alt={FASHION_DATA.serena.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(42_85%_58%)] to-[hsl(200_70%_65%)] flex items-center justify-center text-primary-foreground font-serif font-bold text-xl shrink-0 border-2 border-[hsl(42_85%_58%)]/50 shadow-[0_0_12px_rgba(212_165_116_0.3)]">
                S
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground drop-shadow-[0_2px_4px_rgba(0_0_0_0.8)]">
                  {FASHION_DATA.serena.name}
                </h3>
                <p className="text-[hsl(42_85%_58%)] font-medium text-sm">
                  {FASHION_DATA.serena.title[locale]}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 pt-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {FASHION_DATA.serena.tags.map((tag) => (
                <span
                  key={tag.en}
                  className="px-3 py-1 text-xs rounded-full bg-[hsl(42_85%_58%)]/10 text-[hsl(42_85%_58%)] border border-[hsl(42_85%_58%)]/20 hover:bg-[hsl(42_85%_58%)]/20 transition-colors"
                >
                  {tag[locale]}
                </span>
              ))}
            </div>

            {/* Signature Items */}
            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {TEXT.signatureItems[locale]}
              </h4>
              {FASHION_DATA.serena.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name.en}
                    className="flex items-start gap-3 p-3 rounded-md bg-[hsl(42_85%_58%)]/5 hover:bg-[hsl(42_85%_58%)]/10 transition-colors"
                  >
                    <Icon className="size-5 text-[hsl(42_85%_58%)] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-foreground font-medium text-sm">{item.name[locale]}</p>
                      <p className="text-muted-foreground text-xs">{item.desc[locale]}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            <div className="relative p-4 rounded-md bg-[hsl(42_85%_58%)]/5 border border-[hsl(42_85%_58%)]/20">
              <QuoteIcon className="size-4 text-[hsl(42_85%_58%)]/40 absolute top-3 left-3" />
              <p className="text-foreground text-sm italic pl-6">
                {FASHION_DATA.serena.quote[locale]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fashion Influence */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`${CARD} p-6 md:p-8`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-primary/60 rounded-full" />
          <h3 className="font-serif text-xl font-bold text-foreground">
            {TEXT.influenceTitle[locale]}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-md bg-gradient-to-br from-[hsl(335_70%_72%)]/5 to-transparent border border-[hsl(335_70%_72%)]/10">
            <div className="flex items-center gap-2 mb-3">
              <CrownIcon className="size-5 text-[hsl(335_70%_72%)]" />
              <span className="font-semibold text-foreground">{TEXT.blairEffect[locale]}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {FASHION_DATA.blair.influence[locale]}
            </p>
          </div>

          <div className="p-5 rounded-md bg-gradient-to-br from-[hsl(42_85%_58%)]/5 to-transparent border border-[hsl(42_85%_58%)]/10">
            <div className="flex items-center gap-2 mb-3">
              <StarIcon className="size-5 text-[hsl(42_85%_58%)]" />
              <span className="font-semibold text-foreground">{TEXT.serenaEffect[locale]}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {FASHION_DATA.serena.influence[locale]}
            </p>
          </div>
        </div>

        {/* Vogue Quote */}
        <div className="mt-6 p-5 rounded-md bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <QuoteIcon className="size-6 text-primary/40 shrink-0 mt-1" />
            <div>
              <p className="text-foreground text-base italic leading-relaxed">
                {`"${TEXT.vogueQuote[locale]}"`}
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                {TEXT.vogueSource[locale]}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FashionSection;
