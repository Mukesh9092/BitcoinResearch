const { createTables } = require("../lib/database");

createTables()
  .then(() => process.exit())
  .catch(error => {
    throw error;
  });
