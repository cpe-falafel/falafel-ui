import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api/flux': {
        target: 'http://app.falafel.stream',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/flux/, '/api/flux')
      },
      '/api/workers': {
        target: 'http://app.falafel.stream',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/workers/, '/api/workers')
      }
    }
  }
})
