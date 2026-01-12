'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ParallaxEffect } from '@/utils/ParallaxEffect';

export function AboutEye() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<ParallaxEffect | null>(null);

  useEffect(() => {
    // Only init inside specific conditions if needed, here we just do it on mount.
    // The ParallaxEffect class expects the 'section' or container as the event listener source for mousemove.
    // If we want the WHOLE window to drive the mouse move, we should probably pass window or document.body to the constructor,
    // OR the ParallaxEffect class binds to the passed element.
    // The user's ParallaxEffect code: `this.section.addEventListener('mousemove', ...)`
    // So if we pass `wrapperRef`, it only moves when mouse is OVER the eye?
    // User probably wants it to follow mouse ANYWHERE on the screen (or at least section).
    // The About section is large. So we should probably listen to the whole section or window.
    // However, the component is just the eye.
    // Ideally we pass a larger container. BUT, `ParallaxEffect` logic:
    // `const x = (e.clientX / window.innerWidth - 0.5) * 2;` uses window dims.
    // So it tracks mouse position relative to WINDOW.
    // But it attaches listener to `this.section`.
    // If I attach to `wrapperRef` (the small div), it only works when hovering the eye.
    // I should attach to `document.body` or `window` for global tracking?
    // OR I assume the `AboutRoot` is the section.
    // Since I can't easily access the parent ref without context, I will instantiate with `document.body` as the "section" for events,
    // OR I will rely on the fact that `ParallaxEffect` uses `window` for calculations, so `mousemove` on `window` is better.
    // Looking at `ParallaxEffect.ts` I wrote: `this.section.addEventListener('mousemove'...)`
    // I should pass `document.body` if I want global tracking.
    // Or I pass the `wrapperRef` but change the listener to window in the class?
    // No, I should stick to the class I wrote which copies the user's logic.
    // User's logic has `this.section` as the event source.
    // If I want the eye to look at me while I'm anywhere on the page/section, I should listen to window.
    // But scoped to the About section is cleaner?
    // Let's pass `document.body` to Capture ALL movement, as usually eyes follow you everywhere.

    if (!wrapperRef.current) return;

    // Use document.body to track mouse everywhere
    parallaxRef.current = new ParallaxEffect(document.body);

    // Select layers within our component
    const layers = wrapperRef.current.querySelectorAll(
      '.parallax-layer'
    ) as NodeListOf<HTMLElement>;
    parallaxRef.current.setLayers(layers);

    // Explicitly enable
    parallaxRef.current.enable();

    return () => {
      parallaxRef.current?.destroy();
    };
  }, []);

  return (
    <div
      className="w-full flex justify-center pt-12 md:pt-20 pb-4 md:pb-8 pointer-events-none select-none"
      ref={wrapperRef}
    >
      <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center parallax-layer layer-pupil z-0">
          <Image
            src="/pupil.svg"
            alt="Pupil"
            width={80}
            height={80}
            className="w-[45%] h-[45%] object-contain"
          />
        </div>

        {/* Eye - Front Layer (Static) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Image
            src="/eye.svg"
            alt="Eye"
            fill
            className="object-contain opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          />
        </div>
      </div>
    </div>
  );
}
