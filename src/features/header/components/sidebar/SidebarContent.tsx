'use client';

import { XIcon } from 'lucide-react';
import { Logo } from '@/components/atoms/logo';
import { Link } from '@/i18n/routing';
import { useSidebarViewModel } from '../../hooks/useSidebarViewModel';

export function Content() {
  const { menuItems, languages, locale, pathname } = useSidebarViewModel();

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-full -translate-y-full bg-black shadow-lg transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] peer-checked:translate-y-0"
      style={{ height: '100dvh' }}
    >
      <div className="sticky top-0 left-0 grid items-center justify-between z-2 grid-cols-8 border-b p-4">
        <Logo className="col-span-6" />
        <label
          htmlFor="menu-toggle"
          className="cursor-pointer flex justify-end text-gray-500 hover:text-red-500 col-span-2 text-right"
        >
          <XIcon />
        </label>
      </div>

      <nav className="fixed top-0 left-0 w-full h-full z-1 flex justify-center flex-col p-6">
        <ul className="mt-auto">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="cursor-pointer relative p-0 m-0 inline text-white text-4xl leading-14 focus:"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="fixed bottom-0 left-0 h-full z-50 flex gap-6 items-end p-6">
        {languages.map((lang) => (
          <li key={lang.code}>
            <Link
              href={pathname}
              locale={lang.code as 'pt' | 'en'}
              className={`text-white text-lg font-bold hover:opacity-80 transition-opacity ${
                locale === lang.code
                  ? 'underline decoration-2 underline-offset-4'
                  : ''
              }`}
            >
              {lang.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
