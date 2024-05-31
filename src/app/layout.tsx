import type { Metadata, Viewport } from 'next'
import {
  Space_Grotesk as FontSans,
  Permanent_Marker as PermanentMarker,
  Gloria_Hallelujah as GloriaHallelujah,
} from 'next/font/google'
import '@/styles/globals.css'
import { siteConfig } from '@/config/site'
import { ThemeProvider } from '@/providers/theme-provider'
import clsx from 'clsx'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const gloriaHallelujah = GloriaHallelujah({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400',
})

const permanentMarker = PermanentMarker({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400',
})
interface RootLayoutProps {
  children: React.ReactNode
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={clsx(
          fontSans.variable,
          gloriaHallelujah.variable,
          permanentMarker.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
