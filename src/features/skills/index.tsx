'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { skillsData } from './data/skills';
import { SkillCard } from './components/SkillCard';
import { CodeTerminal } from '@/components/molecules/terminal/CodeTerminal';
import { useSkillsScrollAnimation } from './hooks/useSkillsScrollAnimation';

export function Skills() {
  const t = useTranslations('Skills');
  const sectionRef = useRef<HTMLElement>(null);

  const { activeCategory, activeCategoryData, selectedTech, handleTechClick } =
    useSkillsScrollAnimation({
      categories: skillsData,
      containerRef: sectionRef,
    });

  const CurrentIconComponent =
    selectedTech?.icon || activeCategoryData?.defaultIcon;
  const currentCode =
    selectedTech?.codeSnippet || activeCategoryData?.defaultCode || '';
  const currentLanguage =
    selectedTech?.language ||
    activeCategoryData?.defaultLanguage ||
    'plaintext';
  const currentColor =
    selectedTech?.color || activeCategoryData?.defaultColor || '#fff';

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full flex justify-center bg-zinc-950"
    >
      <div className="max-w-[1080px] w-full mx-auto overflow-hidden lg:overflow-visible">
        <div className="pt-16 lg:pt-20 pl-6 lg:pl-0">
          <h2 className="text-[30px] font-medium mb-6">{t('title')}</h2>
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          <div className="relative">
            {skillsData.map((category) => (
              <div key={category.id} data-skill-card={category.id}>
                <SkillCard
                  category={category}
                  isActive={activeCategory === category.id}
                  onTechClick={handleTechClick}
                  selectedTech={
                    activeCategory === category.id ? selectedTech : null
                  }
                  showTerminal={false}
                />
              </div>
            ))}
          </div>

          <div className="relative self-stretch">
            <div className="sticky top-32 py-8">
              <CodeTerminal
                code={currentCode}
                language={currentLanguage}
                title={`${activeCategory}.${currentLanguage}`}
                icon={CurrentIconComponent && <CurrentIconComponent />}
                iconColor={currentColor}
              />
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          {skillsData.map((category) => (
            <div key={category.id} data-skill-card={category.id}>
              <SkillCard
                category={category}
                isActive={true}
                onTechClick={handleTechClick}
                selectedTech={selectedTech}
                showTerminal={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
