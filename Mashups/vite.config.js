import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:'5173',
    strictPort:true,
    headers:{
      a:'b',
      // 'access-control-allow-origin':'*',
    },
    proxy:{
      '/api':{
        target:'http://localhost:4001',
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/,'')
      }
    }
  },
  plugins: [react()],
})
