import { useLocale, useTranslations } from 'next-intl';

import { getProjects, getSecondaryProjects, type Locale } from '@/lib/resume';
import { ProjectCard } from './components/ProjectCard';
import { OtherProjects } from './components/OtherProjects';

export function Works() {
  const t = useTranslations('Works');
  const locale = useLocale() as Locale;

  const projects = getProjects(locale);
  const others = getSecondaryProjects(locale);

  return (
    <section id="works" className="relative w-full bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-page -translate-x-1/2 md:block"
      >
        <span className="absolute inset-y-0 left-0 w-px bg-line" />
        <span className="absolute inset-y-0 right-0 w-px bg-line" />
      </div>

      <div className="mx-auto w-full max-w-page px-5 py-18 md:px-0 md:py-28">
        <header className="flex flex-col gap-3 md:gap-3.5">
          <p className="ds-eyebrow text-ink-3">{t('eyebrow')}</p>
          <h2 className="ds-m-h1 md:ds-h1 max-w-[620px] text-ink">
            {t('title')}
          </h2>
          <p className="ds-body md:ds-body-lg max-w-[620px] text-ink-3">
            {t('subtitle')}
          </p>
        </header>

        <div className="mt-[82px] grid grid-cols-1 items-start gap-4 md:mt-[106px] md:grid-cols-2 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {others.length > 0 && <OtherProjects projects={others} />}
        </div>
      </div>
    </section>
  );
}
