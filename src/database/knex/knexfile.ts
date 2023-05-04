export default {
  client: 'sqlite3',
  connection: {
    filename: '../labook.db',
  },
  useNullAsDefault: true,

  pool: {
    min: 0,
    max: 1,
    afterCreate: (conn: any, cb: any) => {
      conn.run('PRAGMA foreign_keys = ON', cb)
    },
  },

  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations',
  },
}
