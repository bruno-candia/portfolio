import { useEffect, useRef } from 'react';
import { ParallaxEffect } from '@/utils/ParallaxEffect';

export function useParallaxAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<ParallaxEffect | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    parallaxRef.current = new ParallaxEffect(document.body);

    const layers = wrapperRef.current.querySelectorAll(
      '.parallax-layer'
    ) as NodeListOf<HTMLElement>;
    parallaxRef.current.setLayers(layers);

    parallaxRef.current.enable();

    return () => {
      parallaxRef.current?.destroy();
    };
  }, []);

  return { wrapperRef };
}
