import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import type { Work } from '@/lib/resume';

export function ExperienceEntry({
  job,
  period,
  onPointerEnter,
}: {
  job: Work;
  period: string;
  onPointerEnter: () => void;
}) {
  const t = useTranslations('Experience');

  return (
    <li
      data-entry={job.id}
      onPointerEnter={onPointerEnter}
      className="grid grid-cols-1 gap-1.5 md:grid-cols-[160px_1fr] md:gap-0"
    >
      <p className="ds-m-mono md:ds-mono-label pt-0 text-ink-3 md:pt-[7px]">
        {period}
      </p>

      <div className="flex flex-col gap-1.5 md:gap-2">
        <h3 data-node-anchor className="ds-h4 md:ds-h3 text-ink">
          {job.company}
        </h3>
        <p className="ds-small text-ink-2">{job.position}</p>

        <p className="mt-1 max-w-[640px] ds-small text-ink-3">{job.summary}</p>

        {job.highlights.length > 0 && (
          <ul className="mt-1.5 flex flex-wrap gap-1.5 md:gap-2">
            {job.highlights.map((highlight) => (
              <li
                key={highlight}
                className="ds-mono-label rounded-md border border-line px-[9px] py-[5px] text-ink-2"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {job.projectId && (
          <Link
            href={`/projetos/${job.projectId}`}
            className="mt-1 w-fit ds-mono-label text-ink-3 transition-colors hover:text-ink"
          >
            {t('caseLink')} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </li>
  );
}
