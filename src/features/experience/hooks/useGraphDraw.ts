'use client';

import { useEffect } from 'react';

/**
 * The drawing runs entirely through CSS custom properties and data
 * attributes, so nothing here re-renders React while the page scrolls. The
 * trunk follows the scroll through `--draw`, each branch flips to drawn once
 * its entry has been seen, and the reduced-motion case is handled in CSS by
 * ignoring both.
 */
export function useGraphDraw(container: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = container.current;
    if (!element) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      const travel = box.height - window.innerHeight * 0.4;
      const scrolled = window.innerHeight * 0.6 - box.top;
      const progress = travel <= 0 ? 1 : clamp(scrolled / travel);

      element.style.setProperty('--draw', progress.toFixed(3));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // The entry and its branch are in different subtrees, so being seen has
    // to be written on both: the list item cannot style the drawing.
    const seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const id = entry.target.getAttribute('data-entry');
          entry.target.setAttribute('data-drawn', 'true');
          element
            .querySelector(`[data-jobs~="${id}"]`)
            ?.setAttribute('data-drawn', 'true');
          element
            .querySelector(`[data-node="${id}"]`)
            ?.setAttribute('data-drawn', 'true');

          seen.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -20% 0px' }
    );

    for (const entry of element.querySelectorAll('[data-entry]')) {
      seen.observe(entry);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      seen.disconnect();
    };
  }, [container]);
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));
