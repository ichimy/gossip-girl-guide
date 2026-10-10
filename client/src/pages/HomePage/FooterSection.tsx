import { useState, useEffect, type ReactNode } from "react";
import { ArrowUpIcon, HeartIcon, Share2Icon, MessageSquareIcon, TwitterIcon, BookmarkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLocale, type LText } from "@/i18n";

const TEXT = {
  tagline: { zh: "上东区的秘密，永远在这里", en: "The Upper East Side secrets live here, always" },
  shareHint: { zh: "分享给更多剧迷", en: "Share with fellow fans" },
  disclaimer: {
    zh: "本页面为粉丝非官方整理，仅供学习交流使用",
    en: "Unofficial fan-made page, for study and sharing only",
  },
  backToTop: { zh: "返回顶部", en: "Back to top" },
};

export default function FooterSection() {
  const [showBackTop, setShowBackTop] = useState(false);
  const { locale } = useLocale();

  const socialButtons: Array<{ key: string; label: LText; icon: ReactNode }> = [
    { key: "share", label: { zh: "分享", en: "Share" }, icon: <Share2Icon className="size-4" /> },
    { key: "comment", label: { zh: "留言", en: "Comment" }, icon: <MessageSquareIcon className="size-4" /> },
    { key: "save", label: { zh: "收藏", en: "Save" }, icon: <BookmarkIcon className="size-4" /> },
    { key: "twitter", label: { zh: "Twitter", en: "Twitter" }, icon: <TwitterIcon className="size-4" /> },
    { key: "like", label: { zh: "喜欢", en: "Like" }, icon: <HeartIcon className="size-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="w-full border-t border-[hsl(240_8%_15%)] bg-gradient-to-b from-background to-[hsl(240_10%_3%)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="flex flex-col items-center gap-8">
            {/* XOXO Signature */}
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary/90 tracking-wide"
                style={{ fontStyle: "italic" }}
              >
                XOXO,
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-serif text-lg md:text-xl text-foreground/80 mt-2 tracking-wider"
              >
                Gossip Girl
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-muted-foreground text-sm mt-4"
              >
                {TEXT.tagline[locale]}
              </motion.p>
            </div>

            {/* Divider */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Social Share */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-muted-foreground text-sm">{TEXT.shareHint[locale]}</p>
              <div className="flex items-center gap-3">
                {socialButtons.map((item) => (
                  <button
                    key={item.key}
                    className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                    title={item.label[locale]}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Copyright */}
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-xs">
                {TEXT.disclaimer[locale]}
              </p>
              <p className="text-muted-foreground/60 text-xs">
                © {new Date().getFullYear()} Gossip Girl Fan Archive · All Rights Reserved · Made with{" "}
                <HeartIcon className="size-3 inline text-accent" /> in Upper East Side
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            aria-label={TEXT.backToTop[locale]}
          >
            <ArrowUpIcon className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
