'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ConsentPreferences, DENIED_PREFERENCES } from './consent';
import { useConsent } from './ConsentProvider';

const outlineButton =
  'inline-flex min-h-9 flex-1 items-center justify-center rounded-full border border-line-strong px-4 ds-small text-ink transition-colors hover:bg-surface-hi disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

const solidButton =
  'inline-flex min-h-9 flex-1 items-center justify-center rounded-full bg-ink px-4 ds-small font-medium text-ink-inverse transition-colors hover:bg-white disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

const linkText =
  'ds-small text-ink-2 underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

/** The switch is a real checkbox, so it reports its state without help. */
function Toggle({
  id,
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className={`flex items-start gap-4 ${disabled ? 'opacity-60' : ''}`}>
      <label htmlFor={id} className="flex-1">
        <span className="block ds-small text-ink">{title}</span>
        <span className="mt-0.5 block ds-mono-sm text-ink-3">
          {description}
        </span>
      </label>

      <span className="relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-label={title}
          onChange={(event) => onChange?.(event.target.checked)}
          className="peer absolute inset-0 z-10 m-0 cursor-pointer opacity-0 disabled:cursor-default"
        />
        <span className="pointer-events-none h-5 w-9 rounded-full border border-line-strong bg-inset transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink" />
        <span className="pointer-events-none absolute left-0.5 size-4 rounded-full bg-ink-3 transition-transform peer-checked:translate-x-4 peer-checked:bg-ink-inverse" />
      </span>
    </div>
  );
}

/**
 * A card in the corner rather than a bar across the screen: the frame anchors
 * it bottom left on a desktop, and the choice it asks for is not worth the
 * whole width.
 */
export function ConsentBanner() {
  const t = useTranslations('Privacy');
  const locale = useLocale();
  const { decision, privacySignal, closeSettings, savePreferences } =
    useConsent();
  const [customizing, setCustomizing] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(
    decision?.preferences ?? DENIED_PREFERENCES
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

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
      className="fixed inset-x-4 bottom-4 z-[90] flex flex-col gap-3 rounded-[14px] border border-line bg-surface p-5 text-ink shadow-[0_18px_48px_rgba(0,0,0,0.55)] md:inset-x-auto md:bottom-6 md:left-6 md:w-[420px]"
    >
      <h2 className="ds-h4 text-ink">{t('title')}</h2>
      <p className="ds-small text-ink-2">{t('description')}</p>

      <a href={`/${locale}/privacy`} className={`w-fit ${linkText}`}>
        {t('learnMore')}
      </a>

      {privacySignal && (
        <p className="ds-mono-sm text-ink-3">{t('privacySignal')}</p>
      )}

      {customizing && (
        <fieldset className="grid gap-4 border-t border-line pt-4">
          <legend className="sr-only">{t('customize')}</legend>

          <Toggle
            id="consent-analytics"
            title={t('analytics.title')}
            description={t('analytics.description')}
            checked={preferences.analytics}
            onChange={(analytics) =>
              setPreferences((current) => ({ ...current, analytics }))
            }
          />
          <Toggle
            id="consent-diagnostics"
            title={t('diagnostics.title')}
            description={t('diagnostics.description')}
            checked={preferences.diagnostics}
            onChange={(diagnostics) =>
              setPreferences((current) => ({ ...current, diagnostics }))
            }
          />
          <Toggle
            id="consent-marketing"
            title={t('marketing.title')}
            description={t('marketing.description')}
            checked={false}
            disabled
          />
        </fieldset>
      )}

      {error && (
        <p role="alert" className="ds-small text-red-300">
          {t('saveError')}
        </p>
      )}

      <div className="flex gap-2.5 border-t border-line pt-4">
        {customizing ? (
          <>
            <button
              type="button"
              onClick={() => {
                setCustomizing(false);
                if (decision) closeSettings();
              }}
              className={outlineButton}
            >
              {t('cancel')}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void save(preferences)}
              className={solidButton}
            >
              {t('save')}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              disabled={saving}
              onClick={() => void save(DENIED_PREFERENCES)}
              className={outlineButton}
            >
              {t('reject')}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() =>
                void save({
                  analytics: true,
                  diagnostics: true,
                  marketing: false,
                })
              }
              className={outlineButton}
            >
              {t('accept')}
            </button>
          </>
        )}
      </div>

      {!customizing && (
        <button
          type="button"
          onClick={() => setCustomizing(true)}
          className={`w-fit ${linkText}`}
        >
          {t('customize')}
        </button>
      )}
    </section>
  );
}
