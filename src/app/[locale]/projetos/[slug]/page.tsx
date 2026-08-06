import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { Logo } from '@/components/atoms/logo';
import { PageRules, pageContent } from '@/components/atoms/page';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import {
  getProjectBySlug,
  getProjects,
  getWork,
  type Locale,
} from '@/lib/resume';
import { CaseBody } from '@/features/works/components/case/CaseBody';
import { CaseHeader } from '@/features/works/components/case/CaseHeader';
import { CaseNav } from '@/features/works/components/case/CaseNav';
import { CaseSidebar } from '@/features/works/components/case/CaseSidebar';
import { neighbours } from '@/features/works/lib/case';

type Params = Promise<{ locale: string; slug: string }>;

/**
 * `notFound()` inside the page cannot set the status once the shell has
 * started streaming, so the response goes out as 200 with a not-found body,
 * which reads as a soft 404. Closing the set of params moves the decision
 * before rendering, so an unknown slug is a real 404.
 */
export const dynamicParams = false;

/**
 * Only projects with a full card get a case: the ones in the "others" block
 * have no case blocks written, so a page for them would be a title and a
 * stack list.
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjects(locale as Locale).map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale as Locale);

  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/${locale}/projetos/${slug}` },
    openGraph: {
      title: project.name,
      description: project.description,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function CasePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug, locale as Locale);
  if (!project || project.secondary) notFound();

  const work = project.workId
    ? getWork(locale as Locale).find((w) => w.id === project.workId)
    : undefined;

  const { previous, next } = neighbours(getProjects(locale as Locale), slug);

  return (
    <main className="relative min-h-screen w-full bg-bg">
      <PageRules />

      <div className="sticky top-0 z-50 w-full border-b border-line bg-bg">
        <div className={cn(pageContent, 'flex h-16 items-center')}>
          <Logo />
        </div>
      </div>

      <div data-reading-content className={cn(pageContent, 'pt-12 pb-30')}>
        <CaseHeader project={project} work={work} />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,680px)_1fr] lg:gap-20">
          <CaseBody project={project} />
          <CaseSidebar
            project={project}
            work={work}
            locale={locale as Locale}
          />
        </div>

        <span aria-hidden className="mt-16 block h-px bg-line" />

        <div className="mt-10">
          <CaseNav previous={previous} next={next} />
        </div>
      </div>
    </main>
  );
}
