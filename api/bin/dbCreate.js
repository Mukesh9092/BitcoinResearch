const log = require('loglevel')

const { create-tables } = require('../lib/database')

log.setLevel('info')

createTables()
  .then(() => process.exit())
  .catch((error) => throw error)
