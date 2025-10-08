# 👨‍💻 Portfolio - Bruno Candia

Personal portfolio of Bruno Candia, Software Engineer. A modern and creative project built with React, TypeScript, and Vite, featuring a unique interface with hand-drawn elements and interactive components.

## ✨ Features

- 🎨 **Unique Design**: Interface with hand-drawn elements using RoughJS
- 📱 **Responsive**: Developed in mobile first
- ⚡ **High Performance**: Optimized with React 19 and Vite
- 🎯 **Atomic Design**: Organized and scalable component architecture
- ♿ **Accessible**: Following accessibility best practices

## 🛠️ Technologies

- **React 19** - UI library
- **TypeScript** - JavaScript with static typing
- **Vite** - Modern and fast build tool
- **RoughJS** - Library for hand-drawn graphics
- **ESLint** - Code quality linter
- **Vercel Speed Insights** - Performance monitoring

## 📂 Project Structure

```
src/
├── assets/              # Images, SVGs and static resources
├── components/
│   ├── atoms/          # Basic and reusable components
│   ├── molecules/      # Composed components
│   └── organism/       # Complex components
├── styles/             # Global styles
├── routes.ts           # Routes/anchors configuration
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 22 or higher)
- npm, yarn or pnpm

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Enter the directory
cd portfolio

# Install dependencies
yarn install
# or
npm install
```

### Development

```bash
# Start development server on port 3000
yarn dev
# or
npm run dev
```

The project will automatically open in the browser at `http://localhost:3000`

### Build

```bash
# Create optimized production version
yarn build
# or
npm run build
```

Optimized files will be generated in the `build/` folder

### Preview

```bash
# Preview production build locally
yarn preview
# or
npm run preview
```

## 📋 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Generate production build
- `yarn preview` - Preview production build
- `yarn lint` - Run linter (max 0 warnings)

## 🎨 Key Components

### RoughButton
Custom button with hand-drawn appearance, created with RoughJS. Features hover animations, customizable seeds for visual variation, and full accessibility support.

### SidebarMenuMobile
Responsive sidebar menu with smooth animations, ESC key support for closing, scroll prevention when open, and astronaut illustration.

### Header
Main navigation header integrating the logo and mobile menu system.

### Hero
Landing section featuring personal presentation, professional title, inspirational quote, and call-to-action button.

## 🔧 Configuration

The project uses path aliases configured in `vite.config.ts`:
- `@/` points to `./src/`

## 📄 License

This is a personal portfolio project.

---

Developed with 💙 by Bruno Candia



Vou usar
2. O botão do `Hero` deve baixar o seu currículo (CV) em PDF? Se sim, você pretende colocá-lo em `public/` (ex.: `/cv.pdf`)?
3. Prefere consolidar o `hangloose.svg` (logo) em um único local ou manter versões separadas para favicon e logo do app?
4. Deseja trazer os logos das empresas para o projeto (em `src/assets`/`public`) para evitar hotlink externo?
5. Posso padronizar o diretório para `components/organisms/` e ajustar os imports?
6. O efeito de papel pautado deve ser global (no `body`) ou confinado às seções específicas? Posso centralizar isso num único lugar.
7. Posso substituir os ids duplicados em `FoldingPaper` por classes e ajustar os seletores para manter o efeito?
