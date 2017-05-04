

const _promise = require('babel-runtime/core-js/promise');

const _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.up = function (knex) {
  return _promise2.default.all([knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email');
    table.string('username');
    table.string('password');
  }), knex.schema.createTable('tags', (table) => {
    table.increments('id').primary();
    table.string('label');
  }), knex.schema.createTable('articles', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.string('slug');
    table.text('body');
    table.timestamp('created').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated').notNullable().defaultTo(knex.raw('now()'));
    table.integer('userId').unsigned().references('users.id').onDelete('CASCADE');
  }), knex.schema.createTable('articles_tags', (table) => {
    table.increments('id');
    table.integer('articleId').unsigned().references('articles.id').onDelete('CASCADE');
    table.integer('tagId').unsigned().references('tags.id').onDelete('CASCADE');
  }), knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.text('body');
    table.timestamp('created').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated').notNullable().defaultTo(knex.raw('now()'));
    table.integer('userId').unsigned().references('users.id').onDelete('CASCADE');
    table.integer('articleId').unsigned().references('articles.id').onDelete('CASCADE');
  })]);
};

exports.down = function (knex) {
  return _promise2.default.all([knex.schema.dropTable('users')]);
};
