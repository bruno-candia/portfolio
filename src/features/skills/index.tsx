import { useLocale, useTranslations } from 'next-intl';

import { getSkills, type Locale } from '@/lib/resume';
import { SkillsBento } from './components/SkillsBento';

export function Skills() {
  const t = useTranslations('Skills');
  const locale = useLocale() as Locale;

  return (
    <section id="skills" className="relative w-full bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-page -translate-x-1/2 md:block"
      >
        <span className="absolute inset-y-0 left-0 w-px bg-line" />
        <span className="absolute inset-y-0 right-0 w-px bg-line" />
      </div>

      <div className="mx-auto w-full max-w-page px-5 py-20 md:px-8 md:py-28">
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
