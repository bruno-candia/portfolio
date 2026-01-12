'use client';

import { useTranslations } from 'next-intl';
import { Experience } from '../data/experience';
import { cn } from '@/lib/utils';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isVisible: boolean;
}

export function ExperienceCard({
  experience,
  index,
  isVisible,
}: ExperienceCardProps) {
  const t = useTranslations('Experience');
  const isLeft = index % 2 === 0;

  const role = t.has(`experiences.${experience.id}.role`)
    ? t(`experiences.${experience.id}.role`)
    : 'Developer';

  const description = t.has(`experiences.${experience.id}.description`)
    ? t(`experiences.${experience.id}.description`)
    : '';

  return (
    <div
      className={cn(
        'relative flex items-center gap-12 md:gap-24 transition-all duration-700 w-full',
        isLeft ? 'flex-row' : 'flex-row-reverse',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div
        className={cn(
          'flex-1 bg-zinc-950/80 backdrop-blur-sm p-6 rounded-2xl md:bg-transparent md:p-0 md:backdrop-blur-none border border-zinc-800 md:border-none',
          isLeft ? 'text-left' : 'text-right'
        )}
      >
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">
          {experience.company}
        </h3>
        <p className="text-xl md:text-2xl text-zinc-400 font-light mb-3">
          {role}
        </p>
        <p
          className={cn(
            'text-base md:text-lg text-zinc-500 mb-3 max-w-lg',
            isLeft ? 'mr-auto' : 'ml-auto'
          )}
        >
          {description}
        </p>
        <p className="text-base text-zinc-400">{experience.period}</p>
      </div>

      <div className="relative shrink-0 w-4 flex justify-center">
        <div className="w-4 h-4 rounded-full bg-white border-4 border-zinc-950 z-10" />
      </div>

      <div className="flex-1 hidden md:block" />
    </div>
  );
}
