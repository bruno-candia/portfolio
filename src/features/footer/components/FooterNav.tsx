import { useTranslations } from 'next-intl';

export function FooterNav() {
  const t = useTranslations('Footer.nav');
  const links = [
    { label: t('about'), href: '#about' },
    { label: t('skills'), href: '#skills' },
    { label: t('works'), href: '#works' },
    { label: t('experience'), href: '#experience' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <nav
      aria-label={t('label')}
      className="flex flex-wrap items-center gap-x-6 gap-y-3 md:justify-center md:gap-8"
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="ds-small inline-flex min-h-11 items-center text-ink-3 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
