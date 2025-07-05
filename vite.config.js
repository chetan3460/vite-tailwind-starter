// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import pkg from './package.json'; // Read version automatically

export default defineConfig({
    root: '.', // index.html is in root
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
            },
            output: {
                entryFileNames: `js/[name]-v${pkg.version}.js`,
                assetFileNames: ({ name }) => {
                    if (/\.css$/.test(name ?? '')) return `css/[name]-v${pkg.version}[extname]`;
                    if (/\.(woff2?|ttf|otf|eot)$/.test(name ?? '')) return `fonts/[name]-v${pkg.version}[extname]`;
                    return `assets/[name]-v${pkg.version}[extname]`;
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
