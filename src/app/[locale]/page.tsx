import { Header } from '@/features/header';
import { Hero } from '@/features/hero';
import { About } from '@/features/about';
import { Skills } from '@/features/skills';
import { Works } from '@/features/works';
import { Experience } from '@/features/experience';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Works />
      <Experience />
    </main>
  );
}
