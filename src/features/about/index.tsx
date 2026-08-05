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
            'flex min-h-[510px] flex-col md:grid md:min-h-[578px] md:grid-cols-[600px_1fr]'
          )}
        >
          <div className="order-2 mt-[18px] pb-12 md:order-1 md:mt-0 md:pt-28 md:pb-16">
            <AboutContent />
          </div>

          <div className="order-1 flex justify-center md:order-2 md:translate-x-2.5 md:items-center">
            <AboutEye />
          </div>
        </div>
      </div>

      <AboutFooter />
    </section>
  );
};
