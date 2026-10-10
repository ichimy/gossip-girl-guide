import React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import RoutesComponent from './app.tsx';
import './index.css';
import { Toaster } from '@/components/ui/sonner';
import { LocaleProvider, useLocale } from '@/i18n';

/** 渲染异常时的兜底界面（中英文跟随当前语言） */
const AppErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  const { locale } = useLocale();
  const text = {
    title: { zh: '页面出了点问题', en: 'Something went wrong' },
    retry: { zh: '重试', en: 'Try again' },
    reload: { zh: '刷新页面', en: 'Reload page' },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">
        {text.title[locale]}
      </h1>
      <p className="max-w-xl text-sm text-muted-foreground break-words">
        {error.message}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={resetErrorBoundary}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
        >
          {text.retry[locale]}
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-md border border-border text-sm hover:border-primary/50 hover:text-primary transition-colors"
        >
          {text.reload[locale]}
        </button>
      </div>
    </div>
  );
};

const MainApp = () => {
  // 部署在子路径时（如 GitHub Pages 的 /<repo>/），路由 basename 需要与之一致；
  // 本地开发与域名根目录部署时 BASE_URL 为 './'，统一按 '/' 处理。
  const baseUrl = import.meta.env.BASE_URL;
  const basename = baseUrl && baseUrl !== './' ? baseUrl : '/';

  return (
    <LocaleProvider>
      <BrowserRouter basename={basename}>
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <AppErrorFallback
              error={error as Error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <RoutesComponent />
          {createPortal(<Toaster />, document.body)}
        </ErrorBoundary>
      </BrowserRouter>
    </LocaleProvider>
  );
};

createRoot(document.getElementById('root')!).render(<MainApp />);
