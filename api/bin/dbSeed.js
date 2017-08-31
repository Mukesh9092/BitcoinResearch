const { createSeed } = require("../commonLibrary/database");

createSeed().then(() => process.exit()).catch(error => {
  throw error;
});
