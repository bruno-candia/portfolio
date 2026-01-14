import type { Metadata } from 'next';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import '../globals.css';

import { Geist_Mono } from 'next/font/google';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://brunocandia.com.br'), // Replace with actual domain
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://brunocandia.com.br/${locale}`,
      siteName: 'Bruno Costa',
      images: [
        {
          url: '/favicon/web-app-manifest-512x512.png',
          width: 512,
          height: 512,
          alt: t('title'),
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/favicon/web-app-manifest-512x512.png'],
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon/favicon-96x96.png', type: 'image/png' },
      ],
      shortcut: '/favicon/favicon.ico',
      apple: '/favicon/apple-touch-icon.png',
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

  return (
    <html lang={locale} className={'dark'}>
      <body
        className={`${graffiti.variable} ${cabinetGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Bruno Costa',
                url: 'https://brunocandia.com.br',
                jobTitle: 'Full-Stack Developer',
                description:
                  'Senior Full-Stack Developer specializing in React, Next.js, and Node.js.',
                sameAs: [
                  'https://github.com/bruno-candia',
                  'https://www.linkedin.com/in/bruno-candia',
                  'https://www.instagram.com/brunocandia/',
                  'https://www.behance.net/brunocostac3',
                ],
              }),
            }}
          />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
