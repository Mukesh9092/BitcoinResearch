const rethinkdb = require("rethinkdb");
const Poloniex = require("poloniex.js");

const poloniex = new Poloniex();

const {
  getDatabase,
  query,
  createGetByIdMethod,
  createUpsertMethod
} = require("../database");

const filterRecords = cursor => {};

const sanitizeRecord = record => {
  return record;
};

const sanitizeRecords = records => {
  return records.map(sanitizeRecord);
};

const getCurrencies = () => {
  return query("currencies", filterRecords)
    .then(x => x.toArray())
    .then(sanitizeRecords);
};

const getById = createGetByIdMethod("currencies");

const getCurrencyById = id => {
  return getById(id).then(sanitizeRecord);
};

const update = createUpsertMethod("currencies");

const getPeriod = (currencyA, currencyB, period, start, end) => {};

module.exports = {
  getCurrencies,
  getCurrencyById,
  updateCurrencies: update
};
