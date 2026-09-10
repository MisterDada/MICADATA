import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
// MiCA-DATA — global Vite configuration
export default defineConfig({
    plugins: [react()],
    base: '/MICADATA/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 5173,
        open: false,
    },
    preview: {
        port: 4173,
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
    },
});
