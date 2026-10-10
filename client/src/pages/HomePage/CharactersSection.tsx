import { useState } from "react";
import { motion } from "framer-motion";
import { CrownIcon, StarIcon, HeartIcon, SparklesIcon, ShieldIcon, ZapIcon, EyeIcon, FlameIcon } from "lucide-react";
import { Image } from "@/components/ui/image";
import serenaImg from "../../../../shared/static/images/serena.jpg";
import blairImg from "../../../../shared/static/images/blair.jpg";
import chuckImg from "../../../../shared/static/images/chuck.jpg";
import nateImg from "../../../../shared/static/images/nate.jpg";
import danImg from "../../../../shared/static/images/dan.jpg";
import jennyImg from "../../../../shared/static/images/jenny.jpg";
import vanessaImg from "../../../../shared/static/images/vanessa.jpg";
import georginaImg from "../../../../shared/static/images/georgina.jpg";
import { useLocale, type LText } from "@/i18n";

const TEXT = {
  title: { zh: "主要角色", en: "Main Characters" },
  intro: {
    zh: "上东区的八位核心人物——从 Queen B 到 Lonely Boy，每个人都是一段传奇",
    en: "Eight central figures of the Upper East Side — from Queen B to Lonely Boy, every one of them a legend",
  },
  hoverHint: { zh: "悬停展开 →", en: "Hover to expand →" },
};

interface ICharacter {
  id: string;
  name: string;
  actor: string;
  initial: string;
  tags: LText[];
  bio: LText;
  color: string;
  icon: React.ReactNode;
  photo: string;
}

const CHARACTERS: ICharacter[] = [
  {
    id: "serena",
    name: "Serena van der Woodsen",
    actor: "Blake Lively",
    initial: "S",
    tags: [
      { zh: "Queen S", en: "Queen S" },
      { zh: "金发女神", en: "Golden girl" },
      { zh: "自由反叛", en: "Free spirit" },
    ],
    bio: {
      zh: "上东区的金发女神，天生自带聚光灯。她自由、反叛、充满魅力，却总在寻找真正的自我。从寄宿学校神秘归来，掀起上东区层层波澜。",
      en: "The golden girl of the Upper East Side, born under a spotlight. Free, rebellious and magnetic, she is always searching for who she really is. Her mysterious return from boarding school stirs up the whole neighbourhood.",
    },
    color: "from-yellow-400/20 to-amber-500/20",
    icon: <StarIcon className="size-5 text-yellow-400" />,
    photo: serenaImg,
  },
  {
    id: "blair",
    name: "Blair Waldorf",
    actor: "Leighton Meester",
    initial: "B",
    tags: [
      { zh: "Queen B", en: "Queen B" },
      { zh: "聪明高傲", en: "Sharp and proud" },
      { zh: "完美主义", en: "Perfectionist" },
    ],
    bio: {
      zh: "上东区无可争议的女王，聪明、高傲、追求完美。标志性的发带和学院风穿搭引领潮流。她的人生课题是学会接纳不完美的自己。",
      en: "The undisputed queen of the Upper East Side: clever, proud, a perfectionist. Her signature headbands and preppy looks set the trends. Her life lesson is learning to accept her imperfect self.",
    },
    color: "from-pink-400/20 to-rose-500/20",
    icon: <CrownIcon className="size-5 text-pink-400" />,
    photo: blairImg,
  },
  {
    id: "chuck",
    name: "Chuck Bass",
    actor: "Ed Westwick",
    initial: "C",
    tags: [
      { zh: "花花公子", en: "Womanizer" },
      { zh: "深情总裁", en: "Devoted tycoon" },
      { zh: "I'm Chuck Bass", en: "I'm Chuck Bass" },
    ],
    bio: {
      zh: '从放荡不羁的花花公子到专一深情的成熟男人。那句"I\'m Chuck Bass"成为全剧最经典的自信宣言。他对 Blair 的爱贯穿六季，从冤家到灵魂伴侣。',
      en: "From reckless playboy to devoted grown-up man. \"I'm Chuck Bass\" became the show's most famous declaration of confidence. His love for Blair runs through all six seasons, from rivals to soulmates.",
    },
    color: "from-amber-400/20 to-orange-500/20",
    icon: <FlameIcon className="size-5 text-amber-400" />,
    photo: chuckImg,
  },
  {
    id: "nate",
    name: "Nate Archibald",
    actor: "Chace Crawford",
    initial: "N",
    tags: [
      { zh: "贵族王子", en: "Golden boy" },
      { zh: "NYC最性感", en: "NYC's hottest" },
      { zh: "青梅竹马", en: "Childhood friend" },
    ],
    bio: {
      zh: "曼哈顿的贵族王子，金褐色卷发和绿眼睛的迷人男孩。他是 Blair 的青梅竹马，也是无数女孩心中的白马王子。认真对待每一段感情，却总是无果而终。",
      en: "Manhattan's golden boy: sandy curls, green eyes, effortlessly charming. Blair's childhood friend and half the neighbourhood's dream. He takes every relationship seriously, yet they never quite last.",
    },
    color: "from-emerald-400/20 to-green-500/20",
    icon: <ShieldIcon className="size-5 text-emerald-400" />,
    photo: nateImg,
  },
  {
    id: "dan",
    name: "Dan Humphrey",
    actor: "Penn Badgley",
    initial: "D",
    tags: [
      { zh: "Lonely Boy", en: "Lonely Boy" },
      { zh: "Outsider", en: "Outsider" },
      { zh: "Gossip Girl", en: "Gossip Girl" },
    ],
    bio: {
      zh: "来自布鲁克林的 outsider，坚信学识和努力可以战胜出身。最终 reveal 他就是 Gossip Girl 本人。从穷小子到畅销作家，他始终望向上流社会的那扇窗。",
      en: "The outsider from Brooklyn who believes brains and effort can beat pedigree — and who turns out to be Gossip Girl himself. From poor kid to bestselling author, he never stops looking through the window at high society.",
    },
    color: "from-blue-400/20 to-indigo-500/20",
    icon: <EyeIcon className="size-5 text-blue-400" />,
    photo: danImg,
  },
  {
    id: "jenny",
    name: "Jenny Humphrey",
    actor: "Taylor Momsen",
    initial: "J",
    tags: [
      { zh: "小J", en: "Little J" },
      { zh: "乖乖女→朋克", en: "Good girl to punk" },
      { zh: "野心家", en: "Ambitious" },
    ],
    bio: {
      zh: 'Dan 的妹妹，从渴望融入富家女圈子的乖乖女，到毕业后成为高中"女王"，最终走向朋克风的叛逆之路。她的才华在设计领域完全绽放。',
      en: "Dan's younger sister, who goes from a good girl desperate to fit in with the rich kids, to high-school queen, to punk rebellion. Her talent fully blooms in fashion design.",
    },
    color: "from-purple-400/20 to-violet-500/20",
    icon: <ZapIcon className="size-5 text-purple-400" />,
    photo: jennyImg,
  },
  {
    id: "vanessa",
    name: "Vanessa Abrams",
    actor: "Jessica Szohr",
    initial: "V",
    tags: [
      { zh: "Dan的好友", en: "Dan's friend" },
      { zh: "文艺青年", en: "Indie kid" },
      { zh: "独立", en: "Independent" },
    ],
    bio: {
      zh: "Dan 从布鲁克林带来的好友，独立、文艺、有主见。她卷入了上东区的种种纷争，却始终保持着 outsider 的清醒视角。",
      en: "The friend Dan brings with him from Brooklyn: independent, artsy, opinionated. She gets pulled into Upper East Side drama while keeping an outsider's clear-eyed view.",
    },
    color: "from-teal-400/20 to-cyan-500/20",
    icon: <SparklesIcon className="size-5 text-teal-400" />,
    photo: vanessaImg,
  },
  {
    id: "georgina",
    name: "Georgina Sparks",
    actor: "Michelle Trachtenberg",
    initial: "G",
    tags: [
      { zh: "搅局者", en: "Troublemaker" },
      { zh: "小魔女", en: "Toxic sprite" },
      { zh: "复仇女王", en: "Queen of revenge" },
    ],
    bio: {
      zh: '全剧最具破坏力的搅局者，带着难以抑制的复仇欲强势归来。她掀起一轮又一轮"血雨腥风"，是上东区最不可预测的变量。',
      en: "The most destructive troublemaker in the show, returning with an appetite for revenge she can hardly control. She whips up storm after storm — the Upper East Side's most unpredictable variable.",
    },
    color: "from-red-400/20 to-rose-500/20",
    icon: <HeartIcon className="size-5 text-red-400" />,
    photo: georginaImg,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CharactersSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { locale } = useLocale();

  return (
    <section id="characters" className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-primary/60 rounded-full" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {TEXT.title[locale]}
          </h2>
        </div>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          {TEXT.intro[locale]}
        </p>
      </div>

      {/* Character Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px", amount: 0.1 }}
      >
        {CHARACTERS.map((char) => (
          <motion.div
            key={char.id}
            variants={cardVariants}
            className="group relative"
            onMouseEnter={() => setHoveredId(char.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className={`relative h-full bg-gradient-to-br ${char.color} bg-card border border-border rounded-lg overflow-hidden shadow-[0_4px_20px_-4px_rgba(0_0_0_0.6)] transition-all duration-300 group-hover:border-primary/40 group-hover:translate-y-[-4px]`}
            >
              {/* Character Photo */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={char.photo}
                  alt={char.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                {/* Avatar Badge overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${char.color} border-2 border-primary/40 text-foreground font-serif font-bold text-sm shadow-[0_0_12px_rgba(212_165_116_0.3)]`}
                  >
                    {char.initial}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 pt-2">
                <div className="mb-3">
                  <h3 className="font-semibold text-foreground text-sm truncate">
                    {char.name}
                  </h3>
                  <p className="text-muted-foreground text-xs">{char.actor}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {char.tags.map((tag) => (
                    <span
                      key={tag.en}
                      className="px-2 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {tag[locale]}
                    </span>
                  ))}
                </div>

                {/* Bio (expand on hover) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    hoveredId === char.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {char.bio[locale]}
                    </p>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-[10px] text-muted-foreground">{TEXT.hoverHint[locale]}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
