import { cn } from '@/lib/utils';
import { AboutEye } from './components/AboutEye';
import { AboutContent } from './components/AboutContent';
import { AboutFooter } from './components/AboutFooter';

export const About = () => {
  return (
    <section
      id="about"
      className={cn(
        'relative w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center overflow-hidden'
      )}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute left-4 md:left-20 top-0 w-px h-full bg-neutral-800" />
        <div className="absolute right-4 md:right-20 top-0 w-px h-full bg-neutral-800" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-neutral-800 -translate-x-1/2" />
        <div className="absolute top-10 md:top-20 left-0 w-full h-px bg-neutral-800" />
        <div className="absolute bottom-10 md:bottom-20 left-0 w-full h-px bg-neutral-800" />
      </div>

      <div className="flex justify-center flex-col items-center max-w-[1080px] mx-auto w-full">
        <AboutEye />
        <AboutContent />
        <AboutFooter />
      </div>
    </section>
  );
};
