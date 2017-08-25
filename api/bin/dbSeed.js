const { create-seed } = require('../lib/database')

createSeed!
  .then(() => process.exit())
  .catch((error) => throw error)
