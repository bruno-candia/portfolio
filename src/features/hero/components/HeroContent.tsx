import { useHeroViewModel } from '../hooks/useHeroViewModel';

export function HeroContent() {
  const { greeting, role, description } = useHeroViewModel();

  return (
    <div className="text-center z-10 flex flex-col items-center gap-2">
      <span className="text-xl md:text-2xl font-light text-gray-400 font-sans tracking-wide">
        {greeting}
      </span>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight font-sans mt-4">
        {role}
      </h1>
      <h2 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight font-sans text-gray-300">
        {description}
      </h2>
    </div>
  );
}
