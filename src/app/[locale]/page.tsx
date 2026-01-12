import { Header } from '@/features/header';
import { Hero } from '@/features/hero';
import { About } from '@/features/about';
import { Skills } from '@/features/skills';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Skills />
    </main>
  );
}
