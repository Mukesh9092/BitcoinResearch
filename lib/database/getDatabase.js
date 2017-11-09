const rethinkdb = require("rethinkdb");

const memoizeAsync = require("../memoizeAsync");

module.exports = memoizeAsync(() => rethinkdb.connect({
  host: process.env.RETHINKDB_HOST,
  port: process.env.RETHINKDB_PORT,
}));
