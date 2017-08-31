const { createTables } = require("../commonLibrary/database");

createTables().then(() => process.exit()).catch(error => {
  throw error;
});
