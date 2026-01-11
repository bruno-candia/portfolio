import { useTranslations } from 'next-intl';

export const useHeroViewModel = () => {
  const t = useTranslations('Hero');

  return {
    greeting: t('greeting'),
    role: t('role'),
    description: t('description'),
    scrollDown: t('scrollDown'),
    socials: [
      { label: 'LinkedIn', href: '#', icon: 'linkedin' },
      { label: 'WhatsApp', href: '#', icon: 'whatsapp' },
      { label: 'GitHub', href: '#', icon: 'github' },
    ],
  };
};
