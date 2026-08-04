'use client';

import { useState } from 'react';

import type { Skill } from '@/lib/resume';
import { SkillCard } from './SkillCard';
import { SkillsTerminal } from './SkillsTerminal';
import { TECH_SNIPPETS } from '../data/tech-snippets';

const DEFAULT_TECH = 'TypeScript';

export function SkillsBento({ skills }: { skills: Skill[] }) {
  const [selected, setSelected] = useState(DEFAULT_TECH);
  const [featured, ...others] = skills;

  const snippet = TECH_SNIPPETS[selected];

  return (
    <div className="mt-9 grid grid-cols-1 gap-x-13 gap-y-5 md:grid-cols-2">
      <SkillCard skill={featured} selected={selected} onSelect={setSelected} />

      <SkillsTerminal
        fileName={fileNameFor(selected, snippet?.language)}
        code={snippet?.code}
        language={snippet?.language}
      />

      {others.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          selected={selected}
          onSelect={setSelected}
        />
      ))}
    </div>
  );
}

const EXTENSION: Record<string, string> = {
  python: 'py',
  bash: 'sh',
  yaml: 'yml',
  javascript: 'js',
  typescript: 'ts',
};

function fileNameFor(tech: string, language = 'ts') {
  const slug = tech
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug}.${EXTENSION[language] ?? language}`;
}
