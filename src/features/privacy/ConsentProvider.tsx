'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  ConsentDecision,
  ConsentPreferences,
  DENIED_PREFERENCES,
  hasBrowserPrivacySignal,
  isConsentDecision,
  readClientConsent,
} from './consent';
import {
  clearAnalyticsIdentifiers,
  sendAnalyticsEvent,
} from '@/utils/analytics';
import { ConsentBanner } from './ConsentBanner';

interface ConsentContextValue {
  decision: ConsentDecision | null;
  isOpen: boolean;
  privacySignal: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  savePreferences: (preferences: ConsentPreferences) => Promise<void>;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const locale = useLocale() as 'pt' | 'en';
  const pathname = usePathname();
  const [decision, setDecision] = useState<ConsentDecision | null>(null);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [privacySignal, setPrivacySignal] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = readClientConsent();
      setDecision(stored);
      setIsOpen(!stored);
      setPrivacySignal(hasBrowserPrivacySignal());
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const savePreferences = useCallback(
    async (preferences: ConsentPreferences) => {
      const response = await fetch('/api/privacy/consent', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(preferences),
      });
      if (!response.ok) throw new Error('Unable to save privacy preferences');

      const saved: unknown = await response.json();
      if (!isConsentDecision(saved)) {
        throw new Error('Invalid privacy preferences response');
      }

      if (!saved.preferences.analytics) clearAnalyticsIdentifiers();
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(saved));
      setDecision(saved);
      setIsOpen(false);
      window.dispatchEvent(
        new CustomEvent(CONSENT_CHANGED_EVENT, { detail: saved })
      );
    },
    []
  );

  useEffect(() => {
    if (!ready || !decision?.preferences.analytics) return;
    sendAnalyticsEvent('page_view', { path: pathname, locale });
  }, [decision?.preferences.analytics, locale, pathname, ready]);

  const value = useMemo<ConsentContextValue>(
    () => ({
      decision,
      isOpen,
      privacySignal,
      openSettings: () => setIsOpen(true),
      closeSettings: () => {
        if (decision) setIsOpen(false);
      },
      savePreferences,
    }),
    [decision, isOpen, privacySignal, savePreferences]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {ready && <ConsentBanner />}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
}

export { DENIED_PREFERENCES };
