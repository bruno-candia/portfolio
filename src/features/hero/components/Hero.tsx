'use client';

import { HeroContent } from './HeroContent';
import { HeroSocials } from './HeroSocials';
import { ScrollIndicator } from './ScrollIndicator';

export function Hero() {
  return (
    <section className="relative h-screen w-full bg-black text-white flex flex-col items-center justify-start pt-24 md:pt-48 overflow-hidden">
      <HeroContent />
      <HeroSocials />
      <ScrollIndicator />
    </section>
  );
}
