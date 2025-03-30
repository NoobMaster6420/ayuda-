import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cybercalc/', // Base path for GitHub Pages deployment
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Enable @ imports
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
  },
  server: {
    port: 3000,
    open: true,
    host: true, // Listen on all addresses
  },
});