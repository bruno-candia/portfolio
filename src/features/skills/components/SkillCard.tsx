'use client';

import type { Skill } from '@/lib/resume';
import { SkillKeywords } from './SkillKeywords';

interface Props {
  skill: Skill;
  selected: string;
  onSelect: (tech: string) => void;
}

export function SkillCard({ skill, selected, onSelect }: Props) {
  return (
    <article className="rounded-xl border border-line bg-surface p-5">
      <h3 className="ds-h4 md:ds-h3 text-ink">{skill.name}</h3>
      <p className="mt-2.5 ds-small text-ink-3">{skill.description}</p>

      <div className="mt-5">
        <SkillKeywords skill={skill} selected={selected} onSelect={onSelect} />
      </div>
    </article>
  );
}
