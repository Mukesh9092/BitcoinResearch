const { destroy-tables } = require('../lib/database')

destroyTables!
  .then(() => process.exit())
  .catch((error) => throw error)
