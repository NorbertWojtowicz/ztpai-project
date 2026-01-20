import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Możesz wymusić port 3000, żeby pasował do konfiguracji CORS w Springu
    }
})