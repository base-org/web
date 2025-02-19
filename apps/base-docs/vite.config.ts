import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const DIRNAME = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    fs: {
      strict: false,
      allow: [
        // Allow serving files from root directory
        resolve(DIRNAME, '.'),
        // Allow node_modules
        resolve(DIRNAME, 'node_modules'),
      ],
    },
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(DIRNAME, './docs'),
      },
      {
        find: '@/components',
        replacement: resolve(DIRNAME, './docs/components'),
      },
      {
        find: '@/pages',
        replacement: resolve(DIRNAME, './docs/pages'),
      },
      {
        find: '@/styles',
        replacement: resolve(DIRNAME, './docs/styles'),
      },
      {
        find: '@/lib',
        replacement: resolve(DIRNAME, './docs/lib'),
      },
      {
        find: '@/utils',
        replacement: resolve(DIRNAME, './docs/utils'),
      },
      {
        find: '@/types',
        replacement: resolve(DIRNAME, './docs/types'),
      },
      {
        find: '@onchainkit',
        replacement: resolve(DIRNAME, './docs/pages/builderkits/onchainkit'),
      },
      {
        find: '@/images',
        replacement: resolve(DIRNAME, './docs/public/images'),
      },
    ],
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
  },
});
