// Update with your config settings.
require('dotenv').config()

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env

module.exports = {
  development: {
    client: 'postgresql',

    connection: {
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    },

    pool: {
      min: 1,
      max: 1,
    },

    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',

    connection: {
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    },

    pool: {
      min: 1,
      max: 1,
    },

    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',

    connection: {
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    },

    pool: {
      min: 1,
      max: 1,
    },

    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
