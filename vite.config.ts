import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// GitHub Pages has no SPA fallback: a refresh on /projects/axtra-pos would hit
// GitHub's own 404. Serving a copy of index.html as 404.html lets the router
// render the page instead.
function spaFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Served from https://myathtookhine.github.io/portfolio-of-mhk/
  base: '/portfolio-of-mhk/',
  plugins: [react(), tailwindcss(), spaFallback()],
})
