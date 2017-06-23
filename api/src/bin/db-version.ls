log = require 'loglevel'

config           = require '../config'
{ format-error } = require '../lib/error'
{ get-database } = require '../lib/database'

log.set-level 'debug'

db = get-database!

console.log 'dir', config.db.migrations.directory-path

db.migrate.current-version directory: config.db.migrations.directory-path
  .then (result) ->
    console.log result
    process.exit!
  .catch (error) ->
    log.error format-error error
    process.exit!
