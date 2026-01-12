import { useHeroViewModel } from '../hooks/useHeroViewModel';

export function ScrollIndicator() {
  const { scrollDown } = useHeroViewModel();

  return (
    <div className="absolute bottom-10 right-10 flex flex-col items-center gap-4 z-10">
      <div className="flex flex-col items-center gap-2">
        <span className="text-lg rotate-90 translate-x-24 font-light lowercase p-6">
          {scrollDown}
        </span>
      </div>
    </div>
  );
}
