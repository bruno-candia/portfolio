import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import type { Locale, Project, Work } from '@/lib/resume';
import { monthRange } from '../../lib/case';

export function CaseSidebar({
  project,
  work,
  locale,
}: {
  project: Project;
  work?: Work;
  locale: Locale;
}) {
  const t = useTranslations('Case');
  const tw = useTranslations('Works');

  const period = monthRange(project, locale, tw('present'));

  return (
    <aside className="h-fit rounded-[12px] border border-line md:sticky md:top-[88px]">
      <div className="flex flex-col gap-5 p-6">
        {work && <Meta label={t('role')} value={work.position} />}
        {period && <Meta label={t('period')} value={period} />}

        <span aria-hidden className="h-px bg-line" />

        <div className="flex flex-col gap-2.5">
          <p className="ds-mono-label text-ink-3">{t('stack')}</p>
          <ul className="flex flex-wrap gap-1.5">
            {project.keywords.map((keyword) => (
              <li
                key={keyword}
                className="ds-mono-label rounded-sm border border-line px-2 py-1 text-ink-2"
              >
                {keyword}
              </li>
            ))}
          </ul>
        </div>

        {work && (
          <>
            <span aria-hidden className="h-px bg-line" />

            <div className="flex flex-col gap-1.5">
              <p className="ds-mono-label text-ink-3">{tw('seal.timeline')}</p>
              <Link
                href="/#experience"
                className="ds-small text-ink hover:underline"
              >
                {t('crossLink')} <span aria-hidden>↑</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="ds-mono-label text-ink-3">{label}</p>
      <p className="ds-small text-ink">{value}</p>
    </div>
  );
}
