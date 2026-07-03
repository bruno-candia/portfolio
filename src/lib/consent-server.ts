import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  CONSENT_VERSION,
  ConsentDecision,
  isConsentDecision,
} from '@/features/privacy/consent';

export const CONSENT_COOKIE_NAME = 'portfolio_consent';
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

function getConsentSecret(): string | null {
  if (
    process.env.CONSENT_SECRET &&
    Buffer.byteLength(process.env.CONSENT_SECRET, 'utf8') >= 32
  ) {
    return process.env.CONSENT_SECRET;
  }
  if (process.env.NODE_ENV !== 'production') {
    return 'development-only-consent-secret-do-not-use-in-production';
  }
  return null;
}

function signPayload(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createConsentCookieValue(
  preferences: ConsentDecision['preferences']
): string | null {
  const secret = getConsentSecret();
  if (!secret) return null;

  const decision: ConsentDecision = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    preferences: {
      analytics: preferences.analytics,
      diagnostics: preferences.diagnostics,
      marketing: false,
    },
  };
  const payload = Buffer.from(JSON.stringify(decision)).toString('base64url');
  return `${payload}.${signPayload(payload, secret)}`;
}

export function verifyConsentCookie(value?: string): ConsentDecision | null {
  const secret = getConsentSecret();
  if (!secret || !value) return null;

  const [payload, signature, extra] = value.split('.');
  if (!payload || !signature || extra) return null;

  const expected = Buffer.from(signPayload(payload, secret));
  const received = Buffer.from(signature);
  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    return null;
  }

  try {
    const decoded: unknown = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    );
    if (!isConsentDecision(decoded)) return null;

    const age = Date.now() - Date.parse(decoded.decidedAt);
    if (age < 0 || age > CONSENT_MAX_AGE_SECONDS * 1000) return null;
    return decoded;
  } catch {
    return null;
  }
}
