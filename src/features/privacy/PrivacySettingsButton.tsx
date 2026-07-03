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
      className="text-left text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {t('settings')}
    </button>
  );
}
