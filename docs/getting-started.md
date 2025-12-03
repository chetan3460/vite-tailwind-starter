# Getting Started

This guide will help you set up and start developing with the Vite + Tailwind CSS v4 starter template.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or yarn/pnpm)
- **Git** (for version control)

Check your versions:

```bash
node --version
npm --version
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/chetan3460/vite-tailwind-starter.git
cd vite-tailwind-starter
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- Vite and build tools
- Tailwind CSS v4
- Testing libraries (Vitest, Testing Library)
- TypeScript and type definitions
- Linting and formatting tools

### 3. Environment Setup

Copy the environment example file:

```bash
cp .env.example .env
```

Edit `.env` to configure your environment variables.

## Development

### Start Development Server

```bash
npm run dev
```

This will start the Vite development server at `http://localhost:5173` (or another port if 5173 is in use).

Features:

- ⚡ Lightning-fast Hot Module Replacement (HMR)
- 🔄 Automatic browser refresh on file changes
- 🎨 Tailwind CSS with JIT compilation

### Available Scripts

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
npm run validate         # Run all checks (lint + type-check + test)

# Version Bumping
npm run bump:patch       # Bump patch version and build
npm run bump:minor       # Bump minor version and build
npm run bump:major       # Bump major version and build
```

## Project Structure

```
vite-tailwind-starter/
├── docs/                # Documentation
├── public/              # Static assets
├── scripts/             # Build scripts
├── src/
│   ├── css/            # Stylesheets
│   │   ├── app.css     # Main CSS file
│   │   ├── custom/     # Custom styles
│   │   └── utilities/  # Utility classes
│   ├── js/             # JavaScript
│   │   ├── app.js      # Main app entry
│   │   ├── components/ # JS components
│   │   └── utils/      # Utility functions
│   └── fonts/          # Custom fonts
├── tests/              # Test files
│   ├── setup.js        # Test setup
│   ├── unit/           # Unit tests
│   └── integration/    # Integration tests
├── partials/           # HTML partials
├── index.html          # Main HTML file
├── vite.config.js      # Vite configuration
├── vitest.config.js    # Vitest configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## Quick Start Guide

### 1. Create a New Page

1. Create a new HTML file in the root directory:

```html
<!-- my-page.html -->
<!DOCTYPE html>
<html lang="en" class="scroll-smooth" dir="ltr">
  <head>
    <!-- @insert:partials/meta.html -->
    <!-- __STYLE_TAG__ -->
  </head>
  <body
    class="font-nunito text-base text-slate-900 dark:text-white dark:bg-slate-900"
  >
    <!-- @insert:partials/header.html -->

    <main>
      <h1 class="text-4xl font-bold">My New Page</h1>
    </main>

    <!-- @insert:partials/footer.html -->
    <!-- __SCRIPT_TAG__ -->
  </body>
</html>
```

2. Vite will automatically pick up the new HTML file and include it in the build.

### 2. Add Custom Styles

Create a new CSS file in `src/css/custom/`:

```css
/* src/css/custom/_my-component.css */
.my-component {
  /* Your styles */
}
```

Import it in `src/css/app.css`:

```css
@import './custom/_my-component.css';
```

### 3. Create a JavaScript Component

Create a new component file in `src/js/components/`:

```javascript
// src/js/components/MyComponent.js
import logger from '../utils/logger.js';

class MyComponent {
  constructor() {
    this.init();
  }

  init() {
    logger.info('MyComponent initialized');
    // Your initialization code
  }
}

export default MyComponent;
```

Import and use it in your code:

```javascript
import MyComponent from './components/MyComponent';
new MyComponent();
```

## Next Steps

- Read the [Components Guide](./components.md) to learn about available components
- Check the [Styling Guide](./styling-guide.md) for Tailwind CSS customization
- Review the [Build & Deployment](./build-deployment.md) guide for production builds
- See [Testing Guide](./testing-guide.md) to write tests

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port. You can also specify a custom port:

```bash
npm run dev -- --port 3000
```

### Module Not Found Errors

Clear the cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Run type checking to see all errors:

```bash
npm run type-check
```

## Getting Help

- Check the [Documentation Index](./README.md)
- Search [GitHub Issues](https://github.com/chetan3460/vite-tailwind-starter/issues)
- Create a new issue with details about your problem
