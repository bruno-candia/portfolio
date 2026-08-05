import type { Work } from '@/lib/resume';

/**
 * The career drawn as a git graph.
 *
 * Lanes are allocated, not written down: a job sits on the first lane whose
 * previous occupant had already finished when this one started. That is the
 * rule the GitHub network graph uses, and it means the picture cannot claim a
 * parallel that the dates do not support.
 *
 * The scan runs newest first, in the same order the entries render. Scanning
 * the other way puts the long job on the inner lane and makes the current one
 * change lane halfway up, which reads as a job change that never happened.
 */

export interface GraphJob {
  id: string;
  lane: number;
  color: string;
  running: boolean;
  parallel: boolean;
}

const month = (value: string) => {
  const [year, m] = value.split('-').map(Number);
  return year * 12 + (m ?? 1) - 1;
};

/** Open-ended jobs never free their lane, whatever comes after them. */
const endsAt = (job: Work) => (job.endDate ? month(job.endDate) : Infinity);

/**
 * The same job placed on the drawing. A running job ends now, not at
 * infinity, or every distance measured against it collapses.
 */
const anchorAt = (job: Work, now: number) =>
  job.endDate ? month(job.endDate) : now;

export function allocateLanes(jobs: Work[]): GraphJob[] {
  // Newest first: the last month each lane is occupied down to.
  const occupiedFrom: number[] = [];

  return jobs.map((job) => {
    const start = month(job.startDate);
    const end = endsAt(job);

    let lane = 1;
    while (occupiedFrom[lane] !== undefined && occupiedFrom[lane] < end) {
      lane += 1;
    }
    occupiedFrom[lane] = start;

    return {
      id: job.id,
      lane,
      color: job.color,
      running: !job.endDate,
      parallel: lane > 1,
    };
  });
}

/**
 * Two roles at the same company on the same lane are one branch carrying two
 * commits, not two branches. Drawing them apart says the person left and
 * came back.
 */
export function groupRuns(jobs: Work[], graph: GraphJob[]): number[][] {
  const runs: number[][] = [];

  jobs.forEach((job, index) => {
    const current = runs.at(-1);
    const previous = current?.at(-1);
    const continues =
      previous !== undefined &&
      jobs[previous].company === job.company &&
      graph[previous].lane === graph[index].lane;

    if (continues && current) current.push(index);
    else runs.push([index]);
  });

  return runs;
}

export interface Geometry {
  laneWidth: number;
  corner: number;
  /** How far above the newest commit the branch merges back in. */
  mergeGap: number;
  /** How far below the oldest commit the branch leaves the trunk. */
  tail: number;
}

/**
 * The vertical axis is the list, not a calendar: entries are evenly spaced
 * whatever their length. A node sits on its own entry, and a branch runs
 * between the dates around it, interpolated from the entries it passes.
 */
export function dateToY(
  jobs: Work[],
  nodeY: number[],
  target: number,
  footY: number,
  now = currentMonth()
): number {
  const anchors = jobs.map((job, index) => ({
    at: anchorAt(job, now),
    y: nodeY[index] ?? 0,
  }));

  // The oldest start is the root of the trunk, so it lands exactly on it and
  // no branch can run off the bottom of the section.
  const oldest = Math.min(...jobs.map((job) => month(job.startDate)));
  anchors.push({ at: oldest, y: footY });

  for (let i = 0; i < anchors.length - 1; i += 1) {
    const upper = anchors[i];
    const lower = anchors[i + 1];
    if (target > upper.at) return upper.y;
    if (target >= lower.at) {
      const span = upper.at - lower.at || 1;
      const ratio = (upper.at - target) / span;
      return upper.y + (lower.y - upper.y) * ratio;
    }
  }

  return anchors[anchors.length - 1].y;
}

export interface Branch {
  /** Named after the newest job on it, which is the one that merges back. */
  id: string;
  jobIds: string[];
  lane: number;
  color: string;
  /** Still running, so it leaves through the top instead of merging. */
  open: boolean;
  parallel: boolean;
  d: string;
}

export interface GraphNode {
  id: string;
  branchId: string;
  x: number;
  y: number;
  color: string;
  /** A job still running is a filled commit, a finished one is hollow. */
  filled: boolean;
}

export function buildGraph(
  jobs: Work[],
  graph: GraphJob[],
  nodeY: number[],
  { laneWidth, corner, mergeGap, tail }: Geometry,
  footY: number
): { branches: Branch[]; nodes: GraphNode[] } {
  const branches: Branch[] = [];
  const nodes: GraphNode[] = [];

  for (const run of groupRuns(jobs, graph)) {
    const newest = run[0];
    const oldest = run[run.length - 1];
    const entry = graph[newest];
    const x = entry.lane * laneWidth;
    const open = run.some((index) => graph[index].running);

    // The commit sits on the branch, so the branch has to run past it at
    // both ends: it leaves the trunk below the oldest commit and merges back
    // above the newest one. Closing the merge on the commit itself leaves
    // the circle hanging in space, because by that height the path is back
    // on the trunk.
    const dated = dateToY(jobs, nodeY, month(jobs[oldest].startDate), footY);
    const foot = Math.min(footY, Math.max(dated, (nodeY[oldest] ?? 0) + tail));
    const head = open ? -corner * 2 : (nodeY[newest] ?? 0) - mergeGap;

    // A short run has no room for two full corners, and a minimum radius is
    // worse than none: the two curves overshoot each other and the branch
    // crosses itself. The radius shrinks to nothing instead.
    const c = Math.min(corner, Math.max(0, (foot - head) / 4));

    // Out of the trunk at the bottom, up its own lane, and back into the
    // trunk at the top. That closing curve is the merge.
    const d = [
      `M 0 ${round(foot)}`,
      `C 0 ${round(foot - c)} ${round(x)} ${round(foot - c)} ${round(x)} ${round(foot - c * 2)}`,
      open
        ? `L ${round(x)} ${round(head)}`
        : `L ${round(x)} ${round(head + c * 2)}`,
      open
        ? ''
        : `C ${round(x)} ${round(head + c)} 0 ${round(head + c)} 0 ${round(head)}`,
    ]
      .filter(Boolean)
      .join(' ');

    branches.push({
      id: jobs[newest].id,
      jobIds: run.map((index) => jobs[index].id),
      lane: entry.lane,
      color: entry.color,
      open,
      parallel: entry.parallel,
      d,
    });

    for (const index of run) {
      nodes.push({
        id: jobs[index].id,
        branchId: jobs[newest].id,
        x,
        y: nodeY[index] ?? 0,
        color: graph[index].color,
        filled: graph[index].running,
      });
    }
  }

  return { branches, nodes };
}

const round = (n: number) => Math.round(n * 10) / 10;

function currentMonth() {
  const today = new Date();
  return today.getFullYear() * 12 + today.getMonth();
}
