import { describe, expect, it } from 'vitest';

import { getWork } from '@/lib/resume';
import type { Work } from '@/lib/resume';
import { allocateLanes, buildGraph, dateToY, groupRuns } from './graph';

function job(overrides: Partial<Work> & Pick<Work, 'id' | 'startDate'>): Work {
  return {
    company: 'X',
    position: 'X',
    summary: '',
    highlights: [],
    color: '#fff',
    ...overrides,
  };
}

describe('allocateLanes', () => {
  it('reproduces the frame from the real dates', () => {
    const lanes = allocateLanes(getWork('en'));

    // Aurem is the only one on the outer lane, because it is the only one
    // that overlaps another job. Asserted as the rule rather than as a list,
    // so adding a role to the résumé does not rewrite the expectation.
    expect(lanes.filter((entry) => entry.parallel).map((entry) => entry.id)) //
      .toEqual(['aurem']);
    expect(
      lanes.filter((entry) => entry.id !== 'aurem').map((entry) => entry.lane)
    ).toEqual(lanes.slice(1).map(() => 1));
  });

  it('keeps two jobs that overlap on separate lanes', () => {
    const lanes = allocateLanes([
      job({ id: 'now', startDate: '2024-01' }),
      job({ id: 'long', startDate: '2020-01', endDate: '2024-06' }),
    ]);

    expect(lanes.map((entry) => entry.lane)).toEqual([1, 2]);
    expect(lanes[1].parallel).toBe(true);
  });

  it('reuses a lane once the job on it has finished', () => {
    const lanes = allocateLanes([
      job({ id: 'second', startDate: '2023-01', endDate: '2023-12' }),
      job({ id: 'first', startDate: '2022-01', endDate: '2022-12' }),
    ]);

    expect(lanes.map((entry) => entry.lane)).toEqual([1, 1]);
    expect(lanes.every((entry) => !entry.parallel)).toBe(true);
  });

  it('never frees the lane of a job that has not ended', () => {
    const lanes = allocateLanes([
      job({ id: 'running', startDate: '2019-01' }),
      job({ id: 'older', startDate: '2020-01', endDate: '2021-01' }),
    ]);

    expect(lanes.map((entry) => entry.lane)).toEqual([1, 2]);
  });
});

describe('dateToY', () => {
  const jobs = [
    job({ id: 'a', startDate: '2024-01' }),
    job({ id: 'b', startDate: '2022-01', endDate: '2024-01' }),
  ];

  it('puts a job end on its own entry', () => {
    expect(dateToY(jobs, [100, 300], 2024 * 12, 900)).toBe(300);
  });

  it('never runs a branch past the root', () => {
    expect(dateToY(jobs, [100, 300], 1900 * 12, 900)).toBe(900);
  });

  it('runs down the column as the date gets older', () => {
    const start = dateToY(jobs, [100, 300], 2022 * 12, 900);

    expect(start).toBeGreaterThan(300);
  });
});

describe('groupRuns', () => {
  it('keeps two roles at the same company on one branch', () => {
    const jobs = getWork('en');

    expect(groupRuns(jobs, allocateLanes(jobs))).toEqual(runsOf(jobs));
  });

  it('splits a return to the same company after another job', () => {
    const jobs = [
      job({ id: 'back', company: 'A', startDate: '2024-01' }),
      job({
        id: 'away',
        company: 'B',
        startDate: '2022-01',
        endDate: '2023-12',
      }),
      job({
        id: 'first',
        company: 'A',
        startDate: '2020-01',
        endDate: '2021-12',
      }),
    ];

    expect(groupRuns(jobs, allocateLanes(jobs))).toEqual([[0], [1], [2]]);
  });
});

/** The runs of consecutive roles at one company, as indexes into the list. */
function runsOf(jobs: Work[]) {
  const runs: number[][] = [];

  jobs.forEach((job, index) => {
    const current = runs.at(-1);
    if (current && jobs[current.at(-1)!].company === job.company) {
      current.push(index);
    } else {
      runs.push([index]);
    }
  });

  return runs;
}

/** Every (x, y) the path visits, in the order it visits them. */
function pointsOf(d: string) {
  return [...d.matchAll(/[MLC]([^MLC]+)/g)].flatMap((command) => {
    const numbers = command[1].trim().split(/\s+/).map(Number);
    const points = [];
    for (let i = 0; i < numbers.length; i += 2) {
      points.push({ x: numbers[i], y: numbers[i + 1] });
    }
    return points;
  });
}

describe('buildGraph', () => {
  const jobs = getWork('en');
  const spread = jobs.map((_, index) => index * 214);
  const { branches, nodes } = buildGraph(
    jobs,
    allocateLanes(jobs),
    spread,
    { laneWidth: 32, corner: 16, mergeGap: 44, tail: 40 },
    spread.at(-1)! + 144
  );

  it('draws one branch per company run, not per role', () => {
    expect(branches.map((b) => b.jobIds)).toEqual(
      runsOf(jobs).map((run) => run.map((index) => jobs[index].id))
    );
  });

  it('still gives every role its own commit', () => {
    expect(nodes.map((n) => n.id)).toEqual(jobs.map((j) => j.id));
    expect(nodes.map((n) => n.x)).toEqual(
      allocateLanes(jobs).map((entry) => entry.lane * 32)
    );
  });

  it('merges a finished branch back into the trunk', () => {
    const aurem = branches.find((b) => b.id === 'aurem');

    expect(aurem?.open).toBe(false);
    expect(aurem?.d.startsWith('M 0 ')).toBe(true);
    // The closing curve ends on the trunk, above the commit it merges past.
    expect(pointsOf(aurem!.d).at(-1)?.x).toBe(0);
  });

  it('runs the branch past every commit riding it', () => {
    for (const branch of branches) {
      const ys = pointsOf(branch.d).map((point) => point.y);
      const top = Math.min(...ys);
      const bottom = Math.max(...ys);

      for (const node of nodes.filter((n) => n.branchId === branch.id)) {
        expect(node.y).toBeGreaterThan(top);
        expect(node.y).toBeLessThan(bottom);
      }
    }
  });

  it('leaves the running branch open through the top', () => {
    const bees = branches[0];

    expect(bees.open).toBe(true);
    expect(bees.d).toContain('L 32 -32');
    expect(bees.d).not.toContain('0 0');
  });

  it('never lets a short branch cross itself', () => {
    // Entries packed tighter than two full corners would fit.
    const packed = jobs.map((_, index) => index * 20);
    const tight = buildGraph(
      jobs,
      allocateLanes(jobs),
      packed,
      { laneWidth: 32, corner: 16, mergeGap: 44, tail: 40 },
      packed.at(-1)! + 20
    );

    for (const branch of tight.branches) {
      const ys = pointsOf(branch.d).map((point) => point.y);
      const climbs = ys.every((y, index) => index === 0 || y <= ys[index - 1]);

      expect(climbs).toBe(true);
    }
  });

  it('fills the commit of the job still running', () => {
    expect(nodes.filter((n) => n.filled).map((n) => n.id)).toEqual(
      jobs.filter((job) => !job.endDate).map((job) => job.id)
    );
  });
});
