'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { Github, Linkedin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FaBehance } from 'react-icons/fa';
import { Logo } from '@/components/atoms/logo';
import { Link } from '@/i18n/routing';
import { type Locale, getBasics } from '@/lib/resume';
import { useSidebarViewModel } from '../../hooks/useSidebarViewModel';

const socialIcons = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Behance: FaBehance,
};

export function Content({
  onOpenAccessibility,
}: {
  onOpenAccessibility: (trigger: HTMLButtonElement) => void;
}) {
  const { menuItems, languages, locale, pathname, handleNavClick } =
    useSidebarViewModel();
  const t = useTranslations('Sidebar');
  const accessibility = useTranslations('Accessibility');
  const basics = getBasics(locale as Locale);
  const socials = basics.profiles.filter(
    (
      profile
    ): profile is typeof profile & {
      network: keyof typeof socialIcons;
    } => profile.network in socialIcons
  );

  const handleLinkClick = (id: string) => {
    handleNavClick(id);
  };

  const openAccessibility = (trigger: HTMLButtonElement) => {
    window.setTimeout(() => onOpenAccessibility(trigger), 0);
  };

  return (
    <Dialog.Portal>
      <Dialog.Content className="fixed inset-0 z-[100] h-dvh w-full overflow-hidden bg-bg text-ink focus:outline-none md:hidden">
        <Dialog.Title className="sr-only">{t('menu')}</Dialog.Title>
        <Dialog.Description className="sr-only">
          {t('menuDescription')}
        </Dialog.Description>

        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Logo aria-label="Bruno Costa" />
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label={t('closeMenu')}
              className="inline-flex size-11 items-center justify-center text-ink transition-colors hover:text-ink-2"
            >
              <XIcon aria-hidden size={28} strokeWidth={1.5} />
            </button>
          </Dialog.Close>
        </div>

        <nav aria-label={t('navigation')} className="px-5">
          <ul className="pt-[34px]">
            {menuItems.map((item, index) => (
              <li key={item.id} className="h-[69px] border-b border-line">
                <Dialog.Close asChild>
                  <a
                    href={item.href}
                    onClick={() => handleLinkClick(item.id)}
                    className="flex h-full items-start justify-between pt-[15px] text-ink-2 transition-colors hover:text-ink focus-visible:-outline-offset-2"
                  >
                    <span
                      className={`ds-m-display ${index === 0 ? 'text-ink' : ''}`}
                    >
                      {item.label}
                    </span>
                    <span className="ds-m-mono pt-3 text-ink-3">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </a>
                </Dialog.Close>
              </li>
            ))}

            <li className="h-[152px] border-b border-line">
              <Dialog.Close asChild>
                <button
                  type="button"
                  onClick={(event) => openAccessibility(event.currentTarget)}
                  className="flex h-full w-full items-start justify-between pt-[29px] text-left text-ink-2 transition-colors hover:text-ink focus-visible:-outline-offset-2"
                >
                  <span className="ds-m-display">{accessibility('menu')}</span>
                  <span className="ds-m-mono pt-3 text-ink-3">06</span>
                </button>
              </Dialog.Close>
            </li>
          </ul>
        </nav>

        <div className="absolute inset-x-0 bottom-0 h-36 border-t border-line px-5">
          <div className="flex h-[72px] items-center justify-between">
            <div className="flex h-9 overflow-hidden rounded-full border border-line-strong bg-inset p-1">
              {languages.map((lang) => {
                const active = locale === lang.code;
                return (
                  <Link
                    key={lang.code}
                    href={pathname}
                    locale={lang.code as 'pt' | 'en'}
                    aria-label={lang.label}
                    aria-current={active ? 'true' : undefined}
                    className={`ds-m-mono inline-flex w-11 items-center justify-center rounded-full transition-colors ${
                      active
                        ? 'bg-surface-hi text-ink'
                        : 'text-ink-3 hover:text-ink'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = socialIcons[social.network];
                return (
                  <a
                    key={social.network}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.network}
                    className="inline-flex size-11 items-center justify-center text-ink transition-colors hover:text-ink-2"
                  >
                    <Icon aria-hidden size={20} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          <a
            href={`mailto:${basics.email}`}
            className="ds-small inline-flex min-h-11 items-center text-ink-3 transition-colors hover:text-ink"
          >
            {basics.email}
          </a>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
