import { describe, expect, it } from 'vitest';

import type { Project } from '@/lib/resume';
import { caseLink, monthRange, neighbours, toDecision } from './case';

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 'x',
    slug: 'x',
    name: 'X',
    type: 'personal',
    description: '',
    highlights: [],
    keywords: [],
    secondary: false,
    ...overrides,
  };
}

describe('toDecision', () => {
  it('splits the call from the reason on the first dash', () => {
    const decision = toDecision(
      'Redux, não Context — a sala tem estado — compartilhado.'
    );

    expect(decision).toEqual({
      label: 'Redux, não Context',
      text: 'A sala tem estado — compartilhado.',
    });
  });

  it('keeps a highlight without a dash whole', () => {
    expect(toDecision('No separator here')).toEqual({
      label: '',
      text: 'No separator here',
    });
  });
});

describe('monthRange', () => {
  it('writes both ends in the reader language', () => {
    const range = monthRange(
      project({ startDate: '2018-02', endDate: '2023-05' }),
      'pt',
      'hoje'
    );

    expect(range).toBe('fev 2018 — mai 2023');
  });

  it('uses the present label for a project still running', () => {
    expect(monthRange(project({ startDate: '2025-01' }), 'en', 'present')).toBe(
      'Jan 2025 — present'
    );
  });
});

describe('caseLink', () => {
  it('offers the LinkedIn page of a project that ended', () => {
    const link = caseLink(
      project({
        url: 'https://www.linkedin.com/company/aurem-tec/',
        endDate: '2023-05',
      })
    );

    expect(link).toEqual({
      href: 'https://www.linkedin.com/company/aurem-tec/',
      label: 'linkedin',
    });
  });

  it('prefers the repository', () => {
    expect(
      caseLink(
        project({ url: 'https://a.com', repository: 'https://github.com/x/y' })
      )?.label
    ).toBe('repository');
  });
});

describe('neighbours', () => {
  const projects = [
    project({ slug: 'a' }),
    project({ slug: 'b' }),
    project({ slug: 'c' }),
  ];

  it('wraps around at the ends', () => {
    expect(neighbours(projects, 'a').previous?.slug).toBe('c');
    expect(neighbours(projects, 'c').next?.slug).toBe('a');
  });

  it('offers nothing when there is a single case', () => {
    expect(neighbours([project({ slug: 'a' })], 'a')).toEqual({
      previous: undefined,
      next: undefined,
    });
  });
});
