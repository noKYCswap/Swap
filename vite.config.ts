import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/vite-deploy/",
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:80', // Remplacez par l'URL de votre API
        changeOrigin: true,
        secure: false,
      },
    },
  },
});