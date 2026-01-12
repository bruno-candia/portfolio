import { ArrowDown } from 'lucide-react';
import { useAboutViewModel } from '../hooks/useAboutViewModel';

export function AboutFooter() {
  const { scrollToExplore, shortStory } = useAboutViewModel();

  return (
    <div className="absolute bottom-0 left-0 w-full px-6 md:px-20 flex justify-between items-center text-[10px] text-white opacity-50 font-medium uppercase tracking-widest z-20">
      <div className="flex items-center gap-2">
        <ArrowDown size={18} />
        <span>{scrollToExplore}</span>
      </div>
      <span>{shortStory}</span>
    </div>
  );
}
