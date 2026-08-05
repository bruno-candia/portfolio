'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import type { Skill } from '@/lib/resume';
import { TECH_COLORS } from '../data/tech-colors';

const NEUTRAL = '#8a8f98';

const chipClassName =
  'inline-flex h-[34px] cursor-pointer items-center gap-2 rounded-[6px] border py-1.5 pr-3 pl-2.5 ds-small transition-colors';

/**
 * Narrow, the card shows the core of the stack and counts the rest. The
 * collapsing is CSS rather than a measured count, so the server already sends
 * the short list and the card never renders long and then snaps.
 */
export function SkillKeywords({
  skill,
  selected,
  onSelect,
}: {
  skill: Skill;
  selected: string;
  onSelect: (tech: string) => void;
}) {
  const t = useTranslations('Skills');
  const [expanded, setExpanded] = useState(false);

  const hidden = skill.keywords.filter(
    (tech) => !skill.core.includes(tech)
  ).length;

  return (
    <ul className="flex flex-wrap gap-2">
      {skill.keywords.map((tech) => {
        const color = TECH_COLORS[tech] ?? NEUTRAL;
        const isCore = skill.core.includes(tech);
        const isSelected = selected === tech;

        return (
          <li
            key={tech}
            className={isCore || expanded ? undefined : 'max-md:hidden'}
          >
            <button
              type="button"
              onClick={() => onSelect(tech)}
              aria-pressed={isSelected}
              className={`${chipClassName} ${
                isSelected
                  ? 'bg-surface-hi text-ink'
                  : isCore
                    ? 'border-line-strong bg-surface-hi text-ink hover:border-line-hard'
                    : 'border-line text-ink-3 hover:text-ink'
              }`}
              style={isSelected ? { borderColor: color } : undefined}
            >
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: color,
                  opacity: isSelected || isCore ? 1 : 0.45,
                }}
              />
              {tech}
            </button>
          </li>
        );
      })}

      {hidden > 0 && (
        <li className="md:hidden">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            className={`${chipClassName} border-line px-3 text-ink-3 hover:text-ink`}
          >
            {expanded ? `− ${t('less')}` : t('more', { count: hidden })}
          </button>
        </li>
      )}
    </ul>
  );
}
