import { useLocale, type Locale } from '@/i18n';

const OPTIONS: Array<{ value: Locale; label: string; ariaLabel: string }> = [
  { value: 'zh', label: '中', ariaLabel: '切换到中文' },
  { value: 'en', label: 'EN', ariaLabel: 'Switch to English' },
];

/** 顶栏语言切换：状态存 localStorage，刷新后保持不变 */
const LanguageSwitcher = ({ className = '' }: { className?: string }) => {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language / 语言"
      className={`flex items-center gap-0.5 rounded-full border border-border/60 p-0.5 ${className}`}
    >
      {OPTIONS.map((option) => {
        const isActive = option.value === locale;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLocale(option.value)}
            aria-label={option.ariaLabel}
            aria-pressed={isActive}
            className={`min-w-8 px-2 py-1 text-xs rounded-full transition-colors duration-200 ${
              isActive
                ? 'bg-primary text-primary-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
