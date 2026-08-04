'use client';

import { HeroContent } from './components/HeroContent';
import { HeroSocials } from './components/HeroSocials';
import { Button } from '@/components/atoms/button';
import { useHeroViewModel } from './hooks/useHeroViewModel';

export function Hero() {
  const { cvDownloadText, handleDownloadCV } = useHeroViewModel();

  return (
    <section className="relative flex w-full flex-col items-center justify-center bg-bg text-ink min-h-[calc(100svh-104px)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-page -translate-x-1/2 md:block"
      >
        <span className="absolute inset-y-0 left-0 w-px bg-line" />
        <span className="absolute inset-y-0 right-0 w-px bg-line" />
      </div>

      <div className="-mt-16 flex w-full max-w-page flex-col items-center px-5 md:px-0">
        <HeroContent />

        <Button asChild variant="primary" size="ds" className="mt-10">
          <a
            href="/bruno-candia-full-stack-resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownloadCV}
          >
            {cvDownloadText}
          </a>
        </Button>
      </div>

      <HeroSocials />

      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line" />
    </section>
  );
}
