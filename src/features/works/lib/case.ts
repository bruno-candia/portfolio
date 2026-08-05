import type { Locale, Project } from '@/lib/resume';
import { isHost } from '@/lib/utils';

/**
 * The case page links out even when the project is over, because there the
 * LinkedIn page is the record of it, which is not true on a card that
 * offers a live site.
 */
export function caseLink(project: Project) {
  const href = project.repository ?? project.url;
  if (!href) return null;

  if (isHost(href, 'github.com')) return { href, label: 'repository' };
  if (isHost(href, 'behance.net')) return { href, label: 'behance' };
  if (isHost(href, 'linkedin.com')) return { href, label: 'linkedin' };
  return { href, label: 'live' };
}

/** "fev 2018 a mai 2023", or an open range while the project runs. */
export function monthRange(
  project: Project,
  locale: Locale,
  joiner: string,
  present: string
): string {
  const start = formatMonth(project.startDate, locale);
  if (!start) return '';

  return `${start} ${joiner} ${formatMonth(project.endDate, locale) ?? present}`;
}

function formatMonth(value: string | undefined, locale: Locale) {
  if (!value) return undefined;

  const [year, month] = value.split('-');
  const date = new Date(Number(year), Number(month ?? 1) - 1);
  const name = new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
    month: 'short',
  })
    .format(date)
    .replace('.', '');

  return `${name} ${year}`;
}

/** The case before and after this one, wrapping at both ends. */
export function neighbours(projects: Project[], slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  const at = (offset: number) =>
    projects[(index + offset + projects.length) % projects.length];

  return {
    previous: projects.length > 1 ? at(-1) : undefined,
    next: projects.length > 1 ? at(1) : undefined,
  };
}
