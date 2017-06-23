log = require 'loglevel'

config           = require '../config'
{ format-error } = require '../lib/error'
{ get-database } = require '../lib/database'

log.set-level 'debug'

db = get-database!

db.schema.drop-table-if-exists 'comments'
  .then db.schema.drop-table-if-exists 'articles_tags'
  .then db.schema.drop-table-if-exists 'articles'
  .then db.schema.drop-table-if-exists 'tags'
  .then db.schema.drop-table-if-exists 'users'
  .then -> process.exit!
  .catch (error) ->
    log.error format-error error
    process.exit!
