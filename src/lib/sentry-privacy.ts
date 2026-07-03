import type { Event } from '@sentry/nextjs';

function sanitizeText(value?: string): string | undefined {
  if (!value) return value;
  return value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
    .replace(/(https?:\/\/[^\s?#]+)[?#][^\s]*/gi, '$1');
}

export function sanitizeSentryEvent<T extends Event>(event: T): T {
  delete event.user;
  delete event.extra;

  event.message = sanitizeText(event.message);
  if (event.logentry) {
    event.logentry.message = sanitizeText(event.logentry.message);
    delete event.logentry.params;
  }

  if (event.request) {
    event.request.url = sanitizeText(event.request.url);
    delete event.request.headers;
    delete event.request.cookies;
    delete event.request.data;
    delete event.request.query_string;
    delete event.request.env;
  }

  event.exception?.values?.forEach((exception) => {
    exception.value = sanitizeText(exception.value);
  });
  event.breadcrumbs?.forEach((breadcrumb) => {
    breadcrumb.message = sanitizeText(breadcrumb.message);
    delete breadcrumb.data;
  });

  return event;
}
