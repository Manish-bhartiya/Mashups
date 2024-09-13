import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: '5173',
    strictPort: true,
    headers: {
      // Example of setting CORS headers or other custom headers
      'access-control-allow-origin': '*',
      'a': 'b' // (Remove if not necessary)
    },
    proxy: {
      '/api': {
        // target: 'http://localhost:4001', // Replace * with actual backend URL
        target:'https://mashupsbackand.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Removes /api prefix
      }
    }
  },
  plugins: [react()],
})
