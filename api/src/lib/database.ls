path = require 'path'

Knex = require 'knex'
log = require 'loglevel'

{
  POSTGRESQL_HOST,
  POSTGRESQL_PORT,
  POSTGRESQL_USER,
  POSTGRESQL_PASS,
  POSTGRESQL_NAME,
} = process.env

POSTGRESQL_ADDRESS = "postgresql://#{POSTGRESQL_USER}:#{POSTGRESQL_PASS}@#{POSTGRESQL_HOST}:#{POSTGRESQL_PORT}/#{POSTGRESQL_NAME}"

knex = null

export get-database = ->
  if knex
    log.debug "Knex: Using EXISTING database connection for operation."

    return knex

  knex = Knex do
    client: 'pg'
    connection: POSTGRESQL_ADDRESS
    search-path: 'knex,public'
    pool:
      min: 2
      max: 10
    migrations:
      table-name: 'knex_migrations'
      directory: path.resolve "#{__dirname}/migrations"
    seeds:
      directory: path.resolve "#{__dirname}/seeds"

  log.debug "Knex: Using NEW database connection for operation."

  knex
