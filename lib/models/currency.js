const rethinkdb = require("rethinkdb");
const Poloniex = require("poloniex.js");

const poloniex = new Poloniex();

const {
  getDatabase,
  query,
  createGetByIdMethod,
  createGetByMethod,
  createUpsertMethod
} = require("../database");

const filterRecords = cursor => {
  return cursor.filter({
    disabled: 0,
    frozen: 0,
    delisted: 0
  });
};

const sanitizeRecord = record => {
  delete record.disabled;
  delete record.frozen;
  delete record.delisted;

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
const getByKey = createGetByMethod("currencies", "key");

const getCurrencyById = id => {
  return getById(id).then(sanitizeRecord);
};

const getCurrencyByKey = key => {
  return getByKey(key).then(sanitizeRecord)
}

const update = createUpsertMethod("currencies");

module.exports = {
  getCurrencies,
  getCurrencyById,
  getCurrencyByKey,
  updateCurrencies: update
};
