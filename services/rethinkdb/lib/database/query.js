const rethinkdb = require("rethinkdb");

const getDatabase = require("./getDatabase");

module.exports = (table, fn) => {
  return getDatabase().then(db => {
    return fn(rethinkdb.table(table)).run(db);
  });
};
