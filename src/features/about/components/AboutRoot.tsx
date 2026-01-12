import { ReactNode } from 'react';

interface AboutRootProps {
  children: ReactNode;
}

export function AboutRoot({ children }: AboutRootProps) {
  return (
    <section className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden border-t border-neutral-800">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute left-10 md:left-20 top-0 w-px h-full bg-neutral-800"></div>
        <div className="absolute right-10 md:right-20 top-0 w-px h-full bg-neutral-800"></div>
        <div className="absolute left-1/2 top-0 w-px h-full bg-neutral-800 -translate-x-1/2"></div>

        <div className="absolute top-20 left-0 w-full h-px bg-neutral-800"></div>
        <div className="absolute bottom-20 left-0 w-full h-px bg-neutral-800"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 md:px-0">
        {children}
      </div>
    </section>
  );
}
