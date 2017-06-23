log = require 'loglevel'

config           = require '../config'
{ format-error } = require '../lib/error'
{ get-database } = require '../lib/database'

log.set-level 'debug'

db = get-database!

db.migrate.rollback directory: config.db.migrations.directory-path
  .then (result) ->
    process.exit!
  .catch (error) ->
    log.error format-error error
    process.exit!
