const rethinkdb = require("rethinkdb");

const { RETHINKDB_HOST, RETHINKDB_PORT } = process.env;

let db = null;
module.exports = () => {
  if (db) {
    return Promise.resolve(db);
  }

  return rethinkdb
    .connect({
      host: RETHINKDB_HOST,
      port: RETHINKDB_PORT
    })
    .then(_db => {
      db = _db;
      return db;
    });
};
