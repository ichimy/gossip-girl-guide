import { motion } from "framer-motion";
import { ChevronDownIcon, CrownIcon } from "lucide-react";

import heroBg from "../../../../shared/static/images/hero-bg.jpg";
import { useLocale } from "@/i18n";

const TEXT = {
  subtitle: { zh: "XOXO, 上东区的秘密全在这里", en: "XOXO, every Upper East Side secret lives here" },
  titleZh: { zh: "绯闻女孩", en: "The Upper East Side Guide" },
  quoteMain: "You know you love me.",
  quoteSub: { zh: "你知道你爱我。XOXO, Gossip Girl.", en: "XOXO, Gossip Girl." },
  scrollHint: { zh: "探索更多", en: "Explore more" },
  scrollAria: { zh: "向下滚动查看更多", en: "Scroll down to see more" },
};

const scrollToOverview = () => {
  const el = document.querySelector("#overview");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const quoteVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut", delay: 0.8 },
  },
};

const arrowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 0.6 },
  },
};

const arrowPulse = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HeroSection() {
  const { locale } = useLocale();

  return (
    <section className="w-full relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[hsl(240_10%_8%)]/90 via-[hsl(240_10%_5%)]/80 to-[hsl(240_10%_5%)]" />

      {/* Golden Radial Glow */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, hsla(42,85%,58%,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-8 py-32 md:py-48 lg:py-56">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Crown Icon */}
          <motion.div variants={itemVariants} className="mb-6">
            <CrownIcon className="size-10 md:size-12 text-primary/80 drop-shadow-[0_0_20px_hsla(42_85%_58%_0.4)]" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="font-serif font-black text-5xl md:text-7xl lg:text-8xl text-foreground tracking-tight leading-none mb-4 drop-shadow-[0_2px_8px_rgba(0_0_0_0.8)]"
          >
            <span className="block text-primary">GOSSIP GIRL</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 text-foreground/90">
              {TEXT.titleZh[locale]}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-sans font-light text-lg md:text-xl text-muted-foreground tracking-wide mt-6 mb-10"
          >
            {TEXT.subtitle[locale]}
          </motion.p>

          {/* Divider Line */}
          <motion.div
            variants={itemVariants}
            className="w-24 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-10"
          />

          {/* Classic Quote */}
          <motion.blockquote
            variants={quoteVariants}
            className="max-w-2xl px-6 py-4 relative group cursor-default"
          >
            {/* Decorative Quote Mark */}
            <span className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif leading-none select-none">
              {'"'}
            </span>

            <p className="font-serif text-xl md:text-2xl text-foreground/90 italic leading-relaxed mb-3">
              {TEXT.quoteMain}
            </p>
            <p className="font-sans text-sm text-muted-foreground">
              {TEXT.quoteSub[locale]}
            </p>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsla(42,85%,58%,0.05) 0%, transparent 70%)",
              }}
            />
          </motion.blockquote>

          {/* Scroll Down Arrow */}
          <motion.div
            variants={arrowVariants}
            className="mt-16 md:mt-20"
          >
            <motion.button
              variants={arrowPulse}
              animate="animate"
              onClick={scrollToOverview}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
              aria-label={TEXT.scrollAria[locale]}
            >
              <span className="text-xs font-sans tracking-widest uppercase group-hover:text-primary transition-colors">
                {TEXT.scrollHint[locale]}
              </span>
              <ChevronDownIcon className="size-6 group-hover:text-primary transition-colors" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
