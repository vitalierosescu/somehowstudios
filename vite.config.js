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
      cors: '*',
      hmr: {
        host: 'localhost',
        protocol: 'ws',
      },
    },
    build: {
      minify: true,
      manifest: true,
      rollupOptions: {
        input: './src/main.js',
        output: {
          format: 'umd',
          entryFileNames: 'main.js',
          esModule: false,
          compact: true,
          globals: {
            jquery: '$',
          },
        },
        external: ['jquery'],
      },
    },
  }
})
