import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import type { Project, Work } from '@/lib/resume';
import { sealFor, yearRange } from '../../lib/project-card';
import { caseLink } from '../../lib/case';

export function CaseHeader({
  project,
  work,
}: {
  project: Project;
  work?: Work;
}) {
  const t = useTranslations('Case');
  const tw = useTranslations('Works');

  const external = caseLink(project);
  const seal = sealFor(project);

  // The eyebrow carries the role only when the project was also a job.
  const eyebrow = [
    yearRange(project, tw('rangeJoiner'), tw('present')),
    tw(`kind.${project.type.replace(/\s+/g, '-')}`),
    work?.position,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <header>
      <Link
        href="/#works"
        className="ds-small flex w-fit items-center gap-2 text-ink-3 hover:text-ink"
      >
        <span aria-hidden>←</span> {t('back')}
      </Link>

      <div className="mt-7 flex max-w-[760px] flex-col gap-3.5">
        <p className="ds-mono-label text-ink-3">{eyebrow}</p>
        <h1 className="ds-m-display md:ds-display text-ink">{project.name}</h1>
        <p className="ds-body md:ds-body-lg text-ink-2">
          {[project.description, project.detail].filter(Boolean).join(' ')}
        </p>
      </div>

      {(external || seal) && (
        <div className="mt-12 flex flex-wrap items-center gap-3">
          {external && (
            <a
              href={external.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-small inline-flex items-center gap-2 rounded-[10px] border border-line-strong px-[18px] py-2.5 text-ink transition-colors hover:border-line-hard"
            >
              {tw(`link.${external.label}`)} <span aria-hidden>↗</span>
            </a>
          )}

          {seal && (
            <span className="ds-mono-label rounded-[4px] border border-line px-2.5 py-1.5 text-ink-3">
              {tw(`seal.${seal}`)}
            </span>
          )}
        </div>
      )}

      {project.image && (
        <div className="relative mt-[34px] aspect-16/9 w-full overflow-hidden rounded-[12px] border border-line bg-inset md:aspect-[1080/500]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority
            sizes="(min-width: 768px) 1080px, 100vw"
            className="object-cover"
          />
        </div>
      )}
    </header>
  );
}
