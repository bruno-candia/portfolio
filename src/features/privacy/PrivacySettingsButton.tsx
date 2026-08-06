'use client';

import { useTranslations } from 'next-intl';
import { useConsent } from './ConsentProvider';

export function PrivacySettingsButton() {
  const t = useTranslations('Privacy');
  const { openSettings } = useConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className="text-left text-ink-3 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      {t('settings')}
    </button>
  );
}
