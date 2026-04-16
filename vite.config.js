import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Add this server block:
  server: {
    host: true, // 🚀 This is the magic line that exposes it to Coolify
    port: 3000,
  },
  preview: {
    host: true,
    port: 3000,
  }
})