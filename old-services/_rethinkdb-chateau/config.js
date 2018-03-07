const {
  RETHINKDB_HOST,
  RETHINKDB_PORT,
  RETHINKDB_CHATEAU_HOST,
  RETHINKDB_CHATEAU_PORT
} = process.env;

module.exports = {
  host: RETHINKDB_HOST,
  port: RETHINKDB_PORT,
  authKey: "",

  expressPort: RETHINKDB_CHATEAU_PORT,
  debug: true,
  network: RETHINKDB_CHATEAU_HOST
};
