import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Locale = 'zh' | 'en';

const STORAGE_KEY = 'gg-locale';
/** 默认语言：英文（面向 GitHub / 英文访客），中文用户会自动命中浏览器语言 */
const FALLBACK_LOCALE: Locale = 'en';

const isLocale = (value: unknown): value is Locale => value === 'zh' || value === 'en';

/** 初始语言优先级：?lang= > localStorage > 浏览器语言 > 默认值 */
function resolveInitialLocale(): Locale {
  if (typeof window === 'undefined') return FALLBACK_LOCALE;

  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isLocale(fromUrl)) return fromUrl;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // 隐私模式下 localStorage 可能抛错，忽略即可
  }

  const browserLocale = window.navigator.language?.toLowerCase() ?? '';
  return browserLocale.startsWith('zh') ? 'zh' : FALLBACK_LOCALE;
}

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 存不进去也不影响当前会话
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'zh' ? 'en' : 'zh');
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used inside <LocaleProvider>');
  }
  return context;
}
