const createGetByIdMethod = require("./createGetByIdMethod");
const createGetByMethod = require("./createGetByMethod");
const createSeed = require("./createSeed");
const createTable = require("./createTable");
const createTableRecord = require("./createTableRecord");
const createTables = require("./createTables");
const createUpsertMethod = require("./createUpsertMethod");
const destroyTable = require("./destroyTable");
const destroyTables = require("./destroyTables");
const getDatabase = require("./getDatabase");
const query = require("./query");

module.exports = {
  createGetByIdMethod,
  createGetByMethod,
  createSeed,
  createTable,
  createTableRecord,
  createTables,
  createUpsertMethod,
  destroyTable,
  destroyTables,
  getDatabase,
  query
};
