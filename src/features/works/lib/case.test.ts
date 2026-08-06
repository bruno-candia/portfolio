import { describe, expect, it } from 'vitest';

import type { Project } from '@/lib/resume';
import { caseLink, monthRange, neighbours } from './case';

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 'x',
    slug: 'x',
    name: 'X',
    type: 'personal',
    description: '',
    highlights: [],
    keywords: [],
    cardKeywords: [],
    secondary: false,
    ...overrides,
  };
}

describe('monthRange', () => {
  it('writes both ends in the reader language', () => {
    const range = monthRange(
      project({ startDate: '2018-02', endDate: '2023-05' }),
      'pt',
      'a',
      'hoje'
    );

    expect(range).toBe('fev 2018 a mai 2023');
  });

  it('uses the present label for a project still running', () => {
    expect(
      monthRange(project({ startDate: '2025-01' }), 'en', 'to', 'present')
    ).toBe('Jan 2025 to present');
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

  it('reads the host, not the string', () => {
    expect(
      caseLink(project({ url: 'https://evil.example/?ref=github.com' }))
    ).toEqual({
      href: 'https://evil.example/?ref=github.com',
      label: 'live',
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
