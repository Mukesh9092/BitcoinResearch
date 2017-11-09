const createGetByIdMethod = require("./createGetByIdMethod");
const createGetByMethod = require("./createGetByMethod");
const createInsertMethod = require("./createInsertMethod");
const createSeed = require("./createSeed");
const createTable = require("./createTable");
const createTableRecord = require("./createTableRecord");
const createTables = require("./createTables");
const createUpsertMethod = require("./createUpsertMethod");
const destroyTable = require("./destroyTable");
const destroyTables = require("./destroyTables");
const ensureTable = require("./ensureTable");
const getDatabase = require("./getDatabase");
const query = require("./query");

module.exports = {
  createGetByIdMethod,
  createGetByMethod,
  createInsertMethod,
  createSeed,
  createTable,
  createTableRecord,
  createTables,
  createUpsertMethod,
  destroyTable,
  destroyTables,
  ensureTable,
  getDatabase,
  query,
};
