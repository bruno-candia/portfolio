import { NextRequest, NextResponse } from 'next/server';
import { ConsentPreferences } from '@/features/privacy/consent';
import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_SECONDS,
  createConsentCookieValue,
  verifyConsentCookie,
} from '@/lib/consent-server';

const MAX_BODY_BYTES = 1024;

const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
};

function parsePreferences(value: unknown): ConsentPreferences | null {
  if (!value || typeof value !== 'object') return null;
  const input = value as Record<string, unknown>;

  if (
    typeof input.analytics !== 'boolean' ||
    typeof input.diagnostics !== 'boolean'
  ) {
    return null;
  }

  return {
    analytics: input.analytics,
    diagnostics: input.diagnostics,
    marketing: false,
  };
}

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) {
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

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'payload_too_large' }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const preferences = parsePreferences(body);
  if (!preferences) {
    return NextResponse.json({ error: 'invalid_preferences' }, { status: 400 });
  }

  const value = createConsentCookieValue(preferences);
  if (!value) {
    return NextResponse.json(
      { error: 'consent_service_unavailable' },
      { status: 503 }
    );
  }

  const decision = verifyConsentCookie(value);
  if (!decision) {
    return NextResponse.json(
      { error: 'consent_service_unavailable' },
      { status: 503 }
    );
  }

  const response = NextResponse.json(decision);
  response.cookies.set(CONSENT_COOKIE_NAME, value, {
    ...cookieOptions,
    maxAge: CONSENT_MAX_AGE_SECONDS,
  });
  return response;
}

export function DELETE() {
  const response = new NextResponse(null, { status: 204 });
  response.cookies.set(CONSENT_COOKIE_NAME, '', {
    ...cookieOptions,
    maxAge: 0,
  });
  return response;
}
