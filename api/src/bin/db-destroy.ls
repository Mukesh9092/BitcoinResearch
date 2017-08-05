log = require 'loglevel'

{ destroy-tables } = require '../lib/database'

log.set-level 'info'

destroy-tables!
  .then  -> process.exit!
  .catch -> throw it
