'use client';

import { Link } from '@/i18n/routing';
import { useSidebarViewModel } from '../hooks/useSidebarViewModel';

export function LanguageSwitcher() {
  const { languages, locale, pathname } = useSidebarViewModel();

  return (
    <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={pathname}
          locale={lang.code as 'pt' | 'en'}
          className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
            locale === lang.code
              ? 'bg-white text-black'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          {lang.code}
        </Link>
      ))}
    </div>
  );
}
