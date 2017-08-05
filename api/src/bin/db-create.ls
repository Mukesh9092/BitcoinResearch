log = require 'loglevel'

{ create-tables } = require '../lib/database'

log.set-level 'info'

create-tables!
  .then  -> process.exit!
  .catch -> throw it
