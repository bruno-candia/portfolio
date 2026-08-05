import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('PrivacyNotice');

  return (
    <main
      data-reading-content
      className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100"
    >
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="ds-small text-zinc-400 underline underline-offset-4 hover:text-white"
        >
          {t('back')}
        </Link>
        <h1 className="ds-m-display mt-8 md:ds-h1">{t('title')}</h1>
        <p className="ds-body-lg mt-4 text-zinc-300">{t('intro')}</p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="ds-h3">{t('controller.title')}</h2>
            <p className="ds-body-lg mt-2 text-zinc-300">
              {t('controller.description')}
            </p>
          </section>
          <section>
            <h2 className="ds-h3">{t('data.title')}</h2>
            <p className="ds-body-lg mt-2 text-zinc-300">
              {t('data.description')}
            </p>
          </section>
          <section>
            <h2 className="ds-h3">{t('providers.title')}</h2>
            <p className="ds-body-lg mt-2 text-zinc-300">
              {t.rich('providers.description', {
                google: (chunks) => (
                  <a
                    href="https://policies.google.com/privacy"
                    rel="noreferrer"
                    target="_blank"
                    className="underline underline-offset-4"
                  >
                    {chunks}
                  </a>
                ),
                sentry: (chunks) => (
                  <a
                    href="https://sentry.io/privacy/"
                    rel="noreferrer"
                    target="_blank"
                    className="underline underline-offset-4"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </section>
          <section>
            <h2 className="ds-h3">{t('retention.title')}</h2>
            <p className="ds-body-lg mt-2 text-zinc-300">
              {t('retention.description')}
            </p>
          </section>
          <section>
            <h2 className="ds-h3">{t('control.title')}</h2>
            <p className="ds-body-lg mt-2 text-zinc-300">
              {t('control.description')}
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
