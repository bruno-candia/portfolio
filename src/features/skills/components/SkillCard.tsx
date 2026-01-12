'use client';

import { useState } from 'react';
import { Zap } from 'lucide-react';
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
        'flex flex-col justify-center gap-4 p-8 lg:px-0 lg:pt-24 lg:pb-8 lg:min-h-screen lg:justify-start transition-opacity duration-500',
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
            icon={<CurrentIconComponent />}
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
                'flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer group',
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
              <div
                className={cn(
                  'text-xl transition-colors duration-200',
                  !isSelected && !isHovered && 'text-zinc-400'
                )}
                style={
                  isSelected || isHovered ? { color: activeColor } : undefined
                }
              >
                <stack.icon />
              </div>
              <span
                className={cn(
                  'text-sm font-medium capitalize truncate transition-colors duration-200',
                  !isSelected && !isHovered && 'text-zinc-300'
                )}
                style={isSelected || isHovered ? { color: 'white' } : undefined}
              >
                {t.has(`categories.${category.id}.stacks.${stack.id}.name`)
                  ? t(`categories.${category.id}.stacks.${stack.id}.name`)
                  : stack.id}
              </span>
              {stack.learning && (
                <Zap
                  size={12}
                  className="ml-auto animate-pulse"
                  style={{ color: '#EAB308' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
