'use client';

import { Button } from '@/components/atoms/button';
import { sendGAEvent } from '@next/third-parties/google';

interface DownloadCVButtonProps {
  text: string;
}

export function DownloadCVButton({ text }: DownloadCVButtonProps) {
  const handleDownloadCV = () => {
    sendGAEvent('event', 'download_cv', {
      event_category: 'engagement',
      event_label: 'CV Download',
      value: 1,
    });
  };

  return (
    <Button
      asChild
      size="lg"
      className="absolute bottom-16 md:bottom-20 bg-white text-black hover:bg-white/90 hover:text-black px-8 py-3 text-base"
    >
      <a href="/brunocandia-cv-slim.pdf" download onClick={handleDownloadCV}>
        {text}
      </a>
    </Button>
  );
}
