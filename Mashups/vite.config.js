import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:'5173',
    strictPort:true,
    headers:{
      a:'b'
    },
    proxy:{
      '/api':{
        target:'https://mashups-nine.vercel.app/',
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/,'')
      }
    }
  },
  plugins: [react()],
})
