import { useTranslations } from 'next-intl';

export const useAboutViewModel = () => {
  const t = useTranslations('About');

  return {
    title: t('title'),
    description: t('description'),
    buttonLabel: t('button'),
    scrollToExplore: t('scrollToExplore'),
    shortStory: t('shortStory'),
  };
};
