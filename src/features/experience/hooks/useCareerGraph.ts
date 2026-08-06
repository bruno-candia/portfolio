'use client';

import { useEffect, useState } from 'react';

import type { Work } from '@/lib/resume';
import {
  allocateLanes,
  buildGraph,
  type Branch,
  type GraphNode,
} from '../lib/graph';

const LANE_WIDTH = { desktop: 32, mobile: 18 };
const CORNER = 16;
const MERGE_GAP = 44;
const TAIL = 40;

/** Where the trunk ends, measured up from the bottom of the section. */
export const ROOT_FROM_BOTTOM = 28;

/**
 * The paths are measured from the rendered list rather than assumed, because
 * an entry is as tall as its copy and the frame's even spacing does not
 * survive a line that wraps. Everything here runs on layout, never on scroll.
 */
export function useCareerGraph(
  jobs: Work[],
  container: React.RefObject<HTMLElement | null>
) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = container.current;
    if (!element) return;

    const measure = () => {
      const entries = [
        ...element.querySelectorAll<HTMLElement>('[data-entry]'),
      ];
      if (entries.length === 0) return;

      const top = element.getBoundingClientRect().top;
      const nodeY = entries.map((entry) => {
        const box = entry.getBoundingClientRect();
        return Math.round(box.top - top + nodeOffset(entry));
      });

      const laneWidth =
        element.clientWidth < 768 ? LANE_WIDTH.mobile : LANE_WIDTH.desktop;

      // The border box, never `scrollHeight`. The graph is absolutely
      // positioned inside this element, so `scrollHeight` counts the SVG this
      // measurement just sized: once the section shrinks, the stale tall SVG
      // keeps the number up and the branches hang below the footer until a
      // reload. The box height comes from the entries alone.
      const full = Math.round(element.getBoundingClientRect().height);
      const graph = buildGraph(
        jobs,
        allocateLanes(jobs),
        nodeY,
        { laneWidth, corner: CORNER, mergeGap: MERGE_GAP, tail: TAIL },
        full - ROOT_FROM_BOTTOM
      );

      setBranches(graph.branches);
      setNodes(graph.nodes);
      setHeight(full);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [jobs, container]);

  return { branches, nodes, height };
}

/** The commit sits on the job title, which is what the eye reads first. */
function nodeOffset(entry: HTMLElement) {
  const anchor = entry.querySelector<HTMLElement>('[data-node-anchor]');
  if (!anchor) return 0;

  const box = anchor.getBoundingClientRect();
  return box.top - entry.getBoundingClientRect().top + box.height / 2;
}
