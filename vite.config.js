import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // 👈 Дозволити доступ з інших пристроїв (телефонів)
    port: 5173,
    open: true
  }
})