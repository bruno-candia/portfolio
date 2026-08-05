'use client';

import type { Branch, GraphNode } from '../lib/graph';
import { ROOT_FROM_BOTTOM } from '../hooks/useCareerGraph';

/**
 * The graph is `aria-hidden` on purpose: every fact it draws is already in
 * the entry beside it, so to a screen reader it is decoration.
 */
export function CareerGraph({
  branches,
  nodes,
  height,
  rootLabel,
}: {
  branches: Branch[];
  nodes: GraphNode[];
  height: number;
  rootLabel: string;
}) {
  if (branches.length === 0 || height === 0) return null;

  const foot = height - ROOT_FROM_BOTTOM;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-[76px]"
    >
      <svg
        width="76"
        height={height}
        viewBox={`-8 0 76 ${height}`}
        fill="none"
        className="overflow-visible"
      >
        <path
          className="graph-trunk"
          d={`M 0 0 L 0 ${foot}`}
          pathLength={1}
          stroke="var(--ink)"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {branches.map((branch) => (
          <g
            key={branch.id}
            data-branch={branch.id}
            data-jobs={branch.jobIds.join(' ')}
            className={branch.open ? 'graph-open' : undefined}
          >
            <path
              className="graph-branch"
              d={branch.d}
              pathLength={1}
              stroke={branch.color}
              strokeWidth={branch.parallel ? 3 : 2}
              strokeLinecap="round"
            />
          </g>
        ))}

        {nodes.map((node) => (
          <circle
            key={node.id}
            className="graph-node"
            data-node={node.id}
            cx={node.x}
            cy={node.y}
            r={4.5}
            fill={node.filled ? node.color : 'var(--bg)'}
            stroke={node.color}
            strokeWidth={2}
          />
        ))}

        <circle cx={0} cy={foot} r={3.5} fill="var(--ink-3)" />
      </svg>

      <span
        className="absolute left-[92px] ds-mono-label whitespace-nowrap text-ink-3"
        style={{ top: foot - 8 }}
      >
        {rootLabel}
      </span>
    </div>
  );
}
