import { useState } from 'react';
import { sendAnalyticsEvent } from '@/utils/analytics';
import { skillsData } from '../data/skills';

export const useSkillsViewModel = () => {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    sendAnalyticsEvent('select_skill_category', {
      category_id: categoryId,
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
