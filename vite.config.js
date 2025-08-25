import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],server: {
    port: 3000,   // 👈 force dev server to use port 3000
    host: true    // allow access from localhost
  },
  preview: {
    port: 3000,   // 👈 also force preview to 3000
    host: true
  }
})
