// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  client: 'postgresql',
  connection: {
    host:'database',
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    port: 5432
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds:{
    directory: './seeds'
  }
};

export default config