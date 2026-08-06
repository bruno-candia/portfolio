'use client';

import { useBlackHole } from '../hooks/useBlackHole';

export function BlackHole() {
  const { canvasRef } = useBlackHole();

  return (
    <canvas
      ref={canvasRef}
      data-black-hole
      aria-hidden="true"
      className="absolute inset-0 block size-full"
    />
  );
}
