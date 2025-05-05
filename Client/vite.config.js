import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Allows access from other devices
    port: 5173,       // Use a fixed port
    strictPort: false, // If 5173 is unavailable, Vite will use the next available port
    open: true,       // Opens the browser automatically when the server starts
  },
  build: {
    outDir: "dist", // Specify the output directory
    sourcemap: true, // Generate source maps for debugging
  },
  define: {
    "process.env": {}, // Optional: Define global variables if needed
  },
})
