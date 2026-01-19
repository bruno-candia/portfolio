'use client';

import { HeroContent } from './components/HeroContent';
import { HeroSocials } from './components/HeroSocials';
import { Button } from '@/components/atoms/button';
import { useHeroViewModel } from './hooks/useHeroViewModel';

export function Hero() {
  const { cvDownloadText, handleDownloadCV } = useHeroViewModel();

  return (
    <section
      className="relative w-full bg-black text-white flex flex-col items-center justify-start pt-24 md:pt-48 overflow-hidden"
      style={{ height: '100svh' }}
    >
      <div className="w-full max-w-[1080px] mx-auto px-6">
        <HeroContent />
      </div>
      <HeroSocials />
      <Button
        asChild
        size="lg"
        className="absolute bottom-16 md:bottom-20 bg-white text-black hover:bg-white/90 hover:text-black px-8 py-3 text-base"
      >
        <a href="/brunocandia-cv-slim.pdf" download onClick={handleDownloadCV}>
          {cvDownloadText}
        </a>
      </Button>
    </section>
  );
}
