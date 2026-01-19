import { useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { skillsData } from '../data/skills';

export const useSkillsViewModel = () => {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    sendGAEvent('event', 'select_skill_category', {
      event_category: 'content_interaction',
      event_label: categoryId,
    });
  };

  const activeCategoryData = skillsData.find(
    (cat) => cat.id === activeCategory
  );

  return {
    categories: skillsData,
    activeCategory,
    activeCategoryData,
    handleCategoryClick,
  };
};
