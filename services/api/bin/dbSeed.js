const { createSeed } = require("../lib/database");

createSeed()
  .then(() => process.exit())
  .catch(error => {
    throw error;
  });
