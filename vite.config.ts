import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Caminhos relativos: o site funciona em https://lemossilveira.github.io/Usicoco/
  // e continua funcionando se um dia for para um domínio próprio.
  base: './',
  plugins: [react(), tailwindcss()],
})
