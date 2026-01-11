import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    root: 'src',
    publicDir: '../public',
    build: {
        outDir: '../build',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                colours: resolve(__dirname, 'src/colours.html'),
                options: resolve(__dirname, 'src/options.html'),
            },
            output: {
                entryFileNames: 'scripts/[name].js',
                chunkFileNames: 'scripts/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    const name = assetInfo.name || '';
                    if (name.endsWith('.css')) {
                        return 'styles/[name][extname]';
                    }
                    return 'assets/[name][extname]';
                },
            },
        },
        target: 'chrome104',
        minify: 'terser',
    },
});
