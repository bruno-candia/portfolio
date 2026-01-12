'use client';

import { lineColors } from '../data/experience';

export function ConvergentLines() {
  return (
    <div className="relative w-full max-w-[1080px] mx-auto px-6 aspect-[1080/390] md:h-[400px] md:aspect-auto overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1080 390"
        preserveAspectRatio="xMidYMax meet"
        fill="none"
      >
        {lineColors.map((color, index) => {
          const totalLines = lineColors.length;
          const spacing = 1080 / (totalLines + 1);
          const startX = spacing * (index + 1);
          const startY = 0;
          const endX = 540;
          const endY = 380;

          const cp1X = startX;
          const cp1Y = 150;
          const cp2X = endX + (startX - endX) * 0.1;
          const cp2Y = 10;

          return (
            <g key={index}>
              <circle cx={startX} cy={startY + 10} r={5} fill={color} />
              <path
                d={`M ${startX} ${startY + 15} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                fill="none"
              />
            </g>
          );
        })}

        <circle cx={540} cy={385} r={5} fill="white" />
      </svg>
    </div>
  );
}
