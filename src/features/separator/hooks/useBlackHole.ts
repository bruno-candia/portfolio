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
/** Seconds run before the first paint, so the rings never open pristine. */
const SETTLE_SECONDS = 6;
/** A drag fires the observer every frame; only the size it lands on matters. */
const REBUILD_DELAY = 160;

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
    let rebuild = 0;

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

      const next = createViewport(rect, window.devicePixelRatio);
      if (view && next.width === view.width && next.height === view.height) {
        return;
      }

      view = next;
      canvas.width = view.width;
      canvas.height = view.height;
      scene = createScene(view.scale);
      settle(scene, SETTLE_SECONDS);
      drawFrame(ctx, view, scene, 0);
    };

    const onMotionPreferenceChange = () => {
      if (prefersReducedMotion()) stop();
      else start();
    };

    // Reduced motion hides the band in CSS, so this also fires when the
    // preference is turned off and the canvas gets its size back. Rebuilding
    // seeds a whole new scene, which is far too much work to do on every frame
    // of a drag, so it waits for the size to settle.
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(rebuild);
      rebuild = window.setTimeout(() => {
        build();
        start();
      }, REBUILD_DELAY);
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
      window.clearTimeout(rebuild);
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
