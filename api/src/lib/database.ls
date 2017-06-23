path = require 'path'

Knex = require 'knex'
log = require 'loglevel'
{ Model } = require 'objection'

{
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env

DB_ADDRESS = "postgresql://#{DB_USER}:#{DB_PASS}@#{DB_HOST}:#{DB_PORT}/#{DB_NAME}"

knex = null

export get-database = ->
  if knex
    log.debug "Knex: Using EXISTING database connection for operation."

    return knex

  knex = Knex do
    client: 'pg'
    connection: DB_ADDRESS
    search-path: 'knex,public'
    pool:
      min: 2
      max: 10
    migrations:
      table-name: 'knex_migrations'
      directory: path.resolve "#{__dirname}/migrations"
    seeds:
      directory: path.resolve "#{__dirname}/seeds"

  Model.knex knex

  log.debug "Knex: Using NEW database connection for operation."

  knex
