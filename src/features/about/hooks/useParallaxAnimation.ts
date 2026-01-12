import { useEffect, useRef } from 'react';
import { ParallaxEffect } from '@/utils/ParallaxEffect';

export interface PupilConfig {
  limitTop: number;
  limitBottom: number;
  limitLeft: number;
  limitRight: number;
  centerX: number;
  centerY: number;
}

export function useParallaxAnimation(config?: PupilConfig) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<ParallaxEffect | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    parallaxRef.current = new ParallaxEffect(document.body);

    if (config) {
      parallaxRef.current.pupilLimitTop = config.limitTop;
      parallaxRef.current.pupilLimitBottom = config.limitBottom;
      parallaxRef.current.pupilLimitLeft = config.limitLeft;
      parallaxRef.current.pupilLimitRight = config.limitRight;
      parallaxRef.current.pupilCenterX = config.centerX;
      parallaxRef.current.pupilCenterY = config.centerY;
    }

    const layers = wrapperRef.current.querySelectorAll(
      '.parallax-layer'
    ) as NodeListOf<HTMLElement>;
    parallaxRef.current.setLayers(layers);

    parallaxRef.current.enable();

    return () => {
      parallaxRef.current?.destroy();
    };
  }, [config]);

  return { wrapperRef };
}
