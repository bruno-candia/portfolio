'use client';

import type { Skill } from '@/lib/resume';
import { TECH_COLORS } from '../data/tech-colors';

const NEUTRAL = '#8a8f98';

interface Props {
  skill: Skill;
  selected: string;
  onSelect: (tech: string) => void;
}

export function SkillCard({ skill, selected, onSelect }: Props) {
  return (
    <article className="rounded-xl border border-line bg-surface p-5">
      <h3 className="ds-h3 text-ink">{skill.name}</h3>
      <p className="mt-2.5 ds-small text-ink-3">{skill.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {skill.keywords.map((tech) => {
          const color = TECH_COLORS[tech] ?? NEUTRAL;
          const isCore = skill.core.includes(tech);
          const isSelected = selected === tech;

          return (
            <li key={tech}>
              <button
                type="button"
                onClick={() => onSelect(tech)}
                aria-pressed={isSelected}
                className={`inline-flex h-[34px] cursor-pointer items-center gap-2 rounded-[6px] border py-1.5 pr-3 pl-2.5 ds-small transition-colors ${
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
      </ul>
    </article>
  );
}
