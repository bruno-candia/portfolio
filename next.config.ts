import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

// Two inline <script> tags ship with the app: the accessibility bootstrap and
// the JSON-LD block. Both are static, author-controlled constants, so the CSP
// admits inline scripts rather than forcing per-request nonces, which would
// turn every statically prerendered route dynamic. Sentry is tunnelled through
// tunnelRoute (same-origin) and GA runs server-side via /api/events, so the
// browser never talks to a third-party host — connect-src stays 'self'.
// React's dev build calls eval() for debugging niceties (never in production),
// so 'unsafe-eval' is admitted only outside production to keep `next dev` clean
// while the shipped policy stays strict.
const scriptSrc =
  process.env.NODE_ENV === 'production'
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "manifest-src 'self'",
  // No upgrade-insecure-requests: HSTS already forces HTTPS on the domain, and
  // the directive breaks HTTP-only environments (CI, preview, local prod builds)
  // because WebKit and Firefox — unlike Chromium — upgrade localhost too.
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  org: 'brunocandia',
  project: 'portfolio',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  // Same-origin proxy for browser events: keeps connect-src 'self' in the CSP
  // and dodges ad-blockers. Must not collide with a Next.js middleware route.
  tunnelRoute: '/api/v2/sys-check',
  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
