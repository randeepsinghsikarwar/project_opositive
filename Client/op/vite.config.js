import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //dev setting
  server: {
    // host: '192.168.1.3',
    port: 3000,
  }
  //dev setting -end
})
