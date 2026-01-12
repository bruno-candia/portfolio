import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';

export const useSidebarViewModel = () => {
  const t = useTranslations('Sidebar');
  const locale = useLocale();
  const pathname = usePathname();

  const menuItems = [
    { label: t('home'), href: '#' },
    { label: t('profile'), href: '#' },
    { label: t('settings'), href: '#' },
    { label: t('logout'), href: '#' },
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
