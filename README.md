# Bruno Costa | Portfolio

Personal portfolio showcasing my work as a Full-Stack Developer.

**Live:** [brunocandia.com](https://brunocandia.com)

---

## About This Project

This portfolio was designed and developed to demonstrate my technical skills and approach to software engineering. It serves as a practical example of how I structure applications, handle state, implement testing strategies, and maintain code quality.

### Technical Highlights

| Area              | Implementation                                                                |
| ----------------- | ----------------------------------------------------------------------------- |
| **Architecture**  | Feature-Based Architecture with MVVM pattern                                  |
| **Framework**     | Next.js 16 with App Router                                                    |
| **Type Safety**   | Full TypeScript coverage                                                      |
| **Styling**       | Tailwind CSS 4 with custom design tokens                                      |
| **Animations**    | GSAP + ScrollTrigger for scroll-driven effects                                |
| **i18n**          | next-intl supporting English and Portuguese                                   |
| **Testing**       | Unit tests (Vitest), E2E tests (Playwright), A11y validation (axe-playwright) |
| **Accessibility** | WCAG 2.1 AA compliant                                                         |
| **CI/CD**         | GitHub Actions with pre-push hooks                                            |

---

## Project Structure

The codebase follows a feature-based architecture where each section of the application is self-contained:

```
src/
├── app/                    # Next.js App Router (routes, layouts)
├── components/             # Shared UI components (Atomic Design)
│   ├── atoms/              # Basic elements
│   └── molecules/          # Composed components
├── features/               # Feature modules
│   ├── hero/               # Hero section
│   ├── about/              # About section
│   ├── skills/             # Interactive skills terminal
│   ├── works/              # Projects showcase
│   ├── experience/         # Work history
│   ├── header/             # Navigation
│   └── footer/             # Footer
├── lib/                    # Utilities and helpers
└── messages/               # i18n translations
```

Each feature contains:

- `components/` — Presentational components
- `hooks/` — ViewModel hooks (business logic)
- `data/` — Static data and types

---

## Development

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npx vitest run       # Run unit tests
npx playwright test  # Run E2E tests
```

### Consent-first telemetry

Optional analytics and browser diagnostics are disabled until the visitor
chooses them in the first-party privacy banner. Browser events are sent to a
same-origin Next.js route, validated against a strict allowlist, and then
forwarded server-to-server to GA4. The browser never receives the GA4 API
secret.

Production requires these environment variables:

| Variable                 | Purpose                                                         |
| ------------------------ | --------------------------------------------------------------- |
| `GA_MEASUREMENT_ID`      | GA4 web stream measurement ID                                   |
| `GA_API_SECRET`          | GA4 Measurement Protocol secret                                 |
| `CONSENT_SECRET`         | Random value of at least 32 bytes for consent-cookie signatures |
| `NEXT_PUBLIC_SENTRY_DSN` | Public Sentry DSN; events remain consent-gated and sanitized    |

Create the GA4 API secret under **Admin > Data Streams > Measurement
Protocol**. Configure event-level retention to the shortest available period
(two months for a standard GA4 property) and disable advertising features.
Configure the shortest Sentry retention supported by the active plan. Rotate
`GA_API_SECRET` and `CONSENT_SECRET` if either value is exposed.

The application intentionally does not collect advertising identifiers,
fingerprints, form values, full URLs, query strings, visitor IP addresses, or
User-Agent values in its analytics payload.

---

## Quality Assurance

This project includes:

- **Unit Tests** — Component and hook testing with Vitest
- **E2E Tests** — Full user flow testing with Playwright
- **Accessibility Tests** — Automated WCAG validation with axe-playwright
- **Pre-push Hooks** — Tests run automatically before each push
- **CI Pipeline** — GitHub Actions validates every commit

---

## Contact

- **Portfolio:** [brunocandia.com](https://brunocandia.com)
- **LinkedIn:** [linkedin.com/in/bruno-candia](https://www.linkedin.com/in/bruno-candia)
- **GitHub:** [github.com/bruno-candia](https://github.com/bruno-candia)
