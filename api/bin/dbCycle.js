const { createSeed, createTables, destroyTables } = require("../commonLibrary/database");

destroyTables()
  .then(createTables)
  .then(createSeed)
  .then(() => process.exit())
  .catch(error => {
    throw error;
  });
