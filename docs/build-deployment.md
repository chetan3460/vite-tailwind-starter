# Build & Deployment Guide

This guide covers building your application for production and deploying it to various platforms.

## Building for Production

### Basic Build

```bash
npm run build
```

This command:

1. Cleans the `dist` directory
2. Generates version file
3. Runs Vite build process
4. Optimizes and minifies code
5. Converts images to WebP format
6. Copies optimized assets

### Build Output

```
dist/
├── index.html
├── css/
│   └── app-min-v1.0.4.css
├── js/
│   ├── index_html-min-v1.0.4.js
│   ├── vendor-min-v1.0.4.js
│   ├── swiper-min-v1.0.4.js
│   └── gsap-min-v1.0.4.js
├── images/
│   └── *.webp
├── fonts/
└── assets/
```

### Build Analysis

Analyze your bundle size:

```bash
npm run build:analyze
```

This generates a `stats.html` file showing:

- Bundle composition
- Package sizes
- Dependency tree
- Duplicate dependencies

## Environment Configuration

### Environment Variables

Create environment-specific files:

```bash
.env                # Default environment
.env.local          # Local overrides (not committed)
.env.production     # Production environment
.env.development    # Development environment
```

**Example `.env.production`**:

```env
VITE_APP_ENV=production
VITE_API_URL=https://api.production.com
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
VITE_BUILD_SOURCEMAP=false
```

### Accessing Environment Variables

In your code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;
```

## Deployment Platforms

### Vercel

**Option 1: Automatic Deployment (Recommended)**

1. Push your code to GitHub
2. Connect repository to Vercel
3. Vercel automatically detects Vite and builds

**Option 2: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Build Settings**:

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Netlify

**Automatic Deployment**:

1. Connect GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

**Netlify CLI**:

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**`netlify.toml`** configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### GitHub Pages

**Option 1: GitHub Actions**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

**Option 2: Manual Deployment**

```bash
# Build
npm run build

# Install gh-pages
npm i -D gh-pages

# Deploy
npx gh-pages -d dist
```

Update `vite.config.js`:

```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
});
```

### Cloudflare Pages

```bash
# Install Wrangler
npm i -g wrangler

# Deploy
wrangler pages publish dist
```

Or use Cloudflare's automatic GitHub integration.

### AWS S3 + CloudFront

**1. Build the application**:

```bash
npm run build
```

**2. Create S3 bucket** and enable static website hosting

**3. Upload files**:

```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

**4. Invalidate CloudFront** (if using):

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

## Performance Optimization

### Code Splitting

Code is automatically split into chunks:

- `index_html.js` - Page-specific code
- `vendor.js` - Third-party dependencies
- `swiper.js` - Swiper library (if used)
- `gsap.js` - GSAP library (if used)

### Image Optimization

Images are automatically converted to WebP format during build:

```bash
# Manual image optimization
npm run optimize:images
```

### Asset Compression

Gzip compression is enabled by default via `vite-plugin-compression`.

Response sizes:

- CSS: ~15-30KB (gzipped)
- JS (main): ~20-40KB (gzipped)
- JS (vendor): ~50-100KB (gzipped)

### Performance Budget

Recommended budgets:

- Total JS: < 200KB (gzipped)
- Total CSS: < 50KB (gzipped)
- Largest Contentful Paint: < 2.5s
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1

Monitor with Lighthouse or WebPageTest.

## CI/CD Best Practices

### Pre-deployment Checks

Create a validation script:

```bash
#!/bin/bash
set -e

echo "Running validations..."

# Lint
npm run lint

# Type check
npm run type-check

# Tests
npm run test:run

# Build
npm run build

echo "✅ All checks passed!"
```

Add to `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run validate"
  }
}
```

### Environment-specific Builds

```bash
# Development build
npm run build -- --mode development

# Staging build
npm run build -- --mode staging

# Production build
npm run build -- --mode production
```

## Troubleshooting

### Build Fails

**Clear cache and reinstall**:

```bash
rm -rf node_modules package-lock.json dist .vite
npm install
npm run build
```

### Large Bundle Size

1. Analyze the bundle:

   ```bash
   npm run build:analyze
   ```

2. Check for:
   - Duplicate dependencies
   - Unused imports
   - Large libraries that can be replaced

3. Use dynamic imports for heavy components:
   ```javascript
   const HeavyComponent = await import('./HeavyComponent');
   ```

### Deployment Issues

**404 on Routes**:

Configure server for SPA routing:

**Netlify**: Add `_redirects` file:

```
/* /index.html 200
```

**Vercel**: Add `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Monitoring & Analytics

### Add Analytics

1. Update `.env.production`:

   ```env
   VITE_ENABLE_ANALYTICS=true
   VITE_ANALYTICS_ID=your-analytics-id
   ```

2. Add analytics code:
   ```javascript
   if (import.meta.env.VITE_ENABLE_ANALYTICS) {
     // Initialize analytics
   }
   ```

### Error Tracking

Integrate with Sentry or similar:

```javascript
// src/js/utils/errorHandler.js
if (import.meta.env.PROD && import.meta.env.VITE_ENABLE_ERROR_TRACKING) {
  // Initialize error tracking
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
  });
}
```

## Post-deployment Checklist

- [ ] Test all pages and functionality
- [ ] Verify all links work
- [ ] Check responsive design on multiple devices
- [ ] Run Lighthouse audit (score > 90)
- [ ] Verify analytics tracking
- [ ] Test error tracking
- [ ] Check SEO meta tags
- [ ] Validate accessibility (WAVE, axe)
- [ ] Test dark mode switching
- [ ] Verify image lazy loading
- [ ] Check console for errors

## Next Steps

- Monitor performance with [Web Vitals](https://web.dev/vitals/)
- Set up [automated testing](./testing-guide.md) in CI/CD
- Configure [error monitoring](https://sentry.io)
- Implement [analytics](https://analytics.google.com)
