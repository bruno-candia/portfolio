'use client';

import Link from 'next/link';
import './globals.css';
import localFont from 'next/font/local';
import { Button } from '@/components/atoms/button';

const cabinetGrotesk = localFont({
  src: './fonts/CabinetGrotesk.woff2',
  variable: '--font-cabinet-grotesk',
});

export default function NotFound() {
  return (
    <html lang="en" className={cabinetGrotesk.variable}>
      <body className="bg-black text-white overflow-hidden">
        <main className="h-screen w-screen flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="z-10 text-center space-y-8 p-4">
            <div className="relative inline-block">
              <h1
                className="text-9xl font-black text-white glitch-text tracking-tighter"
                data-text="404"
              >
                404
              </h1>
            </div>
            <div className="space-y-2 pb-12">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-red-500">
                System Failure
              </h2>
              <p className="text-zinc-400 font-light max-w-md mx-auto">
                The coordinates you are trying to access do not exist in this
                dimension.
              </p>
            </div>
            <Button>
              <Link href="/">Return to Base</Link>
            </Button>
          </div>

          <div className="absolute bottom-10 left-0 w-full text-center">
            <p className="text-xs text-zinc-700 font-mono">
              ERR_CODE: ID_10_T // BRUNO_COSTA_PORTFOLIO_V4
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
