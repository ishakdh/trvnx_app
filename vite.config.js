import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // 🚀 Tells Vite to accept traffic coming from your live domain
    allowedHosts: ['app.trvnx.com'],
  },
  preview: {
    host: true,
    port: 5173,
    allowedHosts: ['app.trvnx.com'],
  }
})