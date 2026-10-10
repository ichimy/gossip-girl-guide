import { motion } from "framer-motion";
import { StarIcon, HeartIcon, CameraIcon, MusicIcon, AwardIcon } from "lucide-react";
import { Image } from "@/components/ui/image";
import serenaImg from "../../../../shared/static/images/serena.webp";
import blairImg from "../../../../shared/static/images/blair.webp";
import chuckImg from "../../../../shared/static/images/chuck.webp";
import nateImg from "../../../../shared/static/images/nate.webp";
import danImg from "../../../../shared/static/images/dan.webp";
import jennyImg from "../../../../shared/static/images/jenny.webp";
import { useLocale, type LText } from "@/i18n";

const TEXT = {
  title: { zh: "演员现状", en: "Cast Now" },
  intro: {
    zh: "从剧中到现实，六位主演的真实人生轨迹——有人成为好莱坞模范夫妻，有人转型摇滚主唱，有人主演全球爆款剧",
    en: "From screen to real life: where the six leads ended up — Hollywood's model couple, a rock frontwoman, and the star of a global hit",
  },
  asActor: { zh: "饰", en: "as" },
  outro: {
    zh: "从 2007 到 2025，他们的故事仍在继续 ✨",
    en: "From 2007 to 2025, their stories are still unfolding ✨",
  },
};

interface ICastMember {
  name: string;
  actor: string;
  role: LText;
  avatar: string;
  photo: string;
  tag: LText;
  tagColor: string;
  status: {
    icon: React.ReactNode;
    label: LText;
    detail: LText;
  }[];
  quote: LText;
}

const castMembers: ICastMember[] = [
  {
    name: "Blake Lively",
    actor: "Serena van der Woodsen",
    role: { zh: "Queen S", en: "Queen S" },
    avatar: "BL",
    photo: serenaImg,
    tag: { zh: "Queen S → 死侍妻子", en: "Queen S → Deadpool's wife" },
    tagColor: "bg-primary/10 text-primary border-primary/20",
    status: [
      { icon: <HeartIcon className="size-4" />, label: { zh: "婚姻", en: "Marriage" }, detail: { zh: "2012年与 Ryan Reynolds（死侍）结婚，好莱坞模范夫妻，育有4个孩子", en: "Married Ryan Reynolds (Deadpool) in 2012 — a model Hollywood couple with four children" } },
      { icon: <AwardIcon className="size-4" />, label: { zh: "事业", en: "Career" }, detail: { zh: "时尚圈宠儿，Gucci/Chanel 代言，红毯女王，孕期依然美得不可方物", en: "A fashion-world darling and face of Gucci and Chanel, queen of the red carpet" } },
      { icon: <CameraIcon className="size-4" />, label: { zh: "代表作", en: "Selected works" }, detail: { zh: "《时光尽头的恋人》《鲨滩》《一个小忙》《咖啡公社》", en: "The Age of Adaline, The Shallows, A Simple Favour, Cafe Society" } },
    ],
    quote: { zh: "一个在孕期都美得不可方物的红毯女神", en: "A red-carpet goddess, radiant even through pregnancy" },
  },
  {
    name: "Leighton Meester",
    actor: "Blair Waldorf",
    role: { zh: "Queen B", en: "Queen B" },
    avatar: "LM",
    photo: blairImg,
    tag: { zh: "Queen B → 音乐人 & 母亲", en: "Queen B → Musician & mother" },
    tagColor: "bg-accent/10 text-accent border-accent/20",
    status: [
      { icon: <HeartIcon className="size-4" />, label: { zh: "婚姻", en: "Marriage" }, detail: { zh: "2014年与演员 Adam Brody 结婚，育有一女，婚后低调回归家庭", en: "Married actor Adam Brody in 2014; they have a daughter and keep a deliberately low profile" } },
      { icon: <MusicIcon className="size-4" />, label: { zh: "音乐", en: "Music" }, detail: { zh: "签约环球唱片，发行多张专辑，举办个人巡演，嗓音适合民谣", en: "Signed to a major label, released several solo albums and toured; her voice suits folk" } },
      { icon: <CameraIcon className="size-4" />, label: { zh: "代表作", en: "Selected works" }, detail: { zh: "《如晴天，似雨天》（2014音乐文艺片广受好评）", en: "Like Sunday, Like Rain (2014), a music drama that won wide praise" } },
    ],
    quote: { zh: "比起活在聚光灯下，她更喜欢安安静静地走自己想走的路", en: "Rather than living under a spotlight, she prefers quietly walking her own path" },
  },
  {
    name: "Ed Westwick",
    actor: "Chuck Bass",
    role: { zh: "I'm Chuck Bass", en: "I'm Chuck Bass" },
    avatar: "EW",
    photo: chuckImg,
    tag: { zh: "花花公子 → 已婚男士", en: "Playboy → Married man" },
    tagColor: "bg-primary/10 text-primary border-primary/20",
    status: [
      { icon: <HeartIcon className="size-4" />, label: { zh: "婚姻", en: "Marriage" }, detail: { zh: "与女友 Amy Jackson 订婚，感情稳定", en: "Engaged to Amy Jackson; the relationship is going strong" } },
      { icon: <CameraIcon className="size-4" />, label: { zh: "影视", en: "Screen" }, detail: { zh: "出演《白王后》《都市传说》等剧集，持续活跃于影视圈", en: "Has appeared in The White Queen, Urban Myths and more, staying active on screen" } },
      { icon: <MusicIcon className="size-4" />, label: { zh: "音乐", en: "Music" }, detail: { zh: "乐队 The Filth Youth 主唱，摇滚音乐人", en: "Frontman of the band The Filth Youth — a rock musician at heart" } },
    ],
    quote: { zh: "那句 'I'm Chuck Bass' 至今仍是无数人心中的经典", en: "That line — 'I'm Chuck Bass' — is still an icon for countless fans" },
  },
  {
    name: "Penn Badgley",
    actor: "Dan Humphrey",
    role: { zh: "Lonely Boy", en: "Lonely Boy" },
    avatar: "PB",
    photo: danImg,
    tag: { zh: "Outsider → 当红男主", en: "Outsider → Leading man" },
    tagColor: "bg-accent/10 text-accent border-accent/20",
    status: [
      { icon: <HeartIcon className="size-4" />, label: { zh: "婚姻", en: "Marriage" }, detail: { zh: "2017年与 Domino Kirke 结婚，2021年迎来第一个孩子", en: "Married Domino Kirke in 2017; their first child arrived in 2021" } },
      { icon: <CameraIcon className="size-4" />, label: { zh: "事业巅峰", en: "Career peak" }, detail: { zh: "主演 Netflix 爆款剧《YOU》（安眠书店），成为全球热门男主", en: "Leads the Netflix hit YOU, making him a globally recognised lead" } },
      { icon: <MusicIcon className="size-4" />, label: { zh: "音乐", en: "Music" }, detail: { zh: "MOTHXR 乐队主唱，持续创作音乐", en: "Frontman of the band MOTHXR, still writing music" } },
    ],
    quote: { zh: "从 Lonely Boy 到全球最火的心理惊悚剧男主，星途越走越远", en: "From Lonely Boy to the lead of a worldwide psychological thriller — his star keeps rising" },
  },
  {
    name: "Chace Crawford",
    actor: "Nate Archibald",
    role: { zh: "曼哈顿王子", en: "Manhattan's prince" },
    avatar: "CC",
    photo: nateImg,
    tag: { zh: "贵族王子 → 超级英雄剧男主", en: "Golden boy → Superhero-series lead" },
    tagColor: "bg-primary/10 text-primary border-primary/20",
    status: [
      { icon: <CameraIcon className="size-4" />, label: { zh: "事业", en: "Career" }, detail: { zh: "主演 Amazon 超级英雄剧《黑袍纠察队》（The Boys）饰演深海（The Deep），大热", en: "Stars as The Deep in Amazon's hit superhero series The Boys" } },
      { icon: <HeartIcon className="size-4" />, label: { zh: "生活", en: "Life" }, detail: { zh: "保持低调，偶尔被拍到约会，生活惬意", en: "Keeps a low profile and is occasionally photographed on dates" } },
      { icon: <AwardIcon className="size-4" />, label: { zh: "荣誉", en: "Honors" }, detail: { zh: "曾被 People 杂志评为 NYC 最性感单身汉", en: "Once named among New York's sexiest bachelors by People" } },
    ],
    quote: { zh: "从曼哈顿王子到《黑袍纠察队》的深海，转型成功", en: "From Manhattan's prince to The Deep in The Boys — a successful reinvention" },
  },
  {
    name: "Taylor Momsen",
    actor: "Jenny Humphrey",
    role: { zh: "Little J", en: "Little J" },
    avatar: "TM",
    photo: jennyImg,
    tag: { zh: "乖乖女 → 摇滚主唱", en: "Good girl → Rock frontwoman" },
    tagColor: "bg-accent/10 text-accent border-accent/20",
    status: [
      { icon: <MusicIcon className="size-4" />, label: { zh: "音乐", en: "Music" }, detail: { zh: "The Pretty Reckless 乐队主唱，发行多张摇滚专辑，巡演不断", en: "Frontwoman of The Pretty Reckless, with several rock albums and near-constant touring" } },
      { icon: <CameraIcon className="size-4" />, label: { zh: "演艺", en: "Acting" }, detail: { zh: "2012年后基本退出演艺圈，专注音乐事业", en: "Largely stepped away from acting after 2012 to focus on music" } },
      { icon: <HeartIcon className="size-4" />, label: { zh: "生活", en: "Life" }, detail: { zh: "与丈夫 Ben Phillips（乐队成员）结婚，低调幸福", en: "Married bandmate Ben Phillips — quietly happy" } },
    ],
    quote: { zh: "从 Little J 到摇滚主唱，她找到了真正的自己", en: "From Little J to rock frontwoman, she found her real self" },
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function CastNowSection() {
  const { locale } = useLocale();

  return (
    <section id="cast-now" className="w-full py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-primary/60 rounded-full" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {TEXT.title[locale]}
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            {TEXT.intro[locale]}
          </p>
        </div>

        {/* Cast Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {castMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={item}
              className="group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40 hover:translate-y-[-4px] hover:shadow-[0_4px_20px_-4px_rgba(0_0_0_0.6)]"
            >
              {/* Actor Photo */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                {/* Name Badge */}
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-serif text-xl font-bold text-foreground drop-shadow-[0_2px_4px_rgba(0_0_0_0.8)]">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-xs drop-shadow-[0_1px_2px_rgba(0_0_0_0.8)]">
                    {TEXT.asActor[locale]} {member.actor}
                  </p>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 pt-3">
                {/* Tag */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${member.tagColor} mb-4`}>
                  <StarIcon className="size-3" />
                  {member.tag[locale]}
                </div>

                {/* Status List */}
                <div className="space-y-3">
                  {member.status.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 text-primary/70 shrink-0">
                        {s.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-foreground">{s.label[locale]}</span>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {s.detail[locale]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote Footer */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    {`"${member.quote[locale]}"`}
                  </p>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm italic">
            {TEXT.outro[locale]}
          </p>
        </div>
      </div>
    </section>
  );
}
