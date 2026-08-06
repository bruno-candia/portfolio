'use client';

import Image from 'next/image';
import { useParallaxAnimation } from '../hooks/useParallaxAnimation';

export function AboutEye() {
  const { wrapperRef, pupilRef } = useParallaxAnimation();

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      data-about-eye
      className="relative size-[224px] select-none md:size-[300px]"
    >
      <div
        ref={pupilRef}
        data-about-pupil
        className="absolute inset-0 z-0 flex items-center justify-center will-change-transform"
      >
        <Image
          src="/pupil.svg"
          alt=""
          width={253}
          height={257}
          className="size-[38%] object-contain"
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image src="/eye.svg" alt="" fill className="object-contain" />
      </div>
    </div>
  );
}
