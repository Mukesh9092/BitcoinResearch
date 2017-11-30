"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_data_rethinkdb_1 = require("js-data-rethinkdb");
var _a = process.env, RETHINKDB_DB = _a.RETHINKDB_DB, RETHINKDB_HOST = _a.RETHINKDB_HOST, RETHINKDB_PORT = _a.RETHINKDB_PORT;
var adapter = new js_data_rethinkdb_1.RethinkDBAdapter({
    rOpts: {
        host: RETHINKDB_HOST,
        port: RETHINKDB_PORT,
        db: RETHINKDB_DB,
        min: 10,
        max: 50
    }
});
exports.default = adapter;
