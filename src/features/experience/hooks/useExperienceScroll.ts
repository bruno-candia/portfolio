'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useExperienceScroll(
  experienceCount: number,
  timelineRef: React.RefObject<HTMLDivElement | null>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    Array(experienceCount).fill(false)
  );

  useEffect(() => {
    if (!containerRef.current || !progressRef.current || !timelineRef.current)
      return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      endTrigger: timelineRef.current,
      end: 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progressRef.current) {
          progressRef.current.style.height = `${progress * 100}%`;
        }

        const newVisibleCards = Array(experienceCount)
          .fill(0)
          .map((_, index) => {
            const threshold = (index + 0.2) / experienceCount;
            return progress >= threshold;
          });

        setVisibleCards((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(newVisibleCards)) {
            return prev;
          }
          return newVisibleCards;
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [experienceCount, timelineRef]);

  return { containerRef, progressRef, visibleCards };
}
