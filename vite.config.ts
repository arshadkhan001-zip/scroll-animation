import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Project-site URL: https://arshadkhan001-zip.github.io/scroll-animation/
  base: '/scroll-animation/',
  plugins: [react(), tailwindcss()],
  server: {
    // The 308 source PNGs + 308 runtime WebPs must never be scanned,
    // watched, or HMR-processed. They are served as static files only.
    watch: {
      ignored: ["**/frames/**", "**/public/frames/**"],
    },
  },
})
