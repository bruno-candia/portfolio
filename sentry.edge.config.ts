import * as Sentry from '@sentry/nextjs';
import { sanitizeSentryEvent } from './src/lib/sentry-privacy';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  tracesSampleRate: 0.05,
  sendDefaultPii: false,
  beforeSend: sanitizeSentryEvent,
});
