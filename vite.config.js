import istanbul from 'vite-plugin-istanbul';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

// https://vite.dev/config/
export default defineConfig((config) => ({
  build: {
    sourcemap: config.mode === 'development' ? 'inline' : false,
  },
  plugins: [
    istanbul ({
      include: 'src/**/*.js',
      exclude: ['node_modules', 'src/**/*.spec.js'],
      extension: ['.js'],
      forceBuildInstrument: true,
    }),
  ],
  publicDir: '../../../public',
  resolve: {
    alias: {
      "@": fileURLToPath (new URL ('./src/js', import.meta.url)),
      "~/package": fileURLToPath (new URL ('./package', import.meta.url)),
    },
  },
  root: 'src/js/browser',
  server: {
    host: true,
    port: 5000, 
    proxy: {
      '/api/behave': 'http://localhost:5001',
      // '/api/kohi': 'http://localhost:8888',
      // '/api/kohi': 'http://localhost:5002',
      // '/coverage': 'http://localhost:5002',
      // '/bob': 'http://localhost:9000',
    },
  }
}));
