'use client';

import { HeroContent } from './components/HeroContent';
import { HeroSocials } from './components/HeroSocials';
import { Button } from '@/components/atoms/button';
import { PageRules, pageContent } from '@/components/atoms/page';
import { Separator } from '@/features/separator';
import { cn } from '@/lib/utils';
import { useHeroViewModel } from './hooks/useHeroViewModel';

export function Hero() {
  const { cvDownloadText, handleDownloadCV } = useHeroViewModel();

  return (
    <section className="relative flex w-full flex-col items-center bg-bg text-ink min-h-[calc(100svh-104px)] md:justify-center">
      <PageRules />

      <div
        className={cn(
          pageContent,
          'flex flex-1 flex-col items-center justify-end md:flex-none md:-mt-16 md:justify-center'
        )}
      >
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

      {/*
       * The band gets the space under the call to action to itself and centres
       * in it, clear of the social row pinned to the bottom edge.
       */}
      <div className="flex w-full flex-1 items-center pb-[71px] md:hidden">
        <Separator placement="hero" />
      </div>

      <HeroSocials />

      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line" />
    </section>
  );
}
