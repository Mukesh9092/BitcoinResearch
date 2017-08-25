const {
  createSeed
  createTables
  destroyTables
} = require('../lib/database')

destroyTables()
  .then(createTables)
  .then(createSeed)
  .then(() => process.exit())
  .catch((error) => throw error)
