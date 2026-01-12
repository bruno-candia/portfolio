'use client';

import { useTranslations } from 'next-intl';
import { Logo } from '@/components/atoms/logo';
import { FooterNav } from './components/FooterNav';
import { FooterSocials } from './components/FooterSocials';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="w-full bg-zinc-950 text-white py-12 md:py-20 border-t border-zinc-900 flex justify-center">
      <div className="w-full max-w-[1080px] mx-auto px-6 flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
          <Logo />

          <div className="hidden md:block">
            <FooterSocials />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <FooterNav />
        </div>

        <div className="md:hidden pt-4">
          <FooterSocials />
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-8 md:gap-0 pt-8 md:pt-0 text-sm text-zinc-500 font-light">
          <span>{t('copyright')}</span>

          <div className="flex flex-col md:flex-row gap-2 md:gap-8">
            <span>{t('madeBy')}</span>
            <span>{t('builtIn')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
