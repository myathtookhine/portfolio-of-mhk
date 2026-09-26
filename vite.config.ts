import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Case study slugs, read from the data file so new case studies get a page
// automatically. (The data module imports images, so it can't be imported here.)
function caseStudySlugs(root: string) {
  const source = readFileSync(resolve(root, 'src/data/projects.ts'), 'utf8')
  const block = source.slice(source.indexOf('export const caseStudies'), source.indexOf('export const otherProjects'))
  return [...block.matchAll(/^ {4}slug: '([^']+)'/gm)].map((m) => m[1])
}

// GitHub Pages only serves real files. Give every route a copy of index.html so
// it loads with a 200 status (GitHub maps /projects/x to projects/x.html), and
// use 404.html as the fallback for addresses that don't exist.
function staticRoutes(): Plugin {
  let root = '.'
  let outDir = 'dist'
  return {
    name: 'static-routes',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html')
      copyFileSync(index, resolve(outDir, '404.html'))
      mkdirSync(resolve(outDir, 'projects'), { recursive: true })
      for (const slug of caseStudySlugs(root)) {
        copyFileSync(index, resolve(outDir, 'projects', `${slug}.html`))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Served from https://myathtookhine.github.io/portfolio-of-mhk/
  base: '/portfolio-of-mhk/',
  plugins: [react(), tailwindcss(), staticRoutes()],
})
