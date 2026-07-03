export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = 'portfolio_privacy_preferences';
export const CONSENT_CHANGED_EVENT = 'portfolio:consent-changed';

export type ConsentCategory = 'analytics' | 'diagnostics' | 'marketing';

export interface ConsentPreferences {
  analytics: boolean;
  diagnostics: boolean;
  marketing: false;
}

export interface ConsentDecision {
  version: typeof CONSENT_VERSION;
  decidedAt: string;
  preferences: ConsentPreferences;
}

export const DENIED_PREFERENCES: ConsentPreferences = {
  analytics: false,
  diagnostics: false,
  marketing: false,
};

export function isConsentDecision(value: unknown): value is ConsentDecision {
  if (!value || typeof value !== 'object') return false;

  const decision = value as Partial<ConsentDecision>;
  const preferences = decision.preferences as
    | Partial<ConsentPreferences>
    | undefined;

  return (
    decision.version === CONSENT_VERSION &&
    typeof decision.decidedAt === 'string' &&
    !Number.isNaN(Date.parse(decision.decidedAt)) &&
    typeof preferences?.analytics === 'boolean' &&
    typeof preferences.diagnostics === 'boolean' &&
    preferences.marketing === false
  );
}

export function readClientConsent(): ConsentDecision | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;

    const decision: unknown = JSON.parse(stored);
    return isConsentDecision(decision) ? decision : null;
  } catch {
    return null;
  }
}

export function hasClientConsent(category: ConsentCategory): boolean {
  return readClientConsent()?.preferences[category] === true;
}

export function hasBrowserPrivacySignal(): boolean {
  if (typeof navigator === 'undefined') return false;

  const globalPrivacyControl = (
    navigator as Navigator & { globalPrivacyControl?: boolean }
  ).globalPrivacyControl;

  return globalPrivacyControl === true || navigator.doNotTrack === '1';
}
