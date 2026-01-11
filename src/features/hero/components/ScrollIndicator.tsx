import { Minus } from 'lucide-react';
import { useHeroViewModel } from '../hooks/useHeroViewModel';

export function ScrollIndicator() {
  const { scrollDown } = useHeroViewModel();

  return (
    <div className="absolute bottom-10 right-10 flex flex-col items-center gap-4 z-10">
      <span className="text-sm tracking-widest uppercase writing-mode-vertical rotate-180 hidden sm:block">
        W.
      </span>

      <div className="flex flex-col items-center gap-2">
        <span className="text-lg rotate-90 translate-x-24 font-light lowercase p-8">
          {scrollDown}
        </span>
      </div>
    </div>
  );
}
