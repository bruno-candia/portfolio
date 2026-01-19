import { useTranslations } from 'next-intl';
import { sendGAEvent } from '@next/third-parties/google';

export const useHeroViewModel = () => {
  const t = useTranslations('Hero');

  const handleDownloadCV = () => {
    sendGAEvent('event', 'download_cv', {
      event_category: 'engagement',
      event_label: 'CV Download',
      value: 1,
    });
  };

  const handleSocialClick = (network: string) => {
    sendGAEvent('event', 'click_social', {
      event_category: 'engagement',
      event_label: network,
    });
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
      },
      {
        label: 'GitHub',
        href: 'https://github.com/bruno-candia',
        icon: 'github',
      },
      {
        label: 'Behance',
        href: 'https://www.behance.net/brunocostac3',
        icon: 'behance',
      },
    ],
  };
};
