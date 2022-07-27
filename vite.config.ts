import { defineConfig } from 'vite'
import {fileURLToPath, URL} from 'url'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:'0.0.0.0',
    port:3210
  },
  resolve:{
    alias:{
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }

})
