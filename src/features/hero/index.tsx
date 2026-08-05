'use client';

import { HeroContent } from './components/HeroContent';
import { HeroSocials } from './components/HeroSocials';
import { Button } from '@/components/atoms/button';
import { PageRules, pageContent } from '@/components/atoms/page';
import { cn } from '@/lib/utils';
import { useHeroViewModel } from './hooks/useHeroViewModel';

export function Hero() {
  const { cvDownloadText, handleDownloadCV } = useHeroViewModel();

  return (
    <section className="relative flex w-full flex-col items-center justify-center bg-bg text-ink min-h-[calc(100svh-104px)]">
      <PageRules />

      <div className={cn(pageContent, '-mt-16 flex flex-col items-center')}>
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
