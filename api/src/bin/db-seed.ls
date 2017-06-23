log = require 'loglevel'

config           = require '../config'
{ format-error } = require '../lib/error'
{ get-database } = require '../lib/database'

log.set-level 'debug'

db = get-database!

db.seed.run directory: config.db.seeds.directory-path
  .then (result) ->
    process.exit!
  .catch (error) ->
    log.error format-error error
    process.exit!
