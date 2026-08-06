import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import type { Project } from '@/lib/resume';

export function CaseNav({
  previous,
  next,
}: {
  previous?: Project;
  next?: Project;
}) {
  const t = useTranslations('Case');

  if (!previous && !next) return null;

  return (
    <nav className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {previous && (
        <Card project={previous} label={t('previous')} align="text-left" />
      )}
      {next && (
        <Card
          project={next}
          label={t('next')}
          align="text-left md:text-right"
        />
      )}
    </nav>
  );
}

function Card({
  project,
  label,
  align,
}: {
  project: Project;
  label: string;
  align: string;
}) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className={`flex flex-col gap-1.5 rounded-[12px] border border-line p-5 transition-colors hover:border-line-strong ${align}`}
    >
      <span className="ds-mono-label text-ink-3">{label}</span>
      <span className="ds-h4 text-ink">{project.name}</span>
    </Link>
  );
}
