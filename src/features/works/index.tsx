import { useLocale, useTranslations } from 'next-intl';

import { PageRules, pageContent } from '@/components/atoms/page';
import { getProjects, getSecondaryProjects, type Locale } from '@/lib/resume';
import { cn } from '@/lib/utils';
import { ProjectCard } from './components/ProjectCard';
import { OtherProjects } from './components/OtherProjects';

export function Works() {
  const t = useTranslations('Works');
  const locale = useLocale() as Locale;

  const projects = getProjects(locale);
  const others = getSecondaryProjects(locale);

  return (
    <section id="works" className="relative w-full bg-bg">
      <PageRules />

      <div className={cn(pageContent, 'py-18 md:py-28')}>
        <header className="flex flex-col gap-3 md:gap-3.5">
          <p className="ds-eyebrow text-ink-3">{t('eyebrow')}</p>
          <h2 className="ds-m-h1 md:ds-h1 max-w-[620px] text-ink">
            {t('title')}
          </h2>
          <p className="ds-body md:ds-body-lg max-w-[620px] text-ink-3">
            {t('subtitle')}
          </p>
        </header>

        {/*
         * The cards stretch so every row ends on the same line. The actions
         * row is pushed down by `mt-auto` inside the card. "Others" opts out:
         * it is a list, and stretching it would leave a tall empty box.
         */}
        <div className="mt-[82px] grid grid-cols-1 gap-4 md:mt-[106px] md:grid-cols-2 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {others.length > 0 && (
            <OtherProjects className="self-start" projects={others} />
          )}
        </div>
      </div>
    </section>
  );
}
