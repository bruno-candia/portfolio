import { describe, expect, it } from 'vitest';

import type { Project } from '@/lib/resume';
import { externalLink, sealFor, yearRange } from './project-card';

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

describe('yearRange', () => {
  it('uses the end year when the project is finished', () => {
    const range = yearRange(
      project({ startDate: '2018-02', endDate: '2023-05' }),
      'to',
      'present'
    );

    expect(range).toBe('2018 to 2023');
  });

  it('falls back to the present label while it is still running', () => {
    expect(yearRange(project({ startDate: '2025-01' }), 'to', 'present')).toBe(
      '2025 to present'
    );
  });
});

describe('sealFor', () => {
  it('prefers the timeline over the repository visibility', () => {
    const seal = sealFor(
      project({ workId: 'aurem', visibility: 'closed-source' })
    );

    expect(seal).toBe('timeline');
  });

  it('reports the visibility when there is no matching job', () => {
    expect(sealFor(project({ visibility: 'open-source' }))).toBe('open');
    expect(sealFor(project({ visibility: 'closed-source' }))).toBe('closed');
  });

  it('shows nothing when the visibility is unknown', () => {
    expect(sealFor(project())).toBeNull();
  });
});

describe('externalLink', () => {
  it('prefers the repository over the site', () => {
    const link = externalLink(
      project({
        url: 'https://brunocandia.com',
        repository: 'https://github.com/x/y',
      })
    );

    expect(link).toEqual({
      href: 'https://github.com/x/y',
      label: 'repository',
    });
  });

  it('offers no live site for a project that ended', () => {
    const link = externalLink(
      project({ url: 'https://linkedin.com/company/x', endDate: '2023-05' })
    );

    expect(link).toBeNull();
  });

  it('names the link after the host it points at', () => {
    expect(
      externalLink(project({ url: 'https://www.behance.net/gallery/1' }))?.label
    ).toBe('behance');
    expect(
      externalLink(project({ url: 'https://maincore.example' }))?.label
    ).toBe('live');
  });
});
