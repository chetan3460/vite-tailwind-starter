# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Frontend starter using Vite and Tailwind CSS v4.
- Multi-page build (not a single-page app). All .html files under the repo become entry points and can include HTML partials.
- Runtime JS is vanilla+ESM with jQuery exposed globally, componentized behavior loaded on-demand via import.meta.glob.
- Build outputs versioned asset names and converts referenced images to WebP.

Common commands (npm)
- Install dependencies
```sh path=null start=null
npm install
```
- Start dev server
```sh path=null start=null
npm run dev
```
- Build for production (cleans, injects version, bundles, generates WebP copies, copies them to dist, and cleans originals)
```sh path=null start=null
npm run build
```
- Preview the production build locally
```sh path=null start=null
npx vite preview
```
- Clean build artifacts
```sh path=null start=null
npm run clean
```
- Bump version and build
```sh path=null start=null
npm run bump:patch
# or
npm run bump:minor
npm run bump:major
```
- Format code (Prettier)
```sh path=null start=null
npm run format
# check only
npm run format:check
# only JS
npm run format:js
# only SCSS
npm run format:scss
```
- Image/WebP utilities (normally invoked by the build)
```sh path=null start=null
npm run webp:build     # generate .webp files from public/images/*
npm run webp:copy      # copy generated .webp into dist/images
npm run webp:cleanup   # remove original jpg/png from dist/images
npm run webp:clean-tmp # remove .webp-dist temp directory
```
- Tests
```sh path=null start=null
npm test
```
Note: a test runner is not configured; the script is a placeholder.

Big-picture architecture
1) HTML pipeline (multi-page)
- Entry discovery: vite.config.js collects all HTML files (excluding node_modules, dotfiles, dist) and adds src/js/app.js as an additional entry.
- Partials: HTML files can include external fragments via <!-- @insert:partials/... --> which are inlined at build time.
- Placeholders replaced at build/dev time:
  - __STYLE_TAG__ → injects CSS link to src/css/app.css in dev or versioned css/app-min-vX.css in build.
  - __SCRIPT_TAG__ → would inject the app script if present (plugin supports it even if most pages omit it).
  - __REL_PATH__ → replaced with a relative path to project root for robust links in nested pages.
  - __APP_VERSION__ → replaced with package.json version; build also writes public/version.json.
- Image rewrites: in built HTML, <img src="...png|jpg"> is rewritten to .webp; the build then generates and copies matching .webp files from public/images.

2) CSS/Tailwind
- Tailwind v4 via PostCSS: postcss.config.cjs enables '@tailwindcss/postcss' and autoprefixer.
- CSS entry: src/css/app.css imports custom CSS and 'tailwindcss', defines the theme via @theme, and sets a custom dark mode variant.
- Dark mode is class-based using .dark on <html>.

3) JavaScript runtime
- Entry: src/js/app.js
  - Loads jQuery (src/js/helpers/jquery.js exposes window.$ / window.jQuery), feather-icons, and src/css/app.css.
  - On DOM ready: binds events, initializes feature modules, toggles dark mode, sets page-specific body classes, and provides an Accordion utility.
- Component loading: src/js/components/* modules are lazy-loaded by src/js/components/DynamicImports.js using import.meta.glob.
  - The componentList (src/js/componentList.js) maps DOM selectors to component class names and options. When a matching element is found (and optional mobile constraints pass), the component module is imported and instantiated once.
- Notable components in this repo include Header (nav, submenu, active state) and SliderBlock (Swiper-based carousel with responsive settings and optional thumbs).

4) Assets and versioning
- Images live under public/images and are referenced in HTML using __REL_PATH__/images/... (png/jpg). During build, HTML references are changed to .webp and matching WebP assets are produced and copied into dist/images.
- Built JS/CSS filenames include the current package version (e.g., -v1.0.4) for cache-busting.

Conventions and how to extend
- New page: create a .html file anywhere in the repo. To align with the build pipeline:
  - Include <!-- @insert:partials/meta.html --> in <head> for shared meta.
  - Add <!-- __STYLE_TAG__ --> where the CSS link should appear.
  - Use __REL_PATH__ for asset and link prefixes, especially for nested pages.
  - Optionally include <!-- @insert:partials/header.html --> and <!-- @insert:partials/footer.html -->.
- New component behavior: add a file under src/js/components/MyFeature.js exporting a default class, then add an entry to src/js/componentList.js like { selector: '.my-feature', className: 'MyFeature', mobile: true, config: {...} }.
- Path alias: imports can use '@/...' for files under src/.

Relevant files
- package.json → scripts and dependencies.
- vite.config.js → multi-page setup, HTML transforms, asset naming, legacy build, and plugins.
- postcss.config.cjs, src/css/app.css → Tailwind and CSS entry/theme.
- src/js/app.js, src/js/components/*, src/js/componentList.js → runtime entry and feature modules.
- public/images → source images for WebP generation.
