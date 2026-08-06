'use client';

import { useCallback, useRef } from 'react';

import type { Work } from '@/lib/resume';
import { CareerGraph } from './CareerGraph';
import { ExperienceEntry } from './ExperienceEntry';
import { useCareerGraph } from '../hooks/useCareerGraph';
import { useGraphDraw } from '../hooks/useGraphDraw';

export function ExperienceTimeline({
  jobs,
  periods,
  rootLabel,
}: {
  jobs: Work[];
  periods: string[];
  rootLabel: string;
}) {
  const figure = useRef<HTMLDivElement>(null);
  const { branches, nodes, height } = useCareerGraph(jobs, figure);
  useGraphDraw(figure);

  // Pointer handling writes attributes instead of state, so hovering the list
  // never re-renders it while the graph is drawing.
  const light = useCallback((id?: string) => {
    const element = figure.current;
    if (!element) return;

    element.dataset.dimmed = id ? 'true' : 'false';
    for (const group of element.querySelectorAll<SVGGElement>(
      '[data-branch]'
    )) {
      // Matched on the jobs riding the branch, not on its name: the second
      // BEES role is on the branch named after the first one.
      const carries = group.dataset.jobs?.split(' ').includes(id ?? '');
      group.dataset.lit = carries ? 'true' : 'false';
    }
  }, []);

  return (
    <div
      ref={figure}
      className="graph-figure relative mt-14 pb-16 pl-[56px] md:mt-[106px] md:pb-20 md:pl-[100px]"
      onPointerLeave={() => light(undefined)}
    >
      <CareerGraph
        branches={branches}
        nodes={nodes}
        height={height}
        rootLabel={rootLabel}
      />

      <ol className="flex flex-col gap-9 md:gap-12">
        {jobs.map((job, index) => (
          <ExperienceEntry
            key={job.id}
            job={job}
            period={periods[index]}
            onPointerEnter={() => light(job.id)}
          />
        ))}
      </ol>
    </div>
  );
}
