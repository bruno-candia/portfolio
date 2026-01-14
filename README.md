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
