import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { sendAnalyticsEvent } from '@/utils/analytics';

export const useSidebarViewModel = () => {
  const t = useTranslations('Sidebar');
  const locale = useLocale();
  const pathname = usePathname();

  const menuItems = [
    { id: 'about', label: t('about'), href: '#about' },
    { id: 'skills', label: t('skills'), href: '#skills' },
    { id: 'works', label: t('works'), href: '#works' },
    { id: 'experience', label: t('experience'), href: '#experience' },
    { id: 'contact', label: t('contact'), href: '#contact' },
  ];

  const languages = [
    { label: t('portuguese'), code: 'pt' },
    { label: t('english'), code: 'en' },
  ];

  const handleNavClick = (section: string) => {
    sendAnalyticsEvent('navigate', { destination: section });
  };

  return {
    locale,
    pathname,
    menuItems,
    languages,
    handleNavClick,
  };
};
