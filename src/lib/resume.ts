/**
 * Single source for career and project data.
 *
 * `resume.json` is canonical and holds everything that is not prose: dates,
 * URLs, keywords, timeline lane colours, repository visibility and the
 * cross-links between a job and its project. `resume.pt.json` is a translation
 * overlay keyed by `x_id`, so a date cannot disagree between locales.
 *
 * No runtime validation: both files are bundled at build time and TypeScript
 * types them structurally from the JSON itself.
 */

import base from '@/content/resume.json';
import ptOverlay from '@/content/resume.pt.json';

export type Locale = 'en' | 'pt';

type BaseWork = (typeof base.work)[number];
type BaseProject = (typeof base.projects)[number];
type BaseSkill = (typeof base.skills)[number];

export interface Work {
  id: string;
  company: string;
  position: string;
  summary: string;
  highlights: string[];
  startDate: string;
  endDate?: string;
  /** Colour of this job's branch in the career graph. */
  color: string;
  /** Matching project, when there is one. */
  projectId?: string;
}

/** A technical call and the reason behind it, shown as two lines. */
export interface Decision {
  call: string;
  why: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  /** One-line technical detail shown on the card. */
  detail?: string;
  /** Case study blocks; undefined until written. */
  problem?: string;
  built?: string;
  result?: string;
  /** "What I would do differently today". */
  retrospective?: string;
  highlights: Decision[];
  keywords: string[];
  /** Editorial subset ordered for the project card. */
  cardKeywords: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  repository?: string;
  image?: string;
  visibility?: 'open-source' | 'closed-source';
  /** Matching job, when there is one. */
  workId?: string;
  /** Goes to the "others" block instead of a full card. */
  secondary: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  /** Shown highlighted; the rest sits behind the "+N" chip. */
  core: string[];
  keywords: string[];
}

export interface Basics {
  name: string;
  label: string;
  email: string;
  url: string;
  summary: string;
  profiles: { network: string; url: string }[];
}

const overlay = ptOverlay as {
  basics: { label: string; summary: string };
  work: Record<
    string,
    Partial<Record<'position' | 'summary', string>> & { highlights?: string[] }
  >;
  projects: Record<string, Record<string, string | Decision[] | undefined>>;
  skills: Record<string, { name: string; description: string }>;
};

const isPt = (locale: Locale) => locale === 'pt';

export function getBasics(locale: Locale): Basics {
  const t = isPt(locale) ? overlay.basics : null;
  return {
    name: base.basics.name,
    label: t?.label ?? base.basics.label,
    email: base.basics.email,
    url: base.basics.url,
    summary: t?.summary ?? base.basics.summary,
    profiles: base.basics.profiles.map((p) => ({
      network: p.network,
      url: p.url,
    })),
  };
}

function toWork(w: BaseWork, locale: Locale): Work {
  const t = isPt(locale) ? overlay.work[w.x_id] : undefined;
  return {
    id: w.x_id,
    company: w.name,
    position: t?.position ?? w.position,
    summary: t?.summary ?? w.summary,
    highlights: t?.highlights ?? w.highlights,
    startDate: w.startDate,
    endDate: 'endDate' in w ? (w as { endDate?: string }).endDate : undefined,
    color: w.x_color,
    projectId:
      'x_project' in w ? (w as { x_project?: string }).x_project : undefined,
  };
}

function toProject(p: BaseProject, locale: Locale): Project {
  const t = isPt(locale) ? overlay.projects[p.x_id] : undefined;
  const str = (key: string, fallback?: string) => {
    const value = t?.[key];
    return typeof value === 'string' && value.length > 0 ? value : fallback;
  };
  const decisions = (fallback: Decision[]): Decision[] => {
    const value = t?.['highlights'];
    return Array.isArray(value) ? value : fallback;
  };
  const optional = <T>(key: string): T | undefined =>
    key in p ? (p as unknown as Record<string, T>)[key] : undefined;

  return {
    id: p.x_id,
    slug: p.x_slug,
    name: str('name', p.name) ?? p.name,
    type: p.type,
    description: str('description', p.description) ?? p.description,
    detail: str('detail', optional<string>('x_detail')),
    problem: str('problem', optional<string>('x_problem')),
    built: str('built', optional<string>('x_built')),
    result: str('result', optional<string>('x_result')),
    retrospective: str('retrospective', optional<string>('x_retrospective')),
    highlights: decisions(
      'highlights' in p
        ? ((p as { highlights: Decision[] }).highlights ?? [])
        : []
    ),
    keywords: p.keywords,
    cardKeywords: optional<string[]>('x_cardKeywords') ?? p.keywords,
    startDate: optional<string>('startDate'),
    endDate: optional<string>('endDate'),
    url: optional<string>('url'),
    repository: optional<string>('x_repository'),
    image: optional<string>('x_image'),
    visibility: optional<'open-source' | 'closed-source'>('x_visibility'),
    workId: optional<string>('x_work'),
    secondary: optional<boolean>('x_secondary') === true,
  };
}

function toSkill(s: BaseSkill, locale: Locale): Skill {
  const t = isPt(locale) ? overlay.skills[s.x_id] : undefined;
  return {
    id: s.x_id,
    name: t?.name ?? s.name,
    description: t?.description ?? '',
    core: s.x_core,
    keywords: s.keywords,
  };
}

/** Newest first, the order of a `git log`. */
export function getWork(locale: Locale): Work[] {
  return base.work.map((w) => toWork(w, locale));
}

/** Projects that get a full card. */
export function getProjects(locale: Locale): Project[] {
  return base.projects
    .map((p) => toProject(p, locale))
    .filter((p) => !p.secondary);
}

/** Projects listed in the "others" block. */
export function getSecondaryProjects(locale: Locale): Project[] {
  return base.projects
    .map((p) => toProject(p, locale))
    .filter((p) => p.secondary);
}

export function getProjectBySlug(
  slug: string,
  locale: Locale
): Project | undefined {
  const found = base.projects.find((p) => p.x_slug === slug);
  return found ? toProject(found, locale) : undefined;
}

export function getSkills(locale: Locale): Skill[] {
  return base.skills.map((s) => toSkill(s, locale));
}

/** How many keywords the "+N" chip hides. */
export function hiddenSkillCount(skill: Skill, shown: number): number {
  return Math.max(0, skill.keywords.length - shown);
}
