import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function PrivacyPage() {
  const t = await getTranslations('PrivacyNotice');

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm text-zinc-400 underline underline-offset-4 hover:text-white"
        >
          {t('back')}
        </Link>
        <h1 className="mt-8 text-4xl font-medium">{t('title')}</h1>
        <p className="mt-4 leading-7 text-zinc-300">{t('intro')}</p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-medium">{t('controller.title')}</h2>
            <p className="mt-2 leading-7 text-zinc-300">
              {t('controller.description')}
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium">{t('data.title')}</h2>
            <p className="mt-2 leading-7 text-zinc-300">
              {t('data.description')}
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium">{t('providers.title')}</h2>
            <p className="mt-2 leading-7 text-zinc-300">
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
            <h2 className="text-xl font-medium">{t('retention.title')}</h2>
            <p className="mt-2 leading-7 text-zinc-300">
              {t('retention.description')}
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium">{t('control.title')}</h2>
            <p className="mt-2 leading-7 text-zinc-300">
              {t('control.description')}
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
