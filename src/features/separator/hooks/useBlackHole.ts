'use client';

import { useEffect, useRef } from 'react';

import {
  createScene,
  createViewport,
  drawFrame,
  settle,
  type Scene,
  type Viewport,
} from '../lib/blackHole';

const MAX_STEP = 0.05;
/** Seconds of simulation baked into the still frame shown without motion. */
const SETTLE_SECONDS = 6;

/**
 * The canvas only runs while it is on screen. Off screen it is stopped rather
 * than throttled, because a particle system left running costs the same as one
 * being looked at.
 */
export function useBlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const prefersReducedMotion = () =>
      motionPreference.matches ||
      document.documentElement.dataset.motion === 'reduced';

    let view: Viewport | null = null;
    let scene: Scene | null = null;
    let frame = 0;
    let previousTime = 0;
    let visible = false;

    const paintStill = () => {
      if (!view || !scene) return;
      drawFrame(ctx, view, scene, 0);
    };

    const draw = (now: number) => {
      if (!view || !scene) return;
      const dt = previousTime
        ? Math.min((now - previousTime) / 1000, MAX_STEP)
        : 1 / 60;
      previousTime = now;

      drawFrame(ctx, view, scene, dt);
      frame = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };

    const start = () => {
      if (frame || !visible || prefersReducedMotion()) return;
      previousTime = 0;
      frame = window.requestAnimationFrame(draw);
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      view = createViewport(rect, window.devicePixelRatio);
      canvas.width = view.width;
      canvas.height = view.height;
      scene = createScene(view.scale);
      settle(scene, SETTLE_SECONDS);
      paintStill();
    };

    const onMotionPreferenceChange = () => {
      if (prefersReducedMotion()) {
        stop();
        paintStill();
        return;
      }
      start();
    };

    const resizeObserver = new ResizeObserver(() => {
      const running = frame !== 0;
      stop();
      build();
      if (running) start();
    });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });

    build();
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    motionPreference.addEventListener('change', onMotionPreferenceChange);
    window.addEventListener(
      'accessibility-preferences-change',
      onMotionPreferenceChange
    );
    canvas.dataset.blackHoleReady = 'true';

    return () => {
      delete canvas.dataset.blackHoleReady;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionPreference.removeEventListener('change', onMotionPreferenceChange);
      window.removeEventListener(
        'accessibility-preferences-change',
        onMotionPreferenceChange
      );
    };
  }, []);

  return { canvasRef };
}
