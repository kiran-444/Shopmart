import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with /api to the escuelajs API
      '/api': {
        target: 'https://api.escuelajs.co',
        changeOrigin: true,
        secure: false,
      },
      // Proxy requests starting with /tlm to useblackbox
      '/tlm': {
        target: 'https://www.useblackbox.io',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
