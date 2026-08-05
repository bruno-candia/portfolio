import type { Project } from '@/lib/resume';

export type SealKey = 'timeline' | 'open' | 'closed';

export type LinkLabel = 'repository' | 'behance' | 'live';

export interface ExternalLink {
  href: string;
  label: LinkLabel;
}

/** "2018 to 2023", or "2025 to present" while it is still running. */
export function yearRange(
  project: Project,
  joiner: string,
  present: string
): string {
  const start = project.startDate?.slice(0, 4);
  if (!start) return '';
  return `${start} ${joiner} ${project.endDate?.slice(0, 4) ?? present}`;
}

/**
 * Being part of the career timeline says more than the repository being
 * closed, so it wins when a project has both.
 */
export function sealFor(project: Project): SealKey | null {
  if (project.workId) return 'timeline';
  if (!project.visibility) return null;
  return project.visibility === 'open-source' ? 'open' : 'closed';
}

/**
 * A finished project has no live site: Aurem's `url` points at a LinkedIn
 * page, which is not something to offer as "live".
 */
export function externalLink(project: Project): ExternalLink | null {
  if (project.repository) {
    return { href: project.repository, label: 'repository' };
  }
  if (!project.url || project.endDate) return null;
  return { href: project.url, label: labelForHost(project.url) };
}

function labelForHost(url: string): LinkLabel {
  if (url.includes('github.com')) return 'repository';
  if (url.includes('behance.net')) return 'behance';
  return 'live';
}

export function hiddenKeywordCount(total: number, shown: number): number {
  return Math.max(0, total - shown);
}

/** Number of editorial chips whose right edge fits on the first line. */
export function fittedKeywordCount(
  rightEdges: number[],
  availableWidth: number
): number {
  if (rightEdges.length === 0) return 0;

  const firstOverflow = rightEdges.findIndex((edge) => edge > availableWidth);
  return Math.max(1, firstOverflow === -1 ? rightEdges.length : firstOverflow);
}
