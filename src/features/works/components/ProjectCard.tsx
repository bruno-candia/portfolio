import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import type { Project } from '@/lib/resume';
import {
  SHOWN_KEYWORDS,
  externalLink,
  hiddenKeywordCount,
  sealFor,
  yearRange,
} from '../lib/project-card';

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('Works');

  const seal = sealFor(project);
  const external = externalLink(project);
  const hidden = hiddenKeywordCount(project);

  return (
    <article className="relative flex flex-col overflow-hidden rounded-[12px] border border-line bg-surface transition-colors hover:border-line-strong">
      {project.image && (
        <div className="relative aspect-16/9 w-full bg-inset md:aspect-2/1">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 768px) 528px, 350px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="ds-m-mono md:ds-mono-label text-ink-3">
          {yearRange(project, t('present'))} · {t(`kind.${kindKey(project)}`)}
        </p>

        <h3 className="mt-2.5 ds-h4 md:ds-h3 text-ink">{project.name}</h3>

        <p className="mt-2.5 ds-small text-ink-2">{project.description}</p>

        {project.detail && (
          <p className="mt-2.5 ds-small text-ink-3">{project.detail}</p>
        )}

        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {project.keywords.slice(0, SHOWN_KEYWORDS).map((keyword) => (
            <li
              key={keyword}
              className="ds-mono-label rounded-sm border border-line bg-surface px-[9px] py-[5px] text-ink-2"
            >
              {keyword}
            </li>
          ))}
          {hidden > 0 && (
            <li className="ds-mono-label rounded-sm border border-line bg-surface px-[9px] py-[5px] text-ink-2">
              +{hidden}
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center gap-4 border-t border-line pt-4">
          {/*
           * The card is one link, not a div with onClick: `after` stretches
           * this anchor over the whole card so the hit area matches the
           * design while the keyboard still gets a single real target.
           */}
          <Link
            href={`/projetos/${project.slug}`}
            className="ds-small text-ink after:absolute after:inset-0 hover:underline"
          >
            {t('case')} <span aria-hidden>→</span>
          </Link>

          {external && (
            <a
              href={external.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative ds-small text-ink-3 hover:text-ink"
            >
              {t(`link.${external.label}`)} <span aria-hidden>↗</span>
            </a>
          )}

          {seal && (
            <span className="ml-auto shrink-0 rounded-[4px] border border-line px-2 py-1 ds-mono-label text-ink-3">
              {t(`seal.${seal}`)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function kindKey(project: Project) {
  return project.type.replace(/\s+/g, '-');
}
