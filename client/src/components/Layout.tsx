import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import { MenuIcon, XIcon, CrownIcon } from "lucide-react";

import ActiveLink from '@/components/ActiveLink';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useActiveSection } from '@/hooks/use-active-section';
import { useLocale, type LText } from '@/i18n';

const NAV_ITEMS: Array<{ label: LText; href: string }> = [
  { label: { zh: "首页", en: "Home" }, href: "#hero" },
  { label: { zh: "剧集概览", en: "Overview" }, href: "#overview" },
  { label: { zh: "角色图鉴", en: "Characters" }, href: "#characters" },
  { label: { zh: "剧情时间轴", en: "Timeline" }, href: "#timeline" },
  { label: { zh: "CP关系", en: "Couples" }, href: "#couples" },
  { label: { zh: "经典台词", en: "Quotes" }, href: "#quotes" },
  { label: { zh: "取景打卡", en: "Locations" }, href: "#locations" },
  { label: { zh: "时尚穿搭", en: "Fashion" }, href: "#fashion" },
  { label: { zh: "原声配乐", en: "Soundtrack" }, href: "#soundtrack" },
  { label: { zh: "演员现状", en: "Cast Now" }, href: "#cast-now" },
  { label: { zh: "幕后彩蛋", en: "Trivia" }, href: "#trivia" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale } = useLocale();
  const activeId = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 border-b backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? 'bg-[hsl(240_10%_7%)]/90 border-[hsl(240_8%_20%)] shadow-[0_12px_36px_-16px_rgba(0,0,0,0.9)]'
            : 'bg-[hsl(240_10%_7%)]/45 border-transparent'
        }`}
      >
        {/* 底部的金色发丝线，只有滚动后才浮现 */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-[-1px] h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="max-w-6xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          {/* Brand */}
          <ActiveLink
            to="#hero"
            isActive={activeId === 'hero'}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-primary/30 bg-primary/5 transition-colors duration-300 group-hover:border-primary/60">
              <CrownIcon className="size-4 text-primary" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-[15px] font-bold tracking-[0.12em] text-foreground">
                GOSSIP GIRL
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.26em] text-muted-foreground/70">
                Upper East Side
              </span>
            </span>
          </ActiveLink>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <ActiveLink
                  key={item.href}
                  to={item.href}
                  isActive={isActive}
                  className={`group relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] transition-colors duration-300 ${
                    isActive
                      ? "font-medium text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label[locale]}
                  {/* 选中下划线：宽度展开 + 渐隐两端 */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-2 bottom-1 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-300 ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-50 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                    }`}
                  />
                </ActiveLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* Mobile Menu Toggle */}
            <button
              className="xl:hidden text-foreground p-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-16 left-0 right-0 border-b border-[hsl(240_8%_20%)] bg-[hsl(240_10%_7%)]/95 shadow-2xl backdrop-blur-xl">
            <nav className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.href.slice(1);
                return (
                  <ActiveLink
                    key={item.href}
                    to={item.href}
                    isActive={isActive}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative rounded-md py-2.5 pl-4 pr-3 text-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {/* 选中项的左侧金色竖线 */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-1.5 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-opacity duration-200 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {item.label[locale]}
                  </ActiveLink>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Content Area */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
