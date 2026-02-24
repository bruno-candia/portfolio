import { getTranslations } from 'next-intl/server';
import { HeroContent } from './components/HeroContent';
import { HeroSocials } from './components/HeroSocials';
import { DownloadCVButton } from './components/DownloadCVButton';

export async function Hero() {
  const t = await getTranslations('Hero');

  return (
    <section
      className="relative w-full bg-black text-white flex flex-col items-center justify-start pt-24 md:pt-48 overflow-hidden"
      style={{ height: '100svh' }}
    >
      <div className="w-full max-w-[1080px] mx-auto px-6">
        <HeroContent
          greeting={t('greeting')}
          role={t('role')}
          description={t('description')}
        />
      </div>
      <HeroSocials />
      <DownloadCVButton text={t('downloadCV')} />
    </section>
  );
}
