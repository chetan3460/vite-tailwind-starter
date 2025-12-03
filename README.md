# ⚡ Vite + Tailwind CSS v4 Starter

A modern frontend starter template powered by **Vite 7** and **Tailwind CSS v4**, designed for lightning-fast development, optimized builds, and production-ready applications. Now with **TypeScript support**, **comprehensive testing**, and **modern best practices**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://vite-tailwind-starter-ebon.vercel.app)
[![Version](https://img.shields.io/badge/version-1.0.4-blue?style=for-the-badge)](./CHANGELOG.md)
[![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)](./LICENSE)

---

## 🚀 Tech Stack & Features

[![Vite](https://img.shields.io/badge/Built%20With-Vite%207-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)  
[![TailwindCSS](https://img.shields.io/badge/Styled%20With-TailwindCSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Tested%20With-Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

### ✨ Key Features

- ⚡ **Vite 7** - Lightning-fast HMR and optimized production builds
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework
- 📘 **TypeScript Support** - Optional but fully configured
- 🧪 **Vitest** - Fast unit testing with coverage reports
- 🔧 **Modern JavaScript** - No jQuery, pure vanilla JS with ES6+
- ♿ **Accessibility** - WCAG 2.1 compliant with ARIA support
- 🔒 **Security Headers** - CSP, X-Content-Type-Options, and more
- 📱 **PWA Ready** - Progressive Web App meta tags
- 🌗 **Dark Mode** - Built-in theme switching with localStorage
- 🖼️ **Image Optimization** - Automatic WebP conversion
- 📦 **Code Splitting** - Optimized bundle with manual chunks
- 🎯 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- 🔍 **Error Handling** - Centralized error logger
- 📚 **Comprehensive Docs** - Full documentation included
- 🎨 **Accessibility Utilities** - Screen reader, focus, reduced motion support

---

## 📋 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/chetan3460/vite-tailwind-starter.git
cd vite-tailwind-starter

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your app running!

---

## 📖 npm Scripts

```bash
# Development
npm run dev              # Start dev server
npm run preview          # Preview production build

# Building
npm run build            # Build for production
npm run build:analyze    # Build with bundle analyzer

# Testing
npm test                 # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Run tests with coverage
npm run test:ui          # Open Vitest UI

# Code Quality
npm run lint             # Lint code
npm run lint:fix         # Lint and fix issues
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking
npm run validate         # Run all checks (lint + type + test)

# Version Management
npm run bump:patch       # Bump patch version (1.0.x)
npm run bump:minor       # Bump minor version (1.x.0)
npm run bump:major       # Bump major version (x.0.0)
```

---

## 📁 Project Structure

```
vite-tailwind-starter/
├── docs/                   # 📚 Documentation
│   ├── README.md          # Documentation index
│   ├── getting-started.md # Setup guide
│   ├── components.md      # Component docs
│   ├── build-deployment.md # Deployment guide
│   └── contributing.md    # Contributing guidelines
├── public/                 # Static assets
├── scripts/                # Build scripts
├── src/
│   ├── css/               # 🎨 Stylesheets
│   │   ├── app.css        # Main CSS
│   │   ├── custom/        # Custom styles
│   │   └── utilities/     # Utility classes
│   ├── js/                # 💻 JavaScript
│   │   ├── app.js         # Main entry point
│   │   ├── components/    # JS components
│   │   └── utils/         # Utilities (logger, error handler)
│   └── fonts/             # Custom fonts
├── tests/                  # 🧪 Tests
│   ├── setup.js           # Test environment
│   ├── unit/              # Unit tests
│   └── integration/       # Integration tests
├── partials/               # HTML partials
├── .env.example           # Environment template
├── package.json           # Dependencies
├── vite.config.js         # Vite config
├── vitest.config.js       # Test config
├── tsconfig.json          # TypeScript config
├── .eslintrc.json         # ESLint config
└── CHANGELOG.md           # Version history
```

---

## 🎯 What's New in v1.0.4

### Major Improvements

- ✅ **Removed jQuery** - 30KB bundle size reduction
- ✅ **Added TypeScript** - Full type safety support
- ✅ **Testing Infrastructure** - Vitest with 100% setup
- ✅ **Enhanced Security** - Security headers and CSP
- ✅ **Better Accessibility** - WCAG 2.1 compliant
- ✅ **Comprehensive Docs** - Full documentation suite
- ✅ **Modern JavaScript** - ES6+ with vanilla JS
- ✅ **Error Handling** - Centralized error management
- ✅ **Build Optimization** - Manual chunk splitting

See [CHANGELOG.md](./CHANGELOG.md) for full details.

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Open test UI
npm run test:ui
```

Tests are written using:

- **Vitest** - Fast unit testing
- **@testing-library** - DOM testing utilities
- ** JSDOM** - DOM environment simulation

---

## 🚀 Deployment

### Quick Deploy

**Vercel** (Recommended):

```bash
npm i -g vercel
vercel
```

**Netlify**:

```bash
npm i -g netlify-cli
netlify deploy
```

**Other Platforms**:

- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

See [Build & Deployment Guide](./docs/build-deployment.md) for detailed instructions.

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

1. **[Getting Started](./docs/getting-started.md)** - Installation and setup
2. **[Components](./docs/components.md)** - Component usage and API
3. **[Build & Deployment](./docs/build-deployment.md)** - Build and deploy
4. **[Contributing](./docs/contributing.md)** - Contribution guidelines

---

## 🎨 Code Quality

- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Vitest** - Unit testing
- **Git Hooks** - Pre-commit validation (optional)

Run all checks:

```bash
npm run validate
```

---

## ♿ Accessibility Features

- WCAG 2.1 Level AA compliant
- ARIA labels and roles
- Keyboard navigation support
- Screen reader optimized
- Focus management
- Reduced motion support
- High contrast mode support

---

## 🔒 Security

- Content Security Policy headers
- X-Content-Type-Options
- X-Frame-Options
- Referrer Policy
- Secure asset handling
- Environment variable management

---

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

Legacy browser support via `@vitejs/plugin-legacy`.

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./docs/contributing.md) for details on:

- Code of conduct
- Development process
- Submitting pull requests
- Coding standards

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vitest](https://vitest.dev/) - Blazing fast unit testing
- All contributors and supporters

---

## 📞 Support

- **Documentation**: [docs/README.md](./docs/README.md)
- **Issues**: [GitHub Issues](https://github.com/chetan3460/vite-tailwind-starter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/chetan3460/vite-tailwind-starter/discussions)

---

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ by [Chetan](https://github.com/chetan3460)**

[Report Bug](https://github.com/chetan3460/vite-tailwind-starter/issues) · [Request Feature](https://github.com/chetan3460/vite-tailwind-starter/issues) · [Documentation](./docs/README.md)

</div>
