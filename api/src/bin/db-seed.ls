log = require 'loglevel'

{ create-seed } = require '../lib/database'

log.set-level 'info'

create-seed!
  .then  -> process.exit!
  .catch -> throw it
