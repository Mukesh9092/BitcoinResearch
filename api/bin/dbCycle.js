const log = require('loglevel')

const {
  createSeed
  createTables
  destroyTables
} = require('../lib/database')

log.setLevel('info')

destroyTables()
  .then(createTables)
  .then(createSeed)
  .then(() => process.exit())
  .catch((error) => throw error)
