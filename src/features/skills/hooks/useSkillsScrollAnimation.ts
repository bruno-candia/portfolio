'use client';

import { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillCategory, TechStack } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

interface UseSkillsScrollAnimationProps {
  categories: SkillCategory[];
  containerRef: React.RefObject<HTMLElement | null>;
}

interface UseSkillsScrollAnimationReturn {
  activeCategory: string;
  activeCategoryData: SkillCategory | undefined;
  selectedTech: TechStack | null;
  handleTechClick: (tech: TechStack) => void;
}

export function useSkillsScrollAnimation({
  categories,
  containerRef,
}: UseSkillsScrollAnimationProps): UseSkillsScrollAnimationReturn {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
  const [selectedTech, setSelectedTech] = useState<TechStack | null>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      categories.forEach((category) => {
        const cardSelector = `[data-skill-card="${category.id}"]`;

        ScrollTrigger.create({
          trigger: cardSelector,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            setActiveCategory(category.id);
            setSelectedTech(null);
          },
          onEnterBack: () => {
            setActiveCategory(category.id);
            setSelectedTech(null);
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [categories, containerRef]);

  const handleTechClick = useCallback((tech: TechStack) => {
    setSelectedTech(tech);
  }, []);

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  return {
    activeCategory,
    activeCategoryData,
    selectedTech,
    handleTechClick,
  };
}
