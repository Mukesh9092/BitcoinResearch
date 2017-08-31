const { destroyTables } = require("../commonLibrary/database");

destroyTables().then(() => process.exit()).catch(error => {
  throw error;
});
