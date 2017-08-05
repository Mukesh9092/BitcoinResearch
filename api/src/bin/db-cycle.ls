log = require 'loglevel'

{
  create-seed
  create-tables
  destroy-tables
} = require '../lib/database'

log.set-level 'info'

destroy-tables!
  .then create-tables
  .then create-seed
  .then  -> process.exit!
  .catch -> throw it
