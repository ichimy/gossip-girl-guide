import { useState, useEffect, type ReactNode } from "react";
import {
  ArrowUpIcon,
  HeartIcon,
  Share2Icon,
  MessageSquareIcon,
  TwitterIcon,
  BookmarkIcon,
  GithubIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { useLocale, type LText } from "@/i18n";
import { HERO_CREDIT, IMAGE_CREDIT } from "@/credits";

const FEEDBACK_URL = "https://github.com/ichimy/gossip-girl-guide/issues/new";
const SAVED_KEY = "gg-saved";

const TEXT = {
  tagline: { zh: "上东区的秘密，永远在这里", en: "The Upper East Side secrets live here, always" },
  shareHint: { zh: "分享给更多剧迷", en: "Share with fellow fans" },
  disclaimer: {
    zh: "本页面为粉丝非官方整理，仅供学习交流使用",
    en: "Unofficial fan-made page, for study and sharing only",
  },
  backToTop: { zh: "返回顶部", en: "Back to top" },
  shareText: { zh: "绯闻女孩上东区完全指南", en: "Gossip Girl · The Upper East Side Guide" },
  copied: { zh: "链接已复制，粘贴给朋友即可", en: "Link copied — paste it to a friend" },
  wechatHint: { zh: "链接已复制，去微信粘贴发送", en: "Link copied — paste it in WeChat" },
  saved: { zh: "已收藏，下次直接从浏览器打开", en: "Saved for later" },
  unsaved: { zh: "已取消收藏", en: "Removed from saved" },
  feedback: { zh: "去 GitHub 提建议或纠错", en: "Suggest a fix on GitHub" },
};

export default function FooterSection() {
  const [showBackTop, setShowBackTop] = useState(false);
  const [saved, setSaved] = useState(false);
  const { locale } = useLocale();

  // 读取本机收藏状态
  useEffect(() => {
    try {
      setSaved(window.localStorage.getItem(SAVED_KEY) === '1');
    } catch {
      // 隐私模式下读不到，保持未收藏
    }
  }, []);

  /** 分享链接带上当前语言，对方打开就是同一种语言 */
  const shareUrl = () => {
    const url = new URL(window.location.href);
    url.search = `?lang=${locale}`;
    url.hash = '';
    return url.toString();
  };

  const copyLink = async (hint: string) => {
    const url = shareUrl();
    try {
      await navigator.clipboard.writeText(url);
      toast.success(hint);
    } catch {
      // 剪贴板不可用（如 http 环境）时，直接把链接显示出来让用户手动复制
      toast.error(hint, { description: url });
    }
  };

  const handleShare = async () => {
    const url = shareUrl();
    const payload = { title: document.title, text: TEXT.shareText[locale], url };

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(payload);
        return;
      } catch {
        // 用户取消或系统不支持，退回复制链接
      }
    }
    await copyLink(TEXT.copied[locale]);
  };

  const handleTwitter = () => {
    const text = `${TEXT.shareText[locale]} #GossipGirl`;
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl())}`;
    window.open(intent, '_blank', 'noopener,noreferrer');
  };

  const handleSave = () => {
    const next = !saved;
    setSaved(next);
    try {
      if (next) {
        window.localStorage.setItem(SAVED_KEY, '1');
      } else {
        window.localStorage.removeItem(SAVED_KEY);
      }
    } catch {
      // 存不进去也不影响本次会话的显示
    }
    toast.success(next ? TEXT.saved[locale] : TEXT.unsaved[locale]);
  };

  const handleFeedback = () => {
    window.open(FEEDBACK_URL, '_blank', 'noopener,noreferrer');
  };

  const socialButtons: Array<{
    key: string;
    label: LText;
    icon: ReactNode;
    onClick: () => void;
  }> = [
    { key: 'share', label: { zh: '分享', en: 'Share' }, icon: <Share2Icon className="size-4" />, onClick: handleShare },
    { key: 'wechat', label: { zh: '微信', en: 'WeChat' }, icon: <MessageSquareIcon className="size-4" />, onClick: () => copyLink(TEXT.wechatHint[locale]) },
    { key: 'twitter', label: { zh: 'X / Twitter', en: 'X / Twitter' }, icon: <TwitterIcon className="size-4" />, onClick: handleTwitter },
    { key: 'save', label: { zh: '收藏', en: 'Save' }, icon: <BookmarkIcon className={`size-4 ${saved ? 'fill-current' : ''}`} />, onClick: handleSave },
    { key: 'feedback', label: TEXT.feedback, icon: <GithubIcon className="size-4" />, onClick: handleFeedback },
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
                {socialButtons.map((item) => {
                  const isSaved = item.key === 'save' && saved;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={item.onClick}
                      aria-label={item.label[locale]}
                      title={item.label[locale]}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 ${
                        isSaved
                          ? 'border-primary/50 bg-primary/10 text-primary'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary'
                      }`}
                    >
                      {item.icon}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Copyright */}
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-xs">
                {TEXT.disclaimer[locale]}
              </p>
              <p className="text-muted-foreground/70 text-xs">
                {IMAGE_CREDIT[locale]}
              </p>
              <p className="text-muted-foreground/50 text-xs">
                {HERO_CREDIT[locale]}
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
