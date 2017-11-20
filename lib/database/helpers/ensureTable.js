const tableExists = require("./tableExists");

module.exports = async function ensureTable(r, tableName) {
  const exists = await tableExists(r, tableName);

  if (exists) {
    return;
  }

  await r.tableCreate(tableName);
};
