// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';
import {
  CONSENT_COOKIE_NAME,
  createConsentCookieValue,
} from '@/lib/consent-server';

const environment = {
  consent: process.env.CONSENT_SECRET,
  measurement: process.env.GA_MEASUREMENT_ID,
  api: process.env.GA_API_SECRET,
};

const event = {
  name: 'page_view',
  params: { path: '/pt', locale: 'pt' },
  clientId: '5fb9a010-8d93-44de-a7d2-117f5ea7f001',
  sessionId: 1_720_000_000,
};

beforeEach(() => {
  process.env.CONSENT_SECRET = 'test-secret-with-at-least-thirty-two-bytes';
  process.env.GA_MEASUREMENT_ID = 'G-TEST';
  process.env.GA_API_SECRET = 'api-secret';
});

afterEach(() => {
  vi.unstubAllGlobals();
  if (environment.consent === undefined) delete process.env.CONSENT_SECRET;
  else process.env.CONSENT_SECRET = environment.consent;
  if (environment.measurement === undefined)
    delete process.env.GA_MEASUREMENT_ID;
  else process.env.GA_MEASUREMENT_ID = environment.measurement;
  if (environment.api === undefined) delete process.env.GA_API_SECRET;
  else process.env.GA_API_SECRET = environment.api;
});

function request(cookie?: string) {
  return new NextRequest('https://brunocandia.com/api/events', {
    method: 'POST',
    headers: {
      origin: 'https://brunocandia.com',
      'content-type': 'application/json',
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify(event),
  });
}

describe('analytics gateway', () => {
  it('rejects events without signed analytics consent', async () => {
    const upstream = vi.fn();
    vi.stubGlobal('fetch', upstream);

    const response = await POST(request());

    expect(response.status).toBe(403);
    expect(upstream).not.toHaveBeenCalled();
  });

  it('forwards only the validated payload after consent', async () => {
    const upstream = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', upstream);
    const consent = createConsentCookieValue({
      analytics: true,
      diagnostics: false,
      marketing: false,
    });

    const response = await POST(
      request(`${CONSENT_COOKIE_NAME}=${consent ?? ''}`)
    );

    expect(response.status).toBe(204);
    expect(upstream).toHaveBeenCalledOnce();
    const [, options] = upstream.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(String(options.body));
    expect(payload).toEqual({
      client_id: event.clientId,
      consent: { ad_user_data: 'DENIED', ad_personalization: 'DENIED' },
      events: [
        {
          name: 'page_view',
          params: {
            path: '/pt',
            locale: 'pt',
            session_id: event.sessionId,
            engagement_time_msec: 1,
            page_location: 'https://brunocandia.com/pt',
          },
        },
      ],
    });
    expect(JSON.stringify(payload)).not.toContain('user-agent');
    expect(JSON.stringify(payload)).not.toContain('127.0.0.1');
  });
});
