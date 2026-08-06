import { useAboutViewModel } from '../hooks/useAboutViewModel';

export function AboutContent() {
  const { eyebrow, title, description } = useAboutViewModel();

  return (
    <div className="relative z-10 max-w-[600px]">
      <p className="ds-eyebrow text-ink-3">{eyebrow}</p>
      <h2 className="ds-m-h2 mt-4 text-ink md:ds-h1">{title}</h2>
      <p className="ds-small mt-4 text-ink-2 md:ds-body-lg md:mt-8">
        {description}
      </p>
    </div>
  );
}
