import { useHeroViewModel } from '../hooks/useHeroViewModel';

export function HeroContent() {
  const { greeting, role, description } = useHeroViewModel();

  return (
    <div className="z-10 flex w-full min-w-0 flex-col items-center text-center">
      <p className="ds-body md:ds-body-lg text-ink-3">{greeting}</p>

      <h1 className="ds-m-display md:ds-display mt-5 max-w-full text-balance text-ink">
        {role}
      </h1>
      <p className="ds-m-display md:ds-display max-w-full text-balance text-ink-3">
        {description}
      </p>
    </div>
  );
}
