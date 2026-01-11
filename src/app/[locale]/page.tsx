import { Header } from '@/features/header';
import { Hero } from '@/features/hero';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero.Root>
        <Hero.Content />
        <Hero.Socials />
        <Hero.ScrollIndicator />
      </Hero.Root>
    </main>
  );
}
