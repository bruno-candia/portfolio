# Portfolio

> **A professional portfolio built with pure TypeScript and vanilla CSS.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](./LICENSE)

---

## About

This portfolio is intentionally built **without frameworks or libraries** like React, Angular, or Vue. The goal is to demonstrate deep understanding of:

- **Pure TypeScript** — Classes, modules, generics, and type safety without framework or library abstractions
- **Vanilla CSS** — Custom properties, modern layout (Grid/Flexbox), and scalable architecture
- **Web fundamentals** — DOM manipulation, event handling, and browser APIs
- **Software engineering principles** — SOLID, DRY, separation of concerns, and clean architecture

### Why Vanilla?

| Framework Approach          | Vanilla Approach            |
| --------------------------- | --------------------------- |
| Abstracts the DOM           | Direct DOM understanding    |
| Magic behind the scenes     | Full control and visibility |
| Dependency on ecosystem     | Zero runtime dependencies   |
| Framework-specific patterns | Transferable knowledge      |

---

## Architecture

### Design Principles

- **Component-based** — UI split into reusable, self-contained components
- **Data-driven** — Content separated from presentation (JSON data files)
- **Type-safe** — Full TypeScript coverage with strict mode
- **Scalable CSS** — ITCSS architecture with CSS Custom Properties

### Project Structure

```
portfolio/
│
├── public/                      # Static assets (copied to dist)
│   ├── assets/
│   │   ├── fonts/               # Web fonts (.woff2)
│   │   ├── images/              # Optimized images
│   │   └── documents/           # Downloadable files (resume, etc.)
│   ├── favicon.ico
│   ├── manifest.json            # PWA manifest
│   └── robots.txt               # SEO crawlers config
│
├── src/
│   ├── css/                     # Stylesheets (ITCSS Architecture)
│   │   ├── base/                # Foundation layer
│   │   │   ├── _reset.css       # Modern CSS reset
│   │   │   ├── _variables.css   # Design tokens (colors, spacing, etc.)
│   │   │   └── _typography.css  # @font-face declarations
│   │   ├── layout/              # Structural patterns
│   │   │   ├── _container.css   # Container system
│   │   │   └── _grid.css        # Grid utilities
│   │   ├── components/          # UI component styles
│   │   │   ├── _header.css
│   │   │   ├── _hero.css
│   │   │   └── ...
│   │   ├── utilities/           # Helper classes
│   │   │   ├── _animations.css  # Keyframes and transitions
│   │   │   └── _helpers.css     # Utility classes
│   │   └── main.css             # Entry point (imports all)
│   │
│   ├── ts/                      # TypeScript source
│   │   ├── core/                # Application core
│   │   │   ├── App.ts           # Main application class
│   │   │   ├── Component.ts     # Base component class
│   │   │   ├── EventBus.ts      # Pub/sub event system
│   │   │   └── utils.ts         # Pure utility functions
│   │   ├── components/          # UI components
│   │   │   ├── Header.ts
│   │   │   ├── Hero.ts
│   │   │   ├── Skills.ts
│   │   │   ├── Projects.ts
│   │   │   ├── Experience.ts
│   │   │   ├── Certifications.ts
│   │   │   ├── Contact.ts
│   │   │   └── Footer.ts
│   │   ├── services/            # Business logic layer
│   │   │   ├── DataService.ts   # Data fetching and caching
│   │   │   ├── AnalyticsService.ts
│   │   │   └── ThemeService.ts
│   │   ├── config/              # Configuration
│   │   │   └── constants.ts     # App-wide constants
│   │   └── main.ts              # Application entry point
│   │
│   ├── types/                   # TypeScript definitions
│   │   ├── project.ts           # Project interface
│   │   ├── experience.ts        # Experience interface
│   │   ├── skill.ts             # Skill interface
│   │   └── index.d.ts           # Type re-exports
│   │
│   └── data/                    # Content data (JSON)
│       ├── profile.json         # Personal info
│       ├── projects.json        # Portfolio projects
│       ├── experience.json      # Work history
│       ├── skills.json          # Technical skills
│       └── certifications.json  # Certifications
│
├── index.html                   # HTML entry point
├── 404.html                     # Custom 404 page
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── vercel.json                  # Deployment configuration
└── package.json                 # Dependencies and scripts
```

---

## Tech Stack

| Category       | Technology      | Purpose                               |
| -------------- | --------------- | ------------------------------------- |
| **Language**   | TypeScript 5.9  | Type-safe JavaScript                  |
| **Build Tool** | Vite (Rolldown) | Fast dev server & optimized builds    |
| **Styling**    | Vanilla CSS     | Custom properties, ITCSS architecture |
| **Deployment** | Vercel          | Serverless hosting with edge network  |

### CSS Architecture (ITCSS)

```
Specificity ▲
            │
┌───────────┴───────────┐
│      Utilities        │  → Overrides, helpers
├───────────────────────┤
│      Components       │  → UI-specific styles
├───────────────────────┤
│       Layout          │  → Structural patterns
├───────────────────────┤
│        Base           │  → Reset, variables, typography
└───────────────────────┘
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 22.x
- **npm** >= 10.x (or pnpm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/bruno-candia/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Script              | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start dev server at `localhost:3000` with HMR |
| `npm run build`     | Type-check and build for production           |
| `npm run preview`   | Preview production build locally              |
| `npm run typecheck` | Run TypeScript compiler (no emit)             |

---

## Code Standards

### TypeScript

- **Strict mode** enabled with additional checks
- **No `any`** — Use `unknown` or proper typing
- **Explicit return types** on public methods
- **Interface over type** for object shapes
- **Readonly** where mutation is not needed

### CSS

- **CSS Custom Properties** for all design tokens
- **BEM-inspired** naming for components
- **No magic numbers** — Use variables
- **Mobile-first** responsive approach

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add hero section with animations
fix: resolve mobile navigation overflow
docs: update README with architecture details
style: format CSS with consistent spacing
refactor: extract base component class
```

---

## License

This project is **proprietary** and source-available for educational purposes only.

- ✅ View and study the code
- ✅ Reference for learning
- ❌ Copy code or design
- ❌ Commercial use
- ❌ Redistribution

See [LICENSE](./LICENSE) for full terms.

---

## Contact

For licensing inquiries or collaboration opportunities, reach out via the contact form on the live site.

---

<div align="center">

**Built with 💜 by Bruno Candia**

</div>
