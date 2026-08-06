import { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { getProjects, type Locale } from '@/lib/resume';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brunocandia.com';

  const cases = routing.locales.flatMap((locale) =>
    getProjects(locale as Locale).map((project) => ({
      url: `${baseUrl}/${locale}/projetos/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...cases,
  ];
}
