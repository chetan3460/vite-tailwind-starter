import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs/promises';
import { globSync } from 'glob';
import legacy from '@vitejs/plugin-legacy';
import viteCompression from 'vite-plugin-compression';
import pkg from './package.json';
import history from 'connect-history-api-fallback';
import { visualizer } from 'rollup-plugin-visualizer';

// Inject version like __APP_VERSION__
const htmlVersionPlugin = () => {
  const version = pkg.version;
  return {
    name: 'html-version-replacement',
    transformIndexHtml(html) {
      return html.replace(/__APP_VERSION__/g, version);
    },
  };
};

const htmlScriptAndStyleInjectPlugin = () => {
  return {
    name: 'html-script-style-inject',
    transformIndexHtml(html, ctx) {
      const isBuild = ctx?.server === undefined;
      const version = pkg.version;

      let relativePath = '.';
      if (isBuild && ctx?.filename) {
        const htmlDir = path.posix.dirname(ctx.filename.replace(/\\/g, '/'));
        relativePath = path.posix.relative(htmlDir, '.');
        if (!relativePath) relativePath = '.';
      }

      const styleTag = isBuild
        ? `<link rel="stylesheet" href="${relativePath}/css/app-min-v${version}.css" />`
        : `<link rel="stylesheet" href="/src/css/app.css" />`;

      const scriptTag = isBuild
        ? `<script type="module" src="${relativePath}/js/app-min-v${version}.js"></script>`
        : `<script type="module" src="/src/js/app.js"></script>`;

      // ❌ Don’t manually inject the legacy script — let `@vitejs/plugin-legacy` do it

      return html
        .replace('<!-- __STYLE_TAG__ -->', styleTag)
        .replace('<!-- __SCRIPT_TAG__ -->', scriptTag);
    },
  };
};

// Inject HTML partials like <!-- @insert:partials/header.html -->
const htmlPartialPlugin = () => {
  return {
    name: 'vite-html-partial-plugin',
    enforce: 'pre',
    async transformIndexHtml(html, { filename }) {
      const partialPattern = /<!--\s*@insert:(.*?)\s*-->/g;

      const replaceAsync = async (str, regex, asyncFn) => {
        const promises = [];
        html.replace(regex, (match, ...args) => {
          promises.push(asyncFn(match, ...args));
          return match;
        });
        const data = await Promise.all(promises);
        return html.replace(regex, () => data.shift());
      };

      return await replaceAsync(
        html,
        partialPattern,
        async (_match, partialPath) => {
          const resolvedPath = path.resolve(process.cwd(), partialPath.trim());
          try {
            const stats = await fs.stat(resolvedPath);
            if (stats.isDirectory()) {
              throw new Error(`${partialPath} is a directory`);
            }
            return await fs.readFile(resolvedPath, 'utf-8');
          } catch (err) {
            console.error(
              `[vite-html-partial-plugin] Failed to include ${partialPath}:`,
              err.message
            );
            return `<!-- Error including ${partialPath} -->`;
          }
        }
      );
    },
  };
};

// Inject __REL_PATH__ placeholder dynamically
const htmlRelativePathPlugin = () => {
  return {
    name: 'vite-relative-path-plugin',
    transformIndexHtml(html, ctx = {}) {
      const htmlDir = ctx.filename
        ? path.posix.dirname(ctx.filename.replace(/\\/g, '/'))
        : '.';

      let baseUrl = path.posix.relative(htmlDir, '.');
      if (!baseUrl || baseUrl === '') baseUrl = '.';

      return html.replace(/__REL_PATH__/g, baseUrl);
    },
  };
};

// Discover all HTML files for multi-page input
function getHtmlInputs() {
  const htmlFiles = globSync('./**/*.html', {
    ignore: ['node_modules/**', '.*', 'dist/**'],
  });

  const inputs = {};
  htmlFiles.forEach(file => {
    const name = path
      .relative(__dirname, file)
      .replace(/\//g, '_')
      .replace('.html', '');
    inputs[name] = path.resolve(__dirname, file);
  });

  // Add main app entry
  inputs.app = path.resolve(__dirname, 'src/js/app.js');
  return inputs;
}

const htmlImageToWebpPlugin = () => ({
  name: 'html-and-tailwind-to-webp',
  transformIndexHtml(html, ctx) {
    if (ctx?.server) return html;

    // 1. <img src="..."> → .webp
    html = html.replace(
      /(<img[^>]+src=["'])([^"']+?)\.(png|jpe?g)(["'])/gi,
      '$1$2.webp$4'
    );
    return html;
  },
});

export default defineConfig({
  root: '.',
  base: './',
  plugins: [
    tailwindcss(),
    htmlVersionPlugin(),
    viteCompression(),
    htmlScriptAndStyleInjectPlugin(),
    htmlPartialPlugin(),
    htmlRelativePathPlugin(),
    htmlImageToWebpPlugin(),
    visualizer({ open: false }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      renderLegacyChunks: true,
      modernPolyfills: true,
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'esbuild',
    modulePreload: false,
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      input: getHtmlInputs(),
      output: {
        entryFileNames: `js/[name]-min-v${pkg.version}.js`,
        chunkFileNames: `js/[name]-min-v${pkg.version}.js`,

        assetFileNames: assetInfo => {
          const name = assetInfo.name ?? '';
          if (/\.css$/.test(name)) {
            const baseName = name
              .replace(/\.css$/, '')
              .replace(/^src\/css\//, '');
            return `css/${baseName}-min-v${pkg.version}.css`;
          }
          if (/\.(woff2?|ttf|otf|eot)$/.test(name))
            return 'fonts/[name][extname]';
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name))
            return 'images/[name][extname]';
          return 'assets/[name][extname]';
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@iconscout/unicons')) return 'unicons';
            if (id.includes('swiper')) return 'swiper';
            if (id.includes('gsap')) return 'gsap';
            return 'vendor';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
