import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 base path fix for Vercel routing
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // 👇 This is most important for 404 issue
  base: './'
})
