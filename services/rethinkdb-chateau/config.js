const {
  RETHINKDB_HOST,
  RETHINKDB_PORT,
} = process.env;

// RethinkDB settings
exports.host = RETHINKDB_HOST; // RethinkDB host
exports.port = RETHINKDB_PORT; // RethinkDB driver port
exports.authKey = '';          // Authentification key (leave an empty string if you did not set one)

// Express settings
exports.expressPort = 8201;    // Port used by express
exports.debug = true;          // Debug mode
exports.network = '127.0.0.1'  // Network the node app will run on
