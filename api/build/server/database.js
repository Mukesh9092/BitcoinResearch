

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = getDatabase;

const _path = require('path');

const _path2 = _interopRequireDefault(_path);

const _knex = require('knex');

const _knex2 = _interopRequireDefault(_knex);

const _objection = require('objection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _process$env = process.env,
  DB_HOST = _process$env.DB_HOST,
  DB_PORT = _process$env.DB_PORT,
  DB_USER = _process$env.DB_USER,
  DB_PASS = _process$env.DB_PASS,
  DB_NAME = _process$env.DB_NAME;


const DB_ADDRESS = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

let knex = void 0;

function getDatabase() {
  if (knex) {
    return knex;
  }

  knex = (0, _knex2.default)({
    // debug: true,
    client: 'pg',
    connection: DB_ADDRESS,
    searchPath: 'knex,public',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: _path2.default.resolve(__dirname, './migrations'),
    },
    seeds: {
      directory: _path2.default.resolve(__dirname, './seeds'),
    },
  });

  _objection.Model.knex(knex);

  return knex;
}
