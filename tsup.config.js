import { defineConfig } from 'tsup'

module.exports = defineConfig({
  entryPoints: ['src/index.ts'],
  format: ['cjs'],
  loader: {
    '.db': 'text',
  },
})
