import { setRequestLocale } from 'next-intl/server';

import { Header } from '@/features/header';
import { Hero } from '@/features/hero';
import { About } from '@/features/about';
import { Skills } from '@/features/skills';
import { Works } from '@/features/works';
import { Experience } from '@/features/experience';

import { Footer } from '@/features/footer';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <Header />
      <div data-reading-content className="contents">
        <Hero />
        <About />
        <Skills />
        <Works />
        <Experience />
      </div>
      <Footer />
    </main>
  );
}
