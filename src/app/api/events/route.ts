import { NextRequest, NextResponse } from 'next/server';
import { validateAnalyticsEnvelope } from '@/lib/analytics-events';
import { CONSENT_COOKIE_NAME, verifyConsentCookie } from '@/lib/consent-server';

const MAX_BODY_BYTES = 4096;

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  return origin === request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return NextResponse.json(
      { error: 'invalid_content_type' },
      { status: 415 }
    );
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'payload_too_large' }, { status: 413 });
  }

  const decision = verifyConsentCookie(
    request.cookies.get(CONSENT_COOKIE_NAME)?.value
  );
  if (!decision?.preferences.analytics) {
    return NextResponse.json({ error: 'consent_required' }, { status: 403 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'payload_too_large' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const event = validateAnalyticsEnvelope(body);
  if (!event) {
    return NextResponse.json({ error: 'invalid_event' }, { status: 400 });
  }

  const measurementId = process.env.GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA_API_SECRET;
  if (!measurementId || !apiSecret) {
    return NextResponse.json(
      { error: 'analytics_service_unavailable' },
      { status: 503 }
    );
  }

  const params: Record<string, string | number> = {
    ...event.params,
    session_id: event.sessionId,
    engagement_time_msec: 1,
  };
  if (event.name === 'page_view') {
    params.page_location = `https://brunocandia.com${event.params.path}`;
  }

  let response: Response;
  try {
    response = await fetch(
      `https://region1.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          client_id: event.clientId,
          consent: {
            ad_user_data: 'DENIED',
            ad_personalization: 'DENIED',
          },
          events: [{ name: event.name, params }],
        }),
        cache: 'no-store',
      }
    );
  } catch {
    return NextResponse.json({ error: 'upstream_failure' }, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json({ error: 'upstream_failure' }, { status: 502 });
  }

  return new NextResponse(null, { status: 204 });
}
