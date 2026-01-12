'use client';

import { useTranslations } from 'next-intl';

export function FooterNav() {
  const t = useTranslations('Footer.nav');

  const links = [
    { label: t('services'), href: '#works' },
    { label: t('projects'), href: '#experience' },
    { label: t('profile'), href: '#about' },
    { label: t('reviews'), href: '#' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <nav className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-zinc-400 hover:text-white transition-colors text-base font-light"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
