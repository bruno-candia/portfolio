import { useTranslations } from 'next-intl';
import { works } from './data/works';
import { WorkCard } from './components/WorkCard';
import { Button } from '@/components/atoms/button';

export function Works() {
  const t = useTranslations('Works');

  return (
    <section
      id="works"
      className="relative w-full bg-zinc-950 py-20 md:py-32 flex justify-center"
    >
      <div className="w-full max-w-[1080px] px-6">
        <h2
          className="text-[30px] font-medium text-white pb-12 max-w-3xl"
          style={{ fontFamily: 'var(--font-cabin, Cabin, sans-serif)' }}
        >
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>

        <div className="flex justify-center pt-16">
          <Button size="lg" asChild>
            <a
              href="https://github.com/bruno-candia"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('button')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
