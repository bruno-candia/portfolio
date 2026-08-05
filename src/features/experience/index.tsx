import { useLocale, useTranslations } from 'next-intl';

import { PageRules, pageContent } from '@/components/atoms/page';
import { getWork, type Locale } from '@/lib/resume';
import { cn } from '@/lib/utils';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { formatPeriod, firstLine } from './lib/period';

export function Experience() {
  const t = useTranslations('Experience');
  const locale = useLocale() as Locale;

  const jobs = getWork(locale);
  const periods = jobs.map((job) =>
    formatPeriod(job, locale, t('joiner'), t('present'))
  );

  return (
    <section id="experience" className="relative w-full bg-bg">
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

        <ExperienceTimeline
          jobs={jobs}
          periods={periods}
          rootLabel={t('root', { date: firstLine(jobs, locale) })}
        />
      </div>
    </section>
  );
}
