import { useTranslations } from 'next-intl';

import type { Project } from '@/lib/resume';
import { externalLink } from '../lib/project-card';

export function OtherProjects({ projects }: { projects: Project[] }) {
  const t = useTranslations('Works');

  return (
    <article className="rounded-[12px] border border-line p-5 md:p-6">
      <p className="ds-mono-label text-ink-3">{t('others')}</p>

      <ul className="mt-3.5 flex flex-col gap-4 md:mt-4">
        {projects.map((project) => (
          <li key={project.id} className="border-b border-line pb-4">
            <Row project={project} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function Row({ project }: { project: Project }) {
  const t = useTranslations('Works');
  const external = externalLink(project);

  const body = (
    <>
      <span className="flex items-baseline gap-2">
        <span className="ds-h4 text-ink group-hover:underline">
          {project.name}
        </span>
        {external && (
          <span className="ml-auto shrink-0 ds-small text-ink-3">
            {t(`link.${external.label}`)} <span aria-hidden>↗</span>
          </span>
        )}
      </span>
      <span className="mt-1 block ds-mono-label text-ink-3">
        {project.description}
      </span>
    </>
  );

  if (!external) return <div>{body}</div>;

  return (
    <a
      href={external.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {body}
    </a>
  );
}
