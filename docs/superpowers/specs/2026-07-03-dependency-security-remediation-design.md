# Dependency Security Remediation Design

## Objective

Reduce the current npm audit result from 21 vulnerabilities to zero without accepting silent breaking changes or using fragile dependency overrides as the default solution.

## Current Findings

The baseline `npm audit` result reports:

- 1 critical vulnerability;
- 6 high vulnerabilities;
- 13 moderate vulnerabilities;
- 1 low vulnerability.

Directly affected dependency groups include Next.js, next-intl, Sentry, and Vitest. Transitive findings include Vite, PostCSS, OpenTelemetry, ws, picomatch, YAML parsers, UUID, and build-tool dependencies.

The critical Vitest advisory affects development tooling. The Next.js findings include production-impacting denial-of-service, middleware/proxy bypass, cache, XSS, and SSRF advisories. Development-only findings remain in scope because the agreed success criterion is a zero-vulnerability audit across the complete dependency tree.

## Strategy

Use explicit, compatible upgrades for direct dependencies first, followed by the narrowest npm-supported remediation for remaining transitive dependencies.

Target versions:

- `next`, `@next/third-parties`, and `eslint-config-next`: `16.2.10`;
- `@sentry/nextjs`: `10.63.0`;
- `next-intl`: `4.13.1`;
- `vitest`: `4.1.9`;
- compatible Vite and related transitive versions selected by npm.

These targets stay within the current major versions. The Next.js packages are aligned to prevent framework/tooling version skew.

## Constraints

- Do not use `npm audit fix --force`.
- Do not accept direct dependency major upgrades without a new decision.
- Do not add `overrides` unless a residual vulnerability cannot be solved through supported direct dependency ranges.
- Do not suppress or ignore advisories to reach a nominal zero count.
- Keep application behavior and public interfaces unchanged.
- Preserve the existing Node.js 22 CI environment.

## Execution Flow

1. Capture the clean Git state and baseline audit result.
2. Update the direct dependency groups to the target versions.
3. Regenerate `package-lock.json` using npm.
4. Run `npm audit` again.
5. If supported transitive fixes remain, apply `npm audit fix` without `--force` and inspect every manifest and lockfile change.
6. Stop for a new decision if npm proposes a major downgrade, major upgrade, or incompatible peer dependency.
7. Verify the full project.

## Verification

The remediation is complete only when all of the following pass:

- `npm audit` reports zero vulnerabilities;
- `npm ls` reports no invalid or unmet dependencies;
- TypeScript compilation;
- ESLint;
- all unit and integration tests;
- all configured Playwright projects;
- production Next.js build;
- Terraform formatting and validation.

The application must retain working internationalization, consent-first telemetry, Sentry sanitization, routing, accessibility, and responsive behavior.

## Failure and Rollback

- If installation fails, retain the existing manifest and lockfile and diagnose the peer conflict before retrying.
- If a direct upgrade breaks application code, make only the migration changes required by the dependency's documented API change.
- If tests reveal behavior changes, do not weaken tests to make the upgrade pass unless the old assertion is demonstrably obsolete.
- If zero vulnerabilities requires an unsupported override or a major upgrade, stop and present the trade-off for approval.

## Decisions

- Remediate production and development dependencies.
- Require a zero-vulnerability npm audit.
- Prefer explicit direct upgrades over blind automated mutation.
- Permit a non-forced `npm audit fix` only for residual compatible transitive updates.
- Keep all Next.js packages version-aligned.

## Hypotheses

- The target versions preserve the current public APIs because they remain within existing major versions.
- npm can resolve all transitive advisories without an override.
- Existing automated coverage is sufficient to detect material regressions in the portfolio.

## Next Action

After approval of this written specification, produce an execution plan and apply the targeted dependency upgrades.
