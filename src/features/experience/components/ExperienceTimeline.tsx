'use client';

import { useRef } from 'react';
import { experiences } from '../data/experience';
import { ExperienceCard } from './ExperienceCard';
import { useExperienceScroll } from '../hooks/useExperienceScroll';

export function ExperienceTimeline() {
  const lineEndRef = useRef<HTMLDivElement>(null);
  const { containerRef, progressRef, visibleCards } = useExperienceScroll(
    experiences.length,
    lineEndRef
  );

  return (
    <div ref={containerRef} className="relative w-full flex justify-center">
      <div className="relative w-full max-w-[1080px] px-6">
        <div
          ref={lineEndRef}
          className="absolute left-1/2 top-0 bottom-[30vh] w-px -translate-x-1/2"
        >
          <div className="absolute inset-0 bg-zinc-800" />
          <div
            ref={progressRef}
            className="absolute top-0 left-0 w-full bg-white transition-none"
            style={{ height: '0%' }}
          />
        </div>

        <div className="relative flex flex-col">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="min-h-[60vh] flex items-center justify-center"
            >
              <ExperienceCard
                experience={experience}
                index={index}
                isVisible={visibleCards[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
