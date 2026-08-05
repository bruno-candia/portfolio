import { ArrowDown } from 'lucide-react';
import { pageContent } from '@/components/atoms/page';
import { cn } from '@/lib/utils';
import { useAboutViewModel } from '../hooks/useAboutViewModel';

export function AboutFooter() {
  const { scrollToExplore, shortStory } = useAboutViewModel();

  return (
    <div
      className={cn(
        pageContent,
        'relative z-20 flex h-16 items-center justify-between text-ink-3 md:h-[120px]'
      )}
    >
      <div className="ds-eyebrow flex items-center gap-2">
        <ArrowDown aria-hidden size={12} strokeWidth={1.25} />
        <span>{scrollToExplore}</span>
      </div>
      <span className="ds-eyebrow hidden md:block">{shortStory}</span>
    </div>
  );
}
