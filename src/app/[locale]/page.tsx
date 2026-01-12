import { Header } from '@/features/header';
import { Hero } from '@/features/hero';
import { About } from '@/features/about';
import { Skills } from '@/features/skills';
import { Works } from '@/features/works';
import { Experience } from '@/features/experience';

import { Footer } from '@/features/footer';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Works />
      <Experience />
      <Footer />
    </main>
  );
}
