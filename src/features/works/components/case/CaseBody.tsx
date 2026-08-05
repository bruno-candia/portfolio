import { useTranslations } from 'next-intl';

import type { Project } from '@/lib/resume';

export function CaseBody({ project }: { project: Project }) {
  const t = useTranslations('Case');

  return (
    <div className="flex flex-col gap-10">
      {project.problem && <Block title={t('problem')} text={project.problem} />}
      {project.built && <Block title={t('built')} text={project.built} />}

      {project.highlights.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="ds-h3 text-ink">{t('decisions')}</h2>

          {project.highlights.map((decision) => (
            <article key={decision.call} className="flex flex-col gap-1">
              <h3 className="ds-mono-label text-ink">{decision.call}</h3>
              <p className="ds-small text-ink-3">{decision.why}</p>
            </article>
          ))}
        </section>
      )}

      {project.result && <Block title={t('result')} text={project.result} />}
      {project.retrospective && (
        <Block title={t('retrospective')} text={project.retrospective} />
      )}
    </div>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="ds-h3 text-ink">{title}</h2>
      <p className="ds-body text-ink-3">{text}</p>
    </section>
  );
}
