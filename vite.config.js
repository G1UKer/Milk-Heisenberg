import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Milk-Heisenberg/', // 👈 название репозитория!
  plugins: [react()],
})