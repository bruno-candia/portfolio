import { AnalyticsEventMap, AnalyticsEventName } from '@/lib/analytics-events';
import { hasClientConsent } from '@/features/privacy/consent';

const CLIENT_ID_KEY = 'portfolio_analytics_client_id';
const SESSION_ID_KEY = 'portfolio_analytics_session_id';

export const isTrackingEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;

  if (process.env.NEXT_PUBLIC_ANALYTICS_TEST_MODE === 'true') return true;

  const hostname = window.location.hostname;

  // Exclude localhost and local network IPs
  const isLocal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    hostname.startsWith('172.');

  // Exclude Vercel preview environments (not the production domain)
  const isVercelPreview =
    hostname.endsWith('.vercel.app') && hostname !== 'brunocandia.com';

  // Exclude automation/bots (webdriver)
  const isBot = typeof navigator !== 'undefined' && !!navigator.webdriver;

  return !isLocal && !isVercelPreview && !isBot;
};

function getClientId(): string {
  const existing = window.localStorage.getItem(CLIENT_ID_KEY);
  if (existing) return existing;

  const created = window.crypto.randomUUID();
  window.localStorage.setItem(CLIENT_ID_KEY, created);
  return created;
}

function getSessionId(): number {
  const existing = Number(window.sessionStorage.getItem(SESSION_ID_KEY));
  if (Number.isSafeInteger(existing) && existing > 0) return existing;

  const created = Math.floor(Date.now() / 1000);
  window.sessionStorage.setItem(SESSION_ID_KEY, String(created));
  return created;
}

export function clearAnalyticsIdentifiers() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(CLIENT_ID_KEY);
  window.sessionStorage.removeItem(SESSION_ID_KEY);
}

export function sendAnalyticsEvent<N extends AnalyticsEventName>(
  name: N,
  params: AnalyticsEventMap[N]
) {
  if (
    typeof window === 'undefined' ||
    !isTrackingEnabled() ||
    !hasClientConsent('analytics')
  ) {
    return;
  }

  void fetch('/api/events', {
    method: 'POST',
    credentials: 'same-origin',
    keepalive: true,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name,
      params,
      clientId: getClientId(),
      sessionId: getSessionId(),
    }),
  }).catch(() => {
    // Telemetry must never affect the visitor's experience.
  });
}
