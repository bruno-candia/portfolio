import { afterEach, describe, expect, it } from 'vitest';
import {
  createConsentCookieValue,
  verifyConsentCookie,
} from './consent-server';

const originalSecret = process.env.CONSENT_SECRET;

afterEach(() => {
  if (originalSecret === undefined) delete process.env.CONSENT_SECRET;
  else process.env.CONSENT_SECRET = originalSecret;
});

describe('consent cookie', () => {
  it('signs and verifies a valid decision', () => {
    process.env.CONSENT_SECRET = 'test-secret-with-sufficient-entropy';
    const value = createConsentCookieValue({
      analytics: true,
      diagnostics: false,
      marketing: false,
    });

    expect(value).not.toBeNull();
    expect(verifyConsentCookie(value ?? undefined)?.preferences).toEqual({
      analytics: true,
      diagnostics: false,
      marketing: false,
    });
  });

  it('rejects a modified signature', () => {
    process.env.CONSENT_SECRET = 'test-secret-with-sufficient-entropy';
    const value = createConsentCookieValue({
      analytics: true,
      diagnostics: true,
      marketing: false,
    });

    expect(verifyConsentCookie(`${value}modified`)).toBeNull();
  });

  it('never enables the reserved marketing category', () => {
    process.env.CONSENT_SECRET = 'test-secret-with-sufficient-entropy';
    const value = createConsentCookieValue({
      analytics: false,
      diagnostics: false,
      marketing: true as false,
    });

    expect(verifyConsentCookie(value ?? undefined)?.preferences.marketing).toBe(
      false
    );
  });
});
