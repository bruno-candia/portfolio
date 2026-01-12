'use client';

import { useTranslations } from 'next-intl';
import { ConvergentLines } from './components/ConvergentLines';
import { ExperienceTimeline } from './components/ExperienceTimeline';

export function Experience() {
  const t = useTranslations('Experience');

  return (
    <section
      id="experience"
      className="relative w-full bg-zinc-950 py-20 flex flex-col items-center"
    >
      <h2
        className="text-2xl text-center md:text-3xl lg:text-4xl font-medium text-white pb-12 max-w-3xl px-6"
        style={{ fontFamily: 'var(--font-cabin, Cabin, sans-serif)' }}
      >
        {t('title')}
      </h2>

      <ConvergentLines />

      <ExperienceTimeline />
    </section>
  );
}
