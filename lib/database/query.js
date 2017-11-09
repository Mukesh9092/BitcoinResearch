const rethinkdb = require("rethinkdb");

const getDatabase = require("./getDatabase");

module.exports = async (table, fn) => {
  const db = await getDatabase();
  const result = await fn(rethinkdb.table(table)).run(db);

  return result;
};
