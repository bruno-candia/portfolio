import { ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Logo } from '@/components/atoms/logo';
import { PageRules, pageContent } from '@/components/atoms/page';
import { PrivacySettingsButton } from '@/features/privacy/PrivacySettingsButton';
import { Link } from '@/i18n/routing';
import { type Locale, getBasics } from '@/lib/resume';
import { cn } from '@/lib/utils';
import { FooterNav } from './components/FooterNav';
import { FooterSocials } from './components/FooterSocials';

export function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale() as Locale;
  const basics = getBasics(locale);
  const linkedin = basics.profiles.find(
    (profile) => profile.network === 'LinkedIn'
  );

  return (
    <footer id="contact" className="relative w-full bg-bg text-ink">
      <PageRules />

      <div className="min-h-[352px] border-y border-line md:h-[336px] md:min-h-0">
        <div className={cn(pageContent, 'pt-16 md:pt-[86px]')}>
          <p className="ds-eyebrow text-ink-3">{t('eyebrow')}</p>
          <h2 className="ds-m-h1 mt-2 text-ink md:ds-h2">{t('title')}</h2>
          <p className="ds-small mt-3 max-w-[520px] text-ink-2 md:ds-body">
            {t('description')}
          </p>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row md:items-center">
            <a
              href={`mailto:${basics.email}`}
              className="ds-small inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-4 text-ink-inverse transition-colors hover:bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {basics.email}
              <ArrowUpRight aria-hidden size={16} strokeWidth={1.5} />
            </a>
            {linkedin ? (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ds-small inline-flex min-h-11 items-center gap-2 rounded-md border border-line-strong px-4 text-ink-2 transition-colors hover:border-line-hard hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                {t('linkedin')}
                <ArrowUpRight aria-hidden size={16} strokeWidth={1.5} />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="min-h-[232px] border-b border-line md:h-[145px] md:min-h-0">
        <div
          className={cn(
            pageContent,
            'flex h-full flex-col justify-center md:grid md:grid-cols-[160px_1fr_auto] md:items-center'
          )}
        >
          <Logo className="hidden md:block" aria-label="Bruno Costa" />
          <FooterNav />
          <FooterSocials profiles={basics.profiles} />
        </div>
      </div>

      <div className="min-h-[116px] md:h-[99px] md:min-h-0">
        <div
          className={cn(
            pageContent,
            'ds-small flex h-full flex-col justify-center gap-2 text-ink-3 md:flex-row md:items-center md:justify-between md:gap-8'
          )}
        >
          <span>{t('copyright')}</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-end">
            <span>
              <span className="sr-only">{t('madeByAccessible')}</span>
              <span aria-hidden="true">
                {t('madeByPrefix')} ♥️ {t('madeBySuffix')}
              </span>
            </span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {t('privacy')}
            </Link>
            <PrivacySettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
