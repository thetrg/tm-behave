import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

// https://vite.dev/config/
export default defineConfig((config) => ({
  publicDir: '../../../public',
  resolve: {
    alias: {
      "@": fileURLToPath (new URL ('./src/js', import.meta.url)),
      // "~/package": fileURLToPath (new URL ('./package', import.meta.url)),
    },
  },
  root: 'src/js/browser',
  server: {
    host: true,
    port: 5200,
  }
}));
