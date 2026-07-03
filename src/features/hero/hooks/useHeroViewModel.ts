import { useLocale, useTranslations } from 'next-intl';
import { sendAnalyticsEvent } from '@/utils/analytics';

export const useHeroViewModel = () => {
  const t = useTranslations('Hero');
  const locale = useLocale() as 'pt' | 'en';

  const handleDownloadCV = () => {
    sendAnalyticsEvent('download_cv', { locale });
  };

  const handleSocialClick = (platform: 'linkedin' | 'github' | 'behance') => {
    sendAnalyticsEvent('click_social', { platform });
  };

  return {
    greeting: t('greeting'),
    role: t('role'),
    description: t('description'),
    cvDownloadText: t('downloadCV'),
    handleDownloadCV,
    handleSocialClick,
    socials: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/bruno-costa-candia/',
        icon: 'linkedin',
        platform: 'linkedin' as const,
      },
      {
        label: 'GitHub',
        href: 'https://github.com/bruno-candia',
        icon: 'github',
        platform: 'github' as const,
      },
      {
        label: 'Behance',
        href: 'https://www.behance.net/brunocostac3',
        icon: 'behance',
        platform: 'behance' as const,
      },
    ],
  };
};
