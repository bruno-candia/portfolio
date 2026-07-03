# Consent-First Telemetry Design

## Objective

Restore reliable portfolio analytics and browser error diagnostics through a first-party data path while preventing collection before explicit consent. The implementation must minimize collected data, reject unexpected payloads, and leave the website fully functional when telemetry is unavailable.

This design does not attempt to override a visitor's refusal or guarantee delivery against software intentionally configured to block all analytics.

## Current State

- The browser loads Google Analytics automatically in production.
- GA4 traffic is rewritten through `/telemetry`, but the resulting `/g/collect` signature remains recognizable to blockers.
- Analytics has no consent-management layer.
- Browser Sentry uses `sendDefaultPii: true` and initializes without consent.
- Existing product events cover navigation, CV downloads, social links, projects, and skill categories.

## Scope

### Included

- A small first-party consent banner in Portuguese and English.
- Separate `analytics` and `diagnostics` preferences.
- A reserved, disabled `marketing` category for future expansion.
- A permanent privacy-settings control for reviewing or revoking consent.
- A signed first-party consent cookie.
- A same-origin event gateway implemented with a Next.js Route Handler.
- Server-side forwarding to GA4 through Measurement Protocol.
- Consent-gated browser Sentry with PII disabled.
- Unit and end-to-end coverage for consent and data transmission.
- Configuration and retention documentation.

### Excluded

- Advertising, remarketing, profiling, fingerprinting, or cross-site tracking.
- Meta, TikTok, LinkedIn, Google Ads, or other marketing integrations.
- A third-party consent-management platform.
- Custom payload encryption, rotating routes, or deceptive script names.
- A self-hosted analytics product.

## Architecture

### Consent flow

1. The site renders without loading GA4 or sending browser diagnostics.
2. The first-party banner presents equally accessible accept and reject actions plus category preferences.
3. The browser posts the decision to `/api/privacy/consent`.
4. The server validates the preference document and writes a versioned, signed, secure, same-site cookie containing only categories and decision time.
5. The client updates its in-memory consent state. The UI may keep a non-sensitive local copy solely to render preferences without exposing the signed cookie.
6. Revocation expires the consent cookie and deletes analytics client/session identifiers.
7. Global Privacy Control or Do Not Track starts analytics and diagnostics in the denied state. A later explicit visitor action may change that decision.

### Analytics flow

1. After analytics consent, the browser creates pseudonymous client and session identifiers.
2. The analytics client sends a small JSON event to `/api/events` on the same origin.
3. The Route Handler verifies method, content type, origin, body size, signed consent, event name, and event parameters.
4. Accepted events are converted into the GA4 Measurement Protocol schema.
5. The server posts the event to GA4 using server-only `GA_MEASUREMENT_ID` and `GA_API_SECRET` variables.
6. The visitor's IP address, User-Agent, request headers, full URL, and query string are not copied into the GA4 payload.

The public route is stable and transparent. Reliability comes from first-party transport and server-side validation, not from attempting to defeat an explicit privacy choice.

### Diagnostics flow

- Browser Sentry uses `sendDefaultPii: false`.
- Browser events are dropped unless diagnostic consent is active.
- A sanitization hook removes unexpected URLs, headers, cookies, user data, and free-form request data before transmission.
- Server and edge diagnostics remain separately configured for operational failures, with visitor PII disabled.
- Revocation prevents subsequent browser diagnostic events.

## Components and Boundaries

### `ConsentProvider`

Owns the client-visible preference state and exposes accept, reject, customize, and revoke operations. It does not make policy decisions or send third-party requests.

### `ConsentBanner`

Renders the localized first-visit interface. It supports keyboard navigation, visible focus, screen readers, and equivalent accept/reject prominence.

### `PrivacySettings`

Provides a permanent footer entry that reopens preferences. It makes revocation as accessible as acceptance.

### Consent Route Handler

Validates preferences, signs the server cookie, and expires it on revocation. Signing uses a server-only `CONSENT_SECRET` and a versioned payload so policy changes can invalidate old consent.

### Analytics client

Provides the existing `sendGAEvent` interface where practical. It checks consent, normalizes values, and sends only the shared event contract. It does not load `gtag.js`.

### Event Route Handler

Acts as the enforcement boundary. It rejects requests without valid consent and maps accepted events to GA4. It never trusts the client-side consent state or arbitrary event fields.

### Shared event contract

Defines event names, allowed parameter names, types, lengths, and enumerated values. Both client and server use the contract, but the server performs authoritative validation.

## Allowed Data

| Event                   | Allowed parameters                  |
| ----------------------- | ----------------------------------- |
| `page_view`             | normalized path, locale             |
| `navigate`              | approved internal destination       |
| `download_cv`           | document locale                     |
| `click_social`          | known platform identifier           |
| `view_project`          | known project identifier            |
| `click_project_link`    | known project identifier, link type |
| `select_skill_category` | known category identifier           |

Free-form text, names, email addresses, form values, full URLs, query strings, URL fragments, cookies, headers, and arbitrary metadata are rejected. Parameter length and event batch size are bounded.

## Failure Handling

- Telemetry is non-blocking and never controls page behavior.
- Invalid or unauthorized requests receive a non-success response and are not forwarded.
- Missing server secrets return a service-unavailable response without logging the event body.
- GA4 failures are not shown to visitors and are not retried indefinitely.
- The sender may use `sendBeacon` for unload-safe delivery with a bounded `fetch` fallback.
- The production endpoint uses infrastructure-level request limits; application validation remains mandatory because serverless in-memory rate limits are not globally reliable.
- Operational logs contain status and failure category only, not analytics payloads.

Google notes that the Measurement Protocol can return a successful HTTP response even for malformed payloads. Automated validation therefore uses Google's validation endpoint or strict local contract tests rather than relying only on production response codes.

## Configuration

Required production variables:

- `GA_MEASUREMENT_ID`
- `GA_API_SECRET`
- `CONSENT_SECRET`
- existing Sentry DSN variables or current project configuration

Secrets must remain server-only and must not use the `NEXT_PUBLIC_` prefix. Deployment documentation must explain creation, rotation, preview-environment behavior, and failure behavior.

## Verification

### Unit tests

- consent serialization, signing, verification, expiry, and version invalidation;
- default-denied state, GPC/DNT handling, acceptance, rejection, and revocation;
- every permitted event and parameter combination;
- rejection of unknown events, excess fields, oversized values, PII-like fields, and malformed bodies;
- client sender does nothing without consent;
- Sentry sanitization and consent gating.

### Integration tests

- consent endpoint cookie behavior;
- event endpoint rejects missing or invalid consent;
- valid events map to the expected GA4 request without forwarding visitor headers;
- missing secrets and upstream failures degrade safely.

### End-to-end tests

- no analytics or browser Sentry request occurs before a decision;
- reject keeps collection disabled;
- accept enables only selected categories;
- revocation stops requests and removes identifiers;
- preferences and banner work in both locales and meet existing accessibility checks;
- page navigation and portfolio interactions continue to work during telemetry failure.

The final verification runs lint, unit tests, end-to-end tests, and a production build.

## Retention and Governance

- The privacy notice must describe purposes, event categories, providers, revocation, and retention.
- GA4 and Sentry retention must be set to the shortest period that serves the portfolio's stated purpose and documented outside code.
- Adding marketing later requires a separate design review, preference category activation, vendor assessment, updated notice, and dedicated tests.
- This engineering design reduces data collection but is not a substitute for jurisdiction-specific legal review.

## Decisions

- Use a custom, first-party banner rather than an external CMP.
- Require explicit, granular consent.
- Use a same-origin Next.js gateway and GA4 Measurement Protocol.
- Keep analytics and diagnostics separate.
- Preserve marketing only as a disabled future category.
- Do not use fingerprinting, payload obfuscation, or collection after refusal.

## Hypotheses to Validate During Implementation

- The Vercel deployment supports the required server-side outbound request latency and request limits without material cost.
- The existing GA4 property accepts Measurement Protocol events once its API secret is configured.
- Existing Sentry initialization hooks can enforce consent without losing required server-side diagnostics.

## Next Action

After approval of this written specification, create an implementation plan that sequences consent foundations, event transport, Sentry hardening, interface work, tests, and deployment configuration.

## Primary References

- [Google Analytics Measurement Protocol reference](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference)
- [Sentry JavaScript configuration options](https://docs.sentry.io/platforms/javascript/configuration/options/)
- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Global Privacy Control specification](https://privacycg.github.io/gpc-spec/)
