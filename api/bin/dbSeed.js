const log = require('loglevel')

const { create-seed } = require('../lib/database')

log.setLevel('info')

createSeed!
  .then(() => process.exit())
  .catch((error) => throw error)
