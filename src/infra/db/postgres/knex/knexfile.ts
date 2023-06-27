// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

console.log(process.env)

const config = {
  client: 'postgresql',
  connection: {
    host: process.env?.DB_HOST?.toString().trim() || 'localhost',
    database: process.env?.DB?.toString().trim() || 'postgres',
    user: process.env?.DB_USER?.toString().trim() || 'postgres',
    password: process.env?.DB_PASSWORD?.toString().trim() || 'postgres',
    port: process.env?.DB_PORT || 5432
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