import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: parseInt(process.env.VITE_DEV_PORT || '5176'),
    allowedHosts: [
      'lunali-reportscare.jdiegu.online'
    ],
    proxy: {
      '/api': {
        target: 'https://luna-rosa-reportes.jdiegu.online',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://luna-rosa-reportes.jdiegu.online',
        changeOrigin: true
      }
    }
  }
})
