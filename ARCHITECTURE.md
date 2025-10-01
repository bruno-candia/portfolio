# 🏗️ Project Architecture

This document details the architecture and organization of the portfolio.

## 📐 Design Pattern: Atomic Design

The project follows the **Atomic Design** pattern, which organizes components in a hierarchy inspired by chemistry:

### Atoms

Basic and indivisible components that serve as fundamental building blocks.

**Current Implementation:**

- Logo - Site branding
- MenuToggleButton - Hamburger button for mobile menu
- NavButton - Navigation links
- RoughButton - Hand-drawn style button using RoughJS

**Characteristics:**

- No dependencies on other components
- Highly reusable
- Consistent behavior and appearance

### Molecules

Components that combine multiple atoms to form functional units.

**Current Implementation:**

- MobileNavigation - Mobile navigation menu using NavButton components
- Navigation - Desktop navigation using NavButton components

**Characteristics:**

- Combine atoms meaningfully
- Have specific functionality
- Relatively simple structure

### Organisms

Complex components that form distinct interface sections.

**Current Implementation:**

- Header - Site header integrating Logo and SidebarMenuMobile
- Hero - Hero section with personal presentation
- SidebarMenuMobile - Sidebar with navigation menu and astronaut illustration

**Characteristics:**

- Relatively complex components
- Combine molecules and atoms
- Form distinct UI sections

## 📁 Folder Structure

```
portfolio/
├── public/                 # Public static files
├── src/
│   ├── assets/            # Resources (images, SVGs, fonts)
│   ├── components/        # Components organized by Atomic Design
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organism/
│   ├── styles/            # Global styles
│   ├── routes.ts          # Routes/anchors configuration
│   ├── App.tsx            # Root application component
│   ├── App.css            # App component styles
│   ├── main.tsx           # Entry point
│   └── index.css          # Base styles
├── .vscode/               # VSCode settings
├── .editorconfig          # Editor configuration
├── .nvmrc                 # Node.js version
├── eslint.config.js       # ESLint configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Path Aliases

The project uses path aliases for cleaner imports, configured in `vite.config.ts` where `@/` points to the `./src/` directory.

### TypeScript

Strict configuration with JSX support and ES modules.

### ESLint

Linting configured with:

- TypeScript rules
- React rules
- Accessibility rules (jsx-a11y)
- React hooks rules
- Maximum 0 warnings

## 🎨 Style System

### Modular CSS

Each component has its own style file organized alongside the component logic, promoting encapsulation and maintainability.

### BEM Notation

CSS classes follow the BEM (Block Element Modifier) methodology for clear naming conventions and avoiding specificity conflicts.

### CSS Variables

Extensive use of custom properties for themes and consistency, enabling easy customization and dynamic theming.

## 🚀 Performance

### Implemented Optimizations

1. **Lazy Loading**

   - Components loaded with Suspense
   - Images with lazy loading attributes

2. **Code Splitting**

   - Build optimized by Vite
   - Automatic chunks per route

3. **Optimized Images**

   - WebP format when available
   - Priority and decoding attributes

4. **Analytics**
   - Vercel Speed Insights for monitoring

## ♿ Accessibility

### Implemented Practices

- **ARIA Labels**: Components have descriptive labels
- **Keyboard Navigation**: Full keyboard support
- **Semantic HTML**: Proper use of semantic tags
- **Tooltips**: Additional information for screen readers
- **Contrast**: Colors with adequate contrast

### Interactive Elements

All interactive elements include proper ARIA attributes, keyboard support, and clear visual feedback for different states (hover, focus, active).

## 🔄 State and Interactivity

### State Management

- **Local State**: useState for component state
- **Side Effects**: useEffect for effects and cleanup
- **Refs**: useRef for DOM references and persistent values

### Interaction Patterns

1. **Mobile Menu**

   - Open/close with smooth animations
   - Closes with ESC key
   - Prevents scroll when open
   - Traps focus within menu

2. **Navigation**

   - Smooth scroll to anchors
   - Closes menu after navigation
   - Visual feedback for active section

3. **Rough Buttons**
   - Redraws on hover for dynamic effect
   - Maintains stable seed for consistency
   - Responds to container resizing

## 📊 Monitoring

- **Vercel Speed Insights**: Production performance metrics
- **ESLint**: Code quality enforcement
- **TypeScript**: Type safety and better developer experience

## 🔮 Extensibility

The project is structured for easy extension:

1. **New Components**: Add to the appropriate category (atoms/molecules/organisms)
2. **New Sections**: Create organisms and add to App.tsx
3. **New Routes**: Add to routes.ts
4. **New Styles**: Use CSS variables for consistency

---

This architecture promotes:

- ✅ Code reusability
- ✅ Maintainability
- ✅ Testability
- ✅ Scalability
- ✅ Organizational clarity
