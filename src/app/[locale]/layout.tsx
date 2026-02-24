import type { Metadata } from 'next';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import '../globals.css';

import { Geist_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const graffiti: NextFontWithVariable = localFont({
  src: '../fonts/adrip1.woff2',
  variable: '--font-graffiti',
});

const cabinetGrotesk: NextFontWithVariable = localFont({
  src: '../fonts/CabinetGrotesk.woff2',
  variable: '--font-cabinet-grotesk',
});

const BASE_URL = 'https://www.brunocandia.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: {
      template: '%s | Bruno Costa',
      default: t('title'),
    },
    description: t('description'),
    metadataBase: new URL(BASE_URL),
    applicationName: 'Bruno Costa Portfolio',
    authors: [{ name: 'Bruno Costa', url: BASE_URL }],
    keywords: [
      'Full-Stack Developer',
      'React',
      'Next.js',
      'Node.js',
      'Senior Developer',
      'Software Engineer',
      'TypeScript',
      'Frontend',
      'Backend',
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        pt: '/pt',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${BASE_URL}/${locale}`,
      siteName: 'Bruno Costa',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      type: 'profile',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Bruno Costa - Senior Full-Stack Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bruno Costa',
    givenName: 'Bruno',
    familyName: 'Costa',
    url: BASE_URL,
    image: `${BASE_URL}/profile.jpg`,
    jobTitle: 'Senior Full-Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Open to Work',
    },
    description: t('description'),
    sameAs: [
      'https://github.com/bruno-candia',
      'https://www.linkedin.com/in/bruno-candia',
      'https://www.instagram.com/brunocandia/',
      'https://www.behance.net/brunocostac3',
    ],
    knowsAbout: [
      { '@type': 'SoftwareApplication', name: 'React' },
      { '@type': 'SoftwareApplication', name: 'Next.js' },
      { '@type': 'SoftwareApplication', name: 'Node.js' },
      { '@type': 'SoftwareApplication', name: 'TypeScript' },
      { '@type': 'SoftwareApplication', name: 'Tailwind CSS' },
      { '@type': 'SoftwareApplication', name: 'PostgreSQL' },
    ],
  };

  return (
    <html lang={locale} className={'dark'}>
      <body
        className={`${graffiti.variable} ${cabinetGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
          />
          {children}
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-8M39HC0PEZ" />
      </body>
    </html>
  );
}
