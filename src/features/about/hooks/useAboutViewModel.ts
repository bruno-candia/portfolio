import { useTranslations } from 'next-intl';

export const useAboutViewModel = () => {
  const t = useTranslations('About');

  return {
    eyebrow: t('eyebrow'),
    title: t('title'),
    description: t('description'),
    scrollToExplore: t('scrollToExplore'),
    shortStory: t('shortStory'),
  };
};
