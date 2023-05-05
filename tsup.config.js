import { defineConfig } from 'tsup'

module.exports = defineConfig({
  entryPoints: ['src/server.ts'],
  format: ['cjs'],
  outfile: 'dist/database/labook.db',
  loader: {
    '.db': 'file',
  },
})
