const { RethinkDBAdapter } = require('js-data-rethinkdb');

const {
  RETHINKDB_DB,
  RETHINKDB_HOST,
  RETHINKDB_PORT,
} = process.env;

const adapter = new RethinkDBAdapter({
  rOpts: {
    host: RETHINKDB_HOST,
    port: RETHINKDB_PORT,
    db: RETHINKDB_DB,
    min: 10,
    max: 50,
  },
});

module.exports = adapter;
