const log = require('loglevel')

const { destroy-tables } = require('../lib/database')

log.setLevel('info')

destroyTables!
  .then(() => process.exit())
  .catch((error) => throw error)
