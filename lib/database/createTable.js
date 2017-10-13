const rethinkdb = require("rethinkdb");

module.exports = (db, table) => {
  console.log(`Creating table '${table}'.`);

  return rethinkdb.tableCreate(table).run(db);
};
