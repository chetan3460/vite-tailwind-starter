import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

import path from 'path';
import pkg from './package.json';

import viteCompression from 'vite-plugin-compression';
// import { glob } from 'glob';
import { globSync } from 'glob'; // or 'glob' if you're using old version

import fs from 'fs';
import legacy from '@vitejs/plugin-legacy';
// Replace __APP_VERSION__ in HTML
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

      const scriptTags = isBuild
        ? `
  <!-- Modern browsers -->
  <script type="module" src="js/app-min-v${version}.js"></script>
  
  <!-- Legacy fallback for GoDaddy/IE11 -->
  <script nomodule src="js/app-legacy-min-v${version}.js"></script>
        `
        : `<script type="module" src="/src/js/app.js"></script>`;

      const styleTag = isBuild
        ? `<link rel="stylesheet" href="css/app-min-v${version}.css" />`
        : '';

      return html
        .replace('<!-- __STYLE_TAG__ -->', styleTag)
        .replace('<!-- __SCRIPT_TAG__ -->', scriptTags);
    },
  };
};

// Get all HTML files and inject app.js as entry
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

  inputs.app = path.resolve(__dirname, 'src/js/app.js');

  return inputs;
}

export default defineConfig({
  root: '.',
  base: './',
  plugins: [
    tailwindcss(),
    htmlVersionPlugin(),
    viteCompression(),
    htmlScriptAndStyleInjectPlugin(),
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
    minify: 'esbuild', // switch to 'terser' if needed

    rollupOptions: {
      input: getHtmlInputs(),
      output: {
        entryFileNames: chunkInfo => {
          return chunkInfo.name === 'app'
            ? `js/app-min-v${pkg.version}.js`
            : `js/[name]-min-v${pkg.version}.js`;
        },
        chunkFileNames: `js/[name]-min-v${pkg.version}.js`,
        assetFileNames: assetInfo => {
          const name = assetInfo.name ?? '';
          if (/\.css$/.test(name)) return `css/app-min-v${pkg.version}.css`;
          if (/\.(woff2?|ttf|otf|eot)$/.test(name))
            return 'fonts/[name][extname]';
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name))
            return 'images/[name][extname]';
          return 'assets/[name][extname]';
        },
      },
    },
    modulePreload: false, // 👈 prevents <link rel="modulepreload">
    target: 'es2015',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
