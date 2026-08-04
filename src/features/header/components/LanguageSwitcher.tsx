'use client';

import { Link } from '@/i18n/routing';
import { useSidebarViewModel } from '../hooks/useSidebarViewModel';

export function LanguageSwitcher() {
  const { languages, locale, pathname } = useSidebarViewModel();

  return (
    <div className="fixed top-1/2 right-0 z-50 hidden -translate-y-1/2 flex-col md:flex">
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <Link
            key={lang.code}
            href={pathname}
            locale={lang.code as 'pt' | 'en'}
            aria-current={isActive ? 'true' : undefined}
            className={`ds-eyebrow px-3 py-2 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink ${
              isActive
                ? 'bg-ink text-ink-inverse'
                : 'bg-surface-hi text-ink-3 hover:text-ink'
            }`}
          >
            {lang.code}
          </Link>
        );
      })}
    </div>
  );
}
