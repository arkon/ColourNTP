import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    root: 'src',
    publicDir: '../public',
    build: {
        outDir: '../build',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                colours: resolve(__dirname, 'src/pages/colours.html'),
                options: resolve(__dirname, 'src/pages/options.html'),
            },
            output: {
                entryFileNames: 'scripts/[name].js',
                chunkFileNames: 'scripts/[name]-[hash].js',
            },
        },
        target: 'chrome120',
        minify: 'terser',
    },
});
