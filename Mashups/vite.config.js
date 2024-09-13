import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: '5173',
    strictPort: true,
    headers: {
      // Example of setting CORS headers or other custom headers
      'access-control-allow-origin': '*',
      'a': 'b' // Remove this if it's not needed
    },
    proxy: {
      '/api': {
        // target: 'http://localhost:4001', // Use this during local development if needed
        target: 'https://mashupsbackand.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Removes /api prefix from the request
      }
    }
  },
  plugins: [react()],
});
