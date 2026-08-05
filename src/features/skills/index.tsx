import { useLocale, useTranslations } from 'next-intl';

import { PageRules, pageContent } from '@/components/atoms/page';
import { getSkills, type Locale } from '@/lib/resume';
import { cn } from '@/lib/utils';
import { SkillsBento } from './components/SkillsBento';

export function Skills() {
  const t = useTranslations('Skills');
  const locale = useLocale() as Locale;

  return (
    <section id="skills" className="relative w-full bg-bg">
      <PageRules />

      <div className={cn(pageContent, 'py-20 md:py-28')}>
        <header className="flex flex-col gap-3.5">
          <p className="ds-eyebrow text-ink-3">{t('eyebrow')}</p>
          <h2 className="ds-m-h1 md:ds-h1 max-w-[680px] text-ink">
            {t('title')}
          </h2>
          <p className="ds-body md:ds-body-lg max-w-[620px] text-ink-3">
            {t('subtitle')}
          </p>
        </header>

        <SkillsBento skills={getSkills(locale)} />
      </div>
    </section>
  );
}
