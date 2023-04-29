import { knex } from 'knex'
import { env } from '../env'

export abstract class Db {
  protected static connection = knex({
    client: 'sqlite3',
    connection: {
      filename: env.DB_FILE_PATH,
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
      afterCreate: (conn: any, cb: any) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      },
    },
  })
}
