import type { Metadata, Viewport } from 'next'
import {
  Space_Grotesk as SpaceGrotesk,
  Permanent_Marker as PermanentMarker,
  Gloria_Hallelujah as GloriaHallelujah,
} from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '@/styles/globals.css'
import { siteConfig } from '@/config/site'
import { ThemeProvider } from '@/providers/theme-provider'
import clsx from 'clsx'
import Header from '@/components/header'

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

const gloriaHallelujah = GloriaHallelujah({
  subsets: ['latin'],
  variable: '--font-gloria',
  weight: '400',
})

const permanentMarker = PermanentMarker({
  subsets: ['latin'],
  variable: '--font-permanent',
  weight: '400',
})
interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Server Components', 'CSS'],
  authors: [
    {
      name: 'Bruno Costa',
      url: 'https://bruno-candia.com.br',
    },
  ],
  creator: 'Bruno Costa',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@Bruno_Candia',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = await getMessages()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={clsx(
          spaceGrotesk.variable,
          gloriaHallelujah.variable,
          permanentMarker.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
