import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
      },
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: '/',  // Changed from './'
})