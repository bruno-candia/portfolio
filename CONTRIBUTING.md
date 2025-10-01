# Contributing Guide

Thank you for your interest in contributing to this project! 🎉

## 📋 How to Contribute

### 1. Environment Setup

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
yarn install

# Start development server
yarn dev
```

### 2. Code Standards

This project follows established standards to maintain code quality and consistency:

#### Component Structure

We follow the **Atomic Design** pattern:

- **Atoms**: Basic and indivisible components (buttons, inputs, etc.)
- **Molecules**: Combination of atoms (navigation, cards, etc.)
- **Organisms**: Complex components (header, hero, sidebar, etc.)

#### File Organization

```
ComponentName/
├── index.tsx      # Component code
├── style.css      # Specific styles
└── (optional) types.ts
```

#### Naming Conventions

- **Components**: PascalCase (e.g., `RoughButton`, `MobileNavigation`)
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Classes**: BEM notation (e.g., `component__element--modifier`)
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

### 3. Commits

Use clear and descriptive commit messages:

```bash
# ✅ Good
git commit -m "feat: add project card component"
git commit -m "fix: correct spacing in mobile menu"
git commit -m "docs: update README with new instructions"

# ❌ Avoid
git commit -m "changes"
git commit -m "fix"
```

Suggested prefixes:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, no code change
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

### 4. Before Pushing

```bash
# Run the linter
yarn lint

# Check if the build works
yarn build
```

### 5. Pull Requests

1. Create a descriptive branch:

   ```bash
   git checkout -b feat/feature-name
   ```

2. Make your changes and commits

3. Push to the repository:

   ```bash
   git push origin feat/feature-name
   ```

4. Open a Pull Request with:
   - Clear and descriptive title
   - Description of what was changed and why
   - Screenshots (if applicable)

## 🎨 Style and Design

- Keep design consistent with the rest of the application
- Use existing CSS variables for colors and spacing
- Test on different screen sizes (mobile, tablet, desktop)
- Ensure accessibility (ARIA labels, contrast, keyboard navigation)

## 🐛 Reporting Bugs

When reporting bugs, include:

1. Clear description of the problem
2. Steps to reproduce
3. Expected vs. actual behavior
4. Screenshots (if applicable)
5. Environment (browser, operating system, etc.)

## 💡 Suggesting Improvements

Suggestions are always welcome! When proposing improvements:

1. Describe the problem the improvement solves
2. Explain your proposed solution
3. Consider alternatives
4. Think about the impact on other users

## ⚠️ Important Notes

- Don't modify configuration files without discussing first
- Keep dependencies updated when necessary
- Document complex functions and components
- Write clean and maintainable code

## 📞 Contact

If you have questions, don't hesitate to open an issue or get in touch!

---

Thank you for contributing! 🚀
