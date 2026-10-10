import { Link } from 'react-router-dom';
import { CrownIcon } from 'lucide-react';

import { useLocale } from '@/i18n';

/** 404 页面 */
const NotFound = () => {
  const { locale } = useLocale();

  const text = {
    title: { zh: '这个页面不在上东区', en: 'This page is not on the Upper East Side' },
    desc: {
      zh: 'You know you love me… 但你要找的页面并不存在。',
      en: "You know you love me… but the page you're looking for doesn't exist.",
    },
    back: { zh: '返回首页', en: 'Back to home' },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <CrownIcon className="size-10 text-primary" />
      <p className="font-serif text-5xl font-black text-primary leading-none">404</p>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
        {text.title[locale]}
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">{text.desc[locale]}</p>
      <Link
        to="/"
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
      >
        {text.back[locale]}
      </Link>
    </div>
  );
};

export default NotFound;
