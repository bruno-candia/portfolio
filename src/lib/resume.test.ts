import { describe, expect, it } from 'vitest';

import {
  getBasics,
  getProjectBySlug,
  getProjects,
  getSecondaryProjects,
  getSkills,
  getWork,
  hiddenSkillCount,
} from './resume';

describe('resume', () => {
  it('reads career facts from the canonical file, not the translation', () => {
    const en = getWork('en');
    const pt = getWork('pt');

    // datas e cores vivem só no resume.json: PT e EN não podem divergir
    expect(pt.map((w) => w.startDate)).toEqual(en.map((w) => w.startDate));
    expect(pt.map((w) => w.color)).toEqual(en.map((w) => w.color));
    expect(pt.map((w) => w.id)).toEqual(en.map((w) => w.id));
  });

  it('translates prose and leaves the company name alone', () => {
    const [lead] = getWork('pt');
    expect(lead.position).toBe('Tech Lead');
    expect(lead.summary).toContain('plataformas globais');
    expect(lead.company).toBe('BEES (AB InBev)');
  });

  it('marks the job that ran in parallel with the others', () => {
    const parallel = getWork('en').filter((w) => w.parallel);
    expect(parallel.map((w) => w.id)).toEqual(['aurem']);
  });

  it('splits featured projects from the "others" block', () => {
    expect(getProjects('pt').map((p) => p.id)).toEqual([
      'aurem',
      'maincore',
      'portfolio',
    ]);
    expect(getSecondaryProjects('pt').map((p) => p.id)).toEqual([
      'wind-energy',
      'scaling-x',
    ]);
  });

  it('cross-links Aurem between the timeline and the project list', () => {
    const job = getWork('en').find((w) => w.id === 'aurem');
    const project = getProjectBySlug('aurem', 'en');
    expect(job?.projectId).toBe('aurem');
    expect(project?.workId).toBe('aurem');
  });

  it('falls back to the canonical text when a translation is missing', () => {
    // wind-energy só tem `description` traduzida
    const pt = getSecondaryProjects('pt').find((p) => p.id === 'wind-energy');
    expect(pt?.description).toBe('C++ · estudo de faculdade');
    expect(pt?.keywords).toContain('C++');
  });

  it('leaves unwritten case blocks undefined instead of empty strings', () => {
    const maincore = getProjectBySlug('maincore', 'pt');
    expect(maincore?.problem).toBeTruthy();
    const scaling = getProjectBySlug('scaling-x', 'pt');
    expect(scaling?.problem).toBeUndefined();
  });

  it('keeps every core skill inside its own keyword list', () => {
    for (const skill of getSkills('en')) {
      for (const core of skill.core) {
        expect(skill.keywords).toContain(core);
      }
    }
  });

  it('counts what the "+N" chip hides', () => {
    const [frontend] = getSkills('en');
    expect(hiddenSkillCount(frontend, 12)).toBe(frontend.keywords.length - 12);
    expect(hiddenSkillCount(frontend, 999)).toBe(0);
  });

  it('exposes the same contact email in both locales', () => {
    expect(getBasics('pt').email).toBe(getBasics('en').email);
    expect(getBasics('pt').label).toContain('Desenvolvedor');
  });
});
