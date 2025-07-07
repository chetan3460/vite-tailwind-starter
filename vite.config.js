import { defineConfig } from 'vite';
import path from 'path';
import pkg from './package.json';

import viteCompression from 'vite-plugin-compression';
import { glob } from 'glob';

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

const htmlScriptInjectPlugin = () => {
  return {
    name: 'html-script-inject',
    transformIndexHtml(html, ctx) {
      const isBuild = ctx?.server === undefined;

      const scriptTag = isBuild
        ? `<script src="js/app-v${pkg.version}.js"></script>`
        : `<script type="module" src="/src/js/app.js"></script>`;

      return html.replace('<!-- inject:js -->', scriptTag);
    },
  };
};

// Get all HTML files as inputs
function getHtmlInputs() {
  const htmlFiles = glob.sync('./*.html');
  const inputs = {};
  htmlFiles.forEach(file => {
    const name = path.basename(file, '.html');
    inputs[name] = path.resolve(__dirname, file);
  });
  return inputs;
}

export default defineConfig({
  root: '.',
  base: './',
  plugins: [htmlVersionPlugin(), viteCompression(), htmlScriptInjectPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlInputs(),
      output: {
        entryFileNames: `js/app-v${pkg.version}.js`,
        chunkFileNames: `js/[name]-v${pkg.version}.js`,
        assetFileNames: assetInfo => {
          const name = assetInfo.name ?? '';
          if (/\.css$/.test(name)) return `css/app-v${pkg.version}.css`;
          if (/\.(woff2?|ttf|otf|eot)$/.test(name))
            return 'fonts/[name][extname]';
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name))
            return 'images/[name][extname]';
          return 'assets/[name][extname]';
        },
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
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
