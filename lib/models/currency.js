const rethinkdb = require('rethinkdb')

const {
  getDatabase,
  query,
  createGetById,
  createUpsert,
} = require('../database')

const filterRecords = cursor =>
  cursor.filter({
    disabled: 0,
    frozen: 0,
    delisted: 0,
  })

const sanitizeRecord = (record) => {
  delete record.disabled
  delete record.frozen
  delete record.delisted

  return record
}

const sanitizeRecords = records =>
  records.map(sanitizeRecord)

const getCurrencies = () =>
  query('currencies', filterRecords)
    .then(x => x.toArray())
    .then(sanitizeRecords)

const getById = createGetById('currencies')

const getCurrencyById = id =>
  getById(id)
    .then(sanitizeRecord)

const update = createUpsert('currencies')

const updateCurrencies = currencies =>
  update(currencies)
    .then(sanitizeRecords)

module.exports = {
  getCurrencies,
  getCurrencyById,
  updateCurrencies,
}
