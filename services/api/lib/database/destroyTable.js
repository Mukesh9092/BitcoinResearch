const rethinkdb = require("rethinkdb");

module.exports = (db, table) => {
  console.log(`Destroying table '${table}'.`);

  return rethinkdb.tableDrop(table).run(db);
};
