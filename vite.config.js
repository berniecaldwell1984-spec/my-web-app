
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // keep if you're using React; remove otherwise

export default defineConfig({
  plugins  plugins: [react()],
  // IMPORTANT: this must match your repo name exactly
  base: '/my-web-app/',
