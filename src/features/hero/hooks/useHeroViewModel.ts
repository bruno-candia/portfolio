import { useTranslations } from 'next-intl';

export const useHeroViewModel = () => {
  const t = useTranslations('Hero');

  return {
    greeting: t('greeting'),
    role: t('role'),
    description: t('description'),
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
