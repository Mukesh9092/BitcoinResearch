const rethinkdb = require("rethinkdb");
const getDatabase = require("./getDatabase");

module.exports = async (table) => {
  const db = await getDatabase();
  const result = await rethinkdb.tableCreate(table).run(db);

  return result;
};
