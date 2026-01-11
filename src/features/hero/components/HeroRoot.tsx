import { ReactNode } from 'react';

interface HeroRootProps {
  children: ReactNode;
}

export function HeroRoot({ children }: HeroRootProps) {
  return (
    <section className="relative h-screen w-full bg-black text-white flex flex-col items-center justify-start pt-24 md:pt-48 overflow-hidden">
      {children}
    </section>
  );
}
