import path from 'path'

import Knex from 'knex'
import { Model } from 'objection'

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env

const DB_ADDRESS = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

let knex

export default function getDatabase() {
  if (knex) {
    return knex
  }

  knex = Knex({
    // debug: true,
    client: 'pg',
    connection: DB_ADDRESS,
    searchPath: 'knex,public',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, './migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, './seeds'),
    },
  })

  Model.knex(knex)

  return knex
}
