'use client';

import { HeroContent } from './components/HeroContent';
import { HeroSocials } from './components/HeroSocials';

export function Hero() {
  return (
    <section
      className="relative w-full bg-black text-white flex flex-col items-center justify-start pt-24 md:pt-48 overflow-hidden"
      style={{ height: '100svh' }}
    >
      <div className="w-full max-w-[1080px] mx-auto px-6">
        <HeroContent />
      </div>
      <HeroSocials />
    </section>
  );
}
