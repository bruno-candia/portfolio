import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface TouchStart extends Point {
  id: number;
  time: number;
}

const TAP_MAX_DURATION = 350;
const TAP_MAX_DISTANCE = 10;
const CORRECTION_DELAY = 130;
const PRIMARY_LANDING = 0.92;
const SPRING_FREQUENCY = 20;

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const dampedAxis = (
  position: number,
  velocity: number,
  target: number,
  delta: number
) => {
  const acceleration =
    SPRING_FREQUENCY * SPRING_FREQUENCY * (target - position) -
    2 * SPRING_FREQUENCY * velocity;
  const nextVelocity = velocity + acceleration * delta;

  return {
    position: position + nextVelocity * delta,
    velocity: nextVelocity,
  };
};

/**
 * Drives the illustrated pupil without treating it like a generic parallax
 * layer. Pointer motion becomes smooth pursuit. A completed touch becomes a
 * quick primary landing followed by one small correction.
 */
export function useParallaxAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pupil = pupilRef.current;
    const section = wrapper?.closest('section');
    if (!wrapper || !pupil || !section) return;

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const prefersReducedMotion = () =>
      motionPreference.matches ||
      document.documentElement.dataset.motion === 'reduced';
    const current: Point = { x: 0, y: 0 };
    const velocity: Point = { x: 0, y: 0 };
    const target: Point = { x: 0, y: 0 };
    const limits = { x: 0, y: 0, restY: 0 };
    let touchStart: TouchStart | null = null;
    let nativeTouchStart: TouchStart | null = null;
    let lastTouchLook = 0;
    let animationFrame = 0;
    let correctionTimer = 0;
    let previousTime = performance.now();
    let visible = true;

    const measure = () => {
      const bounds = wrapper.getBoundingClientRect();
      limits.x = bounds.width * 0.12;
      limits.y = bounds.height * 0.078;
      limits.restY = bounds.height * 0.045;
    };

    const render = () => {
      pupil.style.transform = `translate3d(${current.x * limits.x}px, ${
        limits.restY + current.y * limits.y
      }px, 0)`;
    };

    const stopAnimation = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const center = () => {
      window.clearTimeout(correctionTimer);
      target.x = 0;
      target.y = 0;
      current.x = 0;
      current.y = 0;
      velocity.x = 0;
      velocity.y = 0;
      stopAnimation();
      render();
    };

    const animate = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 1 / 30);
      previousTime = time;

      const x = dampedAxis(current.x, velocity.x, target.x, delta);
      const y = dampedAxis(current.y, velocity.y, target.y, delta);
      current.x = x.position;
      current.y = y.position;
      velocity.x = x.velocity;
      velocity.y = y.velocity;
      render();

      const settled =
        distance(current, target) < 0.001 &&
        Math.hypot(velocity.x, velocity.y) < 0.01;
      if (settled) {
        current.x = target.x;
        current.y = target.y;
        velocity.x = 0;
        velocity.y = 0;
        render();
        animationFrame = 0;
        return;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationFrame || prefersReducedMotion() || !visible) return;
      previousTime = performance.now();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const pointForPointer = (clientX: number, clientY: number): Point => {
      const bounds = wrapper.getBoundingClientRect();
      const dx = clientX - (bounds.left + bounds.width / 2);
      const dy = clientY - (bounds.top + bounds.height / 2);
      const x = Math.tanh(dx / Math.max(window.innerWidth * 0.28, 1));
      const y = Math.tanh(dy / Math.max(window.innerHeight * 0.28, 1));
      const magnitude = Math.hypot(x, y);

      if (magnitude <= 1) return { x, y };
      return { x: x / magnitude, y: y / magnitude };
    };

    const lookAt = (point: Point, correct: boolean) => {
      window.clearTimeout(correctionTimer);

      if (!correct || distance(current, point) < 0.35) {
        target.x = point.x;
        target.y = point.y;
        startAnimation();
        return;
      }

      target.x = point.x * PRIMARY_LANDING;
      target.y = point.y * PRIMARY_LANDING;
      startAnimation();
      correctionTimer = window.setTimeout(() => {
        target.x = point.x;
        target.y = point.y;
        startAnimation();
      }, CORRECTION_DELAY);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || prefersReducedMotion()) return;
      lookAt(pointForPointer(event.clientX, event.clientY), true);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        event.pointerType !== 'touch' ||
        !event.isPrimary ||
        prefersReducedMotion()
      ) {
        return;
      }

      touchStart = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
      };
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!touchStart || event.pointerId !== touchStart.id) return;

      const duration = performance.now() - touchStart.time;
      const travelled = distance(touchStart, {
        x: event.clientX,
        y: event.clientY,
      });
      touchStart = null;

      if (duration > TAP_MAX_DURATION || travelled > TAP_MAX_DISTANCE) return;
      if (performance.now() - lastTouchLook < 50) return;
      lastTouchLook = performance.now();
      lookAt(pointForPointer(event.clientX, event.clientY), true);
    };

    const onPointerCancel = () => {
      touchStart = null;
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || prefersReducedMotion()) {
        return;
      }

      const touch = event.touches[0];
      nativeTouchStart = {
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
        time: performance.now(),
      };
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!nativeTouchStart) return;
      const touch = Array.from(event.changedTouches).find(
        (candidate) => candidate.identifier === nativeTouchStart?.id
      );
      if (!touch) return;

      const duration = performance.now() - nativeTouchStart.time;
      const travelled = distance(nativeTouchStart, {
        x: touch.clientX,
        y: touch.clientY,
      });
      nativeTouchStart = null;

      if (duration > TAP_MAX_DURATION || travelled > TAP_MAX_DISTANCE) return;
      if (performance.now() - lastTouchLook < 50) return;
      lastTouchLook = performance.now();
      lookAt(pointForPointer(touch.clientX, touch.clientY), true);
    };

    const onTouchCancel = () => {
      touchStart = null;
      nativeTouchStart = null;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') center();
    };

    const onMotionPreferenceChange = () => {
      if (prefersReducedMotion()) center();
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      render();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) center();
    });

    measure();
    render();
    resizeObserver.observe(wrapper);
    intersectionObserver.observe(section);
    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerdown', onPointerDown, { passive: true });
    section.addEventListener('pointerup', onPointerUp, { passive: true });
    section.addEventListener('pointercancel', onPointerCancel, {
      passive: true,
    });
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchend', onTouchEnd, { passive: true });
    section.addEventListener('touchcancel', onTouchCancel, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    motionPreference.addEventListener('change', onMotionPreferenceChange);
    window.addEventListener(
      'accessibility-preferences-change',
      onMotionPreferenceChange
    );
    wrapper.dataset.motionReady = 'true';

    return () => {
      delete wrapper.dataset.motionReady;
      window.clearTimeout(correctionTimer);
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerdown', onPointerDown);
      section.removeEventListener('pointerup', onPointerUp);
      section.removeEventListener('pointercancel', onPointerCancel);
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchend', onTouchEnd);
      section.removeEventListener('touchcancel', onTouchCancel);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionPreference.removeEventListener('change', onMotionPreferenceChange);
      window.removeEventListener(
        'accessibility-preferences-change',
        onMotionPreferenceChange
      );
    };
  }, []);

  return { wrapperRef, pupilRef };
}
