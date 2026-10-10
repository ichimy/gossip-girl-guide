import { useState } from "react";
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
  const { locale } = useLocale();
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[hsl(240_10%_7%)] border-b border-[hsl(240_8%_20%)] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          {/* Brand */}
          <ActiveLink
            to="#hero"
            isActive={activeId === 'hero'}
            className="flex items-center gap-2 shrink-0"
          >
            <CrownIcon className="size-5 text-primary" />
            <span className="font-serif font-bold text-lg text-foreground tracking-tight hidden sm:inline">
              GOSSIP GIRL
            </span>
          </ActiveLink>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <ActiveLink
                key={item.href}
                to={item.href}
                isActive={activeId === item.href.slice(1)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                  activeId === item.href.slice(1)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {item.label[locale]}
              </ActiveLink>
            ))}
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
          <div className="xl:hidden absolute top-16 left-0 right-0 bg-[hsl(240_10%_7%)] border-b border-[hsl(240_8%_20%)] shadow-xl">
            <nav className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <ActiveLink
                  key={item.href}
                  to={item.href}
                  isActive={activeId === item.href.slice(1)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                    activeId === item.href.slice(1)
                      ? "text-primary font-semibold bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {item.label[locale]}
                </ActiveLink>
              ))}
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
