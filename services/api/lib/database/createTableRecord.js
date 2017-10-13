const rethinkdb = require("rethinkdb");

module.exports = (db, table, record) => {
  // console.log('Creating table record', table, record)

  return rethinkdb
    .table(table)
    .insert(record)
    .run(db);
};
