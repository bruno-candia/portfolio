import { Button } from '@/components/atoms/button';
import { useAboutViewModel } from '../hooks/useAboutViewModel';
import Link from 'next/link';

export function AboutContent() {
  const { title, description, buttonLabel } = useAboutViewModel();

  return (
    <div className="flex flex-col items-center text-center gap-12 pt-4 md:pt-8 pb-32 px-6 z-10 relative">
      <h2 className="text-xl md:text-3xl font-light leading-snug tracking-wide text-gray-200 max-w-4xl">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
        {description}
      </p>

      <Button size="lg">
        <Link href="/about">{buttonLabel}</Link>
      </Button>
    </div>
  );
}
