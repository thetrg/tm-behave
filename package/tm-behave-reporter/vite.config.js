import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

// https://vite.dev/config/
export default defineConfig({
  publicDir: '../../../public',
  resolve: {
    alias: {
      "@": fileURLToPath (new URL ('./src/js', import.meta.url)),
    },
  },
  root: 'src/js/browser',
  server: {
    host: true,
    port: 5002,
    proxy: {
      // '/api/kohi': 'http://localhost:8888',
      '/api/kohi': 'http://localhost:5001',
      // '/coverage': 'http://localhost:5002',
      // '/bob': 'http://localhost:9000',
    }, 
  }
})
