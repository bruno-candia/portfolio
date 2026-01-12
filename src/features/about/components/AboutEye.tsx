'use client';

import Image from 'next/image';
import { useParallaxAnimation } from '../hooks/useParallaxAnimation';

export function AboutEye() {
  const { wrapperRef } = useParallaxAnimation();

  return (
    <div
      ref={wrapperRef}
      className="w-full flex justify-center pt-12 md:pt-20 pb-4 md:pb-8 pointer-events-none select-none"
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

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Image src="/eye.svg" alt="Eye" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
