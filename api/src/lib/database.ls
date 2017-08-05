path = require 'path'

faker     = require 'faker'
log       = require 'loglevel'
pify      = require 'pify'
rethinkdb = require 'rethinkdb'

{
  genRandomString
  sha512
} = require './authentication'

{
  RETHINKDB_HOST,
  RETHINKDB_PORT,
  RETHINKDB_DB,
} = process.env

tables = <[ users articles ]>

create-table = (db, table) -->
  log.info "Creating table '#{table}'."

  rethinkdb
    .table-create table
    .run db

destroy-table = (db, table) -->
  log.info "Destroying table '#{table}'."

  rethinkdb
    .table-drop table
    .run db

create-table-record = (db, table, record) -->
  rethinkdb
    .table table
    .insert record
    .run db

create-users = (db) ->
  log.info "Creating users."

  promises = []

  email             = 'admin@test.com'
  username          = 'admin'
  password-seed     = gen-random-string 64
  { password-hash } = sha512 'test', password-seed

  promises.push create-table-record db, 'users',
    id: 1
    email: email
    username: username
    password_seed: password-seed
    password_hash: password-hash

  for i from 2 to 20
    email             = faker.internet.email!
    username          = faker.internet.user-name!
    password-seed     = gen-random-string 64
    { password-hash } = sha512 'test', password-seed

    promises.push create-table-record db, 'users',
      id: i
      email: email
      username: username
      password_seed: password-seed
      password_hash: password-hash

  Promise.all promises

create-articles = (db) ->
  log.info "Creating articles."

  promises = []

  for i from 0 to 20
    title   = faker.lorem.words!
    slug    = faker.helpers.slugify title

    promises.push create-table-record db, 'users',
      id: i
      title: title
      slug: slug
      body: faker.lorem.paragraphs 10
      created: new Date!
      updated: new Date!
      user_id: Math.floor Math.random! * 20

  Promise.all promises

db = null
export get-database = ->
  return Promise.resolve db if db

  rethinkdb
    .connect host: RETHINKDB_HOST, port: RETHINKDB_PORT
    #.db RETHINKDB_DB
    .then ->
      db = it
      db

export create-tables = ->
  log.info "Creating tables: #{tables.join ', '}."

  get-database!
    .then (db) ->
      Promise.all tables.map create-table db

export destroy-tables = ->
  get-database!
    .then (db) ->
      rethinkdb
        .table-list!
        .run db
        .then (db-tables) ->
          log.info "Destroying tables: #{db-tables.join ', '}."

          Promise.all db-tables.map destroy-table db

export create-seed = ->
  log.info "Creating seed."

  get-database!
    .then (db) ->
      Promise.all [
        create-users db
        create-articles db
      ]
