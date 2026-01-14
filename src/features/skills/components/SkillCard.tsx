'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SkillCategory, TechStack } from '../data/skills';
import { CodeTerminal } from '@/components/molecules/terminal/CodeTerminal';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  category: SkillCategory;
  isActive?: boolean;
  onTechClick?: (tech: TechStack) => void;
  selectedTech?: TechStack | null;
  showTerminal?: boolean;
}

export function SkillCard({
  category,
  isActive = true,
  onTechClick,
  selectedTech,
  showTerminal = true,
}: SkillCardProps) {
  const t = useTranslations('Skills');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const isTechFromCategory =
    selectedTech &&
    category.stacks.some((stack) => stack.id === selectedTech.id);

  const effectiveTech = isTechFromCategory
    ? selectedTech
    : showTerminal
      ? category.stacks[0]
      : null;

  const currentTech = effectiveTech;
  const CurrentIconComponent = currentTech?.icon || category.defaultIcon;
  const currentCode = currentTech?.codeSnippet || category.defaultCode;
  const currentLanguage = currentTech?.language || category.defaultLanguage;
  const currentColor = currentTech?.color || category.defaultColor;

  return (
    <div
      className={cn(
        'flex flex-col justify-center gap-4 p-6 lg:px-0 lg:pt-24 lg:pb-8 lg:min-h-screen lg:justify-start transition-opacity duration-500',
        isActive ? 'opacity-100' : 'opacity-50'
      )}
    >
      <h3
        className="text-[30px] font-medium capitalize mb-6"
        style={{ fontFamily: 'var(--font-cabine, Cabin, sans-serif)' }}
      >
        {t(`categories.${category.id}.title`)}
      </h3>

      <p className="text-zinc-400 text-lg mb-8 max-w-lg leading-relaxed">
        {t(`categories.${category.id}.description`)}
      </p>

      {showTerminal && (
        <div className="lg:hidden mb-8">
          <CodeTerminal
            code={currentCode}
            language={currentLanguage}
            title={`${category.id}.${currentLanguage}`}
            icon={<CurrentIconComponent aria-hidden="true" />}
            iconColor={currentColor}
          />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {category.stacks.map((stack) => {
          const isSelected = effectiveTech?.id === stack.id;
          const isHovered = hoveredTech === stack.id;
          const activeColor = stack.color || category.defaultColor;

          return (
            <button
              key={stack.id}
              onClick={() => onTechClick?.(stack)}
              onMouseEnter={() => setHoveredTech(stack.id)}
              onMouseLeave={() => setHoveredTech(null)}
              className={cn(
                'relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer group',
                !isSelected &&
                  'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900'
              )}
              style={
                isSelected
                  ? {
                      backgroundColor: `${activeColor}15`,
                      borderColor: `${activeColor}50`,
                      boxShadow: `0 0 15px -5px ${activeColor}`,
                    }
                  : isHovered
                    ? {
                        borderColor: `${activeColor}50`,
                      }
                    : undefined
              }
              title={
                t.has(
                  `categories.${category.id}.stacks.${stack.id}.description`
                )
                  ? t(
                      `categories.${category.id}.stacks.${stack.id}.description`
                    )
                  : stack.id
              }
            >
              {stack.learning && (
                <span
                  className="absolute -top-2 -left-2 px-1.5 py-0.5 text-[10px] font-bold rounded-md z-10 animate-pulse"
                  style={{
                    backgroundColor: '#EAB308',
                    color: '#000',
                    boxShadow: '0 0 8px 2px rgba(234, 179, 8, 0.5)',
                  }}
                >
                  {t('learning')}
                </span>
              )}
              <div
                className={cn(
                  'text-xl transition-colors duration-200',
                  !isSelected && !isHovered && 'text-zinc-400'
                )}
                style={
                  isSelected || isHovered ? { color: activeColor } : undefined
                }
              >
                <stack.icon aria-hidden="true" />
              </div>
              <span
                className={cn(
                  'text-sm font-medium capitalize truncate transition-colors duration-200',
                  !isSelected && !isHovered && 'text-zinc-200'
                )}
                style={isSelected || isHovered ? { color: 'white' } : undefined}
                title={
                  t.has(`categories.${category.id}.stacks.${stack.id}.name`)
                    ? t(`categories.${category.id}.stacks.${stack.id}.name`)
                    : stack.id
                }
              >
                {t.has(`categories.${category.id}.stacks.${stack.id}.name`)
                  ? t(`categories.${category.id}.stacks.${stack.id}.name`)
                  : stack.id}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
