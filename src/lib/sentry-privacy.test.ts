import { describe, expect, it } from 'vitest';
import { sanitizeSentryEvent } from './sentry-privacy';

describe('Sentry privacy sanitizer', () => {
  it('removes visitor data and redacts messages', () => {
    const event = sanitizeSentryEvent({
      message:
        'Failure for person@example.com at https://site.test/path?token=1',
      user: { id: 'visitor' },
      extra: { formValue: 'secret' },
      request: {
        url: 'https://site.test/path?token=1',
        headers: { cookie: 'secret' },
        cookies: { session: 'secret' },
        data: { password: 'secret' },
        query_string: 'token=1',
      },
    });

    expect(event.user).toBeUndefined();
    expect(event.extra).toBeUndefined();
    expect(event.message).toBe(
      'Failure for [redacted-email] at https://site.test/path'
    );
    expect(event.request).toEqual({ url: 'https://site.test/path' });
  });
});
