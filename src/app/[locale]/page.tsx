import { Header } from '@/features/header';
import { Hero } from '@/features/hero';
import { About } from '@/features/about';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero.Root>
        <Hero.Content />
        <Hero.Socials />
        <Hero.ScrollIndicator />
      </Hero.Root>
      <About.Root>
        <About.Eye />
        <About.Content />
        <About.Footer />
      </About.Root>
    </main>
  );
}
