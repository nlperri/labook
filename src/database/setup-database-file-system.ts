import { execSync } from 'child_process'
import fs from 'fs'

export function createNewDatabase() {
  fs.unlink('src/database/labook.db', () => {
    console.log('sqlite3 database removed')
  })
  fs.writeFile('src/database/labook.db', '', 'utf-8', () => {
    execSync('npm run knex:migrate')
    console.log('sqlite3 database created')
  })
}
