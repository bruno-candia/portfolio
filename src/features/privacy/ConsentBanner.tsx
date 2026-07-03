'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ConsentPreferences, DENIED_PREFERENCES } from './consent';
import { useConsent } from './ConsentProvider';

export function ConsentBanner() {
  const t = useTranslations('Privacy');
  const locale = useLocale();
  const { decision, isOpen, privacySignal, closeSettings, savePreferences } =
    useConsent();
  const [customizing, setCustomizing] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(
    decision?.preferences ?? DENIED_PREFERENCES
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPreferences(decision?.preferences ?? DENIED_PREFERENCES);
      setError(false);
    }
  }, [decision, isOpen]);

  if (!isOpen) return null;

  const save = async (next: ConsentPreferences) => {
    setSaving(true);
    setError(false);
    try {
      await savePreferences(next);
      setCustomizing(false);
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      aria-label={t('title')}
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-xl border border-zinc-700 bg-zinc-950 p-5 text-white shadow-2xl md:p-6"
    >
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-medium">{t('title')}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {t('description')}
          </p>
          <a
            href={`/${locale}/privacy`}
            className="mt-2 inline-block text-sm text-zinc-300 underline underline-offset-4 hover:text-white"
          >
            {t('learnMore')}
          </a>
          {privacySignal && (
            <p className="mt-2 text-sm text-zinc-400">{t('privacySignal')}</p>
          )}
        </div>

        {customizing && (
          <fieldset className="grid gap-3 border-y border-zinc-800 py-4">
            <legend className="sr-only">{t('customize')}</legend>
            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm font-medium">
                  {t('analytics.title')}
                </span>
                <span className="block text-xs leading-5 text-zinc-400">
                  {t('analytics.description')}
                </span>
              </span>
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-white"
                checked={preferences.analytics}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    analytics: event.target.checked,
                  }))
                }
              />
            </label>
            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm font-medium">
                  {t('diagnostics.title')}
                </span>
                <span className="block text-xs leading-5 text-zinc-400">
                  {t('diagnostics.description')}
                </span>
              </span>
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-white"
                checked={preferences.diagnostics}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    diagnostics: event.target.checked,
                  }))
                }
              />
            </label>
            <div className="flex items-start justify-between gap-4 opacity-60">
              <span>
                <span className="block text-sm font-medium">
                  {t('marketing.title')}
                </span>
                <span className="block text-xs leading-5 text-zinc-400">
                  {t('marketing.description')}
                </span>
              </span>
              <input
                type="checkbox"
                className="mt-1 h-5 w-5"
                checked={false}
                disabled
                aria-label={t('marketing.title')}
              />
            </div>
          </fieldset>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-300">
            {t('saveError')}
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          {decision && (
            <button
              type="button"
              onClick={closeSettings}
              className="rounded-md px-4 py-2 text-sm text-zinc-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('cancel')}
            </button>
          )}
          <button
            type="button"
            onClick={() => setCustomizing((current) => !current)}
            className="rounded-md border border-zinc-600 px-4 py-2 text-sm hover:bg-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t('customize')}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void save(DENIED_PREFERENCES)}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-900 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t('reject')}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() =>
              void save(
                customizing
                  ? preferences
                  : {
                      analytics: true,
                      diagnostics: true,
                      marketing: false,
                    }
              )
            }
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {customizing ? t('save') : t('accept')}
          </button>
        </div>
      </div>
    </section>
  );
}
