import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

// vite.config.js
export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  return {
    // Run ESLint only in dev; skip during `vite build` (e.g., Vercel)
    plugins: isDev
      ? [
          eslintPlugin({
            cache: false,
            failOnWarning: false,
            failOnError: false,
            emitWarning: true,
            emitError: false,
          }),
        ]
      : [],
    server: {
      host: 'localhost',
      port: 4000,
      cors: '*',
      hmr: {
        host: 'localhost',
        protocol: 'ws',
        overlay: false,
      },
    },
    build: {
      // Do not minify on production build
      minify: false,
      manifest: true,
      rollupOptions: {
        input: './src/main.js',
        output: {
          format: 'umd',
          entryFileNames: 'main.js',
          esModule: false,
          // Keep output readable
          compact: false,
          globals: {
            jquery: '$',
          },
        },
        external: ['jquery'],
      },
    },
  }
})
