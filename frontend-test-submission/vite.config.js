// frontend-test-submission/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..'); // parent directory
const loggingDir = resolve(repoRoot, 'logging-middleware');

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    fs: {
      // allow importing files from the repo root (incl. logging-middleware)
      allow: [repoRoot]
    }
  },
  preview: { port: 3000, host: true },
  resolve: {
    alias: {
      '@logging': loggingDir
    }
  }
});
