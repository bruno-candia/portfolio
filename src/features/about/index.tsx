import { PageRules, pageContent } from '@/components/atoms/page';
import { cn } from '@/lib/utils';
import { AboutEye } from './components/AboutEye';
import { AboutContent } from './components/AboutContent';
import { AboutFooter } from './components/AboutFooter';

export const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-[640px] w-full overflow-hidden bg-bg md:min-h-[820px]"
    >
      <PageRules />

      <div className="h-16 md:h-[120px]" aria-hidden="true" />

      <div className="border-y border-line">
        <div
          className={cn(
            pageContent,
            'flex min-h-[510px] flex-col lg:grid lg:min-h-[578px] lg:grid-cols-[minmax(0,600px)_1fr]'
          )}
        >
          <div className="order-2 mt-[18px] pb-12 lg:order-1 lg:mt-0 lg:pt-28 lg:pb-16">
            <AboutContent />
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:translate-x-2.5 lg:items-center">
            <AboutEye />
          </div>
        </div>
      </div>

      <AboutFooter />
    </section>
  );
};
