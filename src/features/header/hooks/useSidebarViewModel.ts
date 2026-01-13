import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';

export const useSidebarViewModel = () => {
  const t = useTranslations('Sidebar');
  const locale = useLocale();
  const pathname = usePathname();

  const menuItems = [
    { label: t('about'), href: '#about' },
    { label: t('skills'), href: '#skills' },
    { label: t('works'), href: '#works' },
    { label: t('experience'), href: '#experience' },
    { label: t('contact'), href: '#contact' },
  ];

  const languages = [
    { label: t('portuguese'), code: 'pt' },
    { label: t('english'), code: 'en' },
  ];

  return {
    locale,
    pathname,
    menuItems,
    languages,
  };
};
