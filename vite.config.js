// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import { glob } from 'glob';
import viteCompression from 'vite-plugin-compression';
import pkg from './package.json'; // Read version automatically

// Plugin to replace __APP_VERSION__ in HTML files
const htmlVersionPlugin = () => {
  const version = pkg.version;
  return {
    name: 'html-version-replacement',
    transformIndexHtml(html) {
      return html.replace(/__APP_VERSION__/g, version);
    },
  };
};

// Function to get all HTML files in the root directory
// NOTE: This function is now unused as we're using a single JS entry point
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
  root: '.', // index.html is in root
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlInputs(),
      output: {
        entryFileNames: () => {
          // Force all entries to use the same naming pattern
          return 'js/app-v' + pkg.version + '.js';
        },
        chunkFileNames: chunkInfo => {
          // For dynamic imports and chunks
          return 'js/[name]-v' + pkg.version + '.js';
        },
        assetFileNames: assetInfo => {
          const name = assetInfo.name ?? 'asset';
          const extType = name.split('.').at(1);

          if (/\.css$/.test(name)) {
            return 'css/app-v' + pkg.version + '.css';
          }
          if (/\.(woff2?|ttf|otf|eot)$/.test(name)) {
            return `fonts/[name]`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name)) {
            return `images/[name]`;
          }
          return `assets/[name]`;
        },
      },
    },
  },
  plugins: [viteCompression()],
  server: {
    port: 9090,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      $: 'jquery',
      jquery: 'jquery',
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
});
