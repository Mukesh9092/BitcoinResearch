const fetch = require("isomorphic-fetch");
const { sortBy } = require('lodash');

const store = require('../../../lib/database/store')

const fetchPoloniex = require('../fetchPoloniex');

const sanitize = (a) => {
  return sortBy(a, ['id'])
};

const sanitizePoloniex = (a, currencyA, currencyB) => {
  return sanitize(a.map(x => {
    x.id = x.date * 1000
    delete x.date

    x.currencyA = currencyA.id
    x.currencyB = currencyB.id

    return x
  }))
};

const getCurrencyByKey = async (key) => {
  const currencyAResult = await store.findAll('currency', {
    where: {
      key,
    },
  })

  const currency = currencyAResult[0]

  if (!currency) {
    throw new Error(`Invalid currency: ${currencyA}.`)
  }

  return currency;
};

module.exports = async (root, { currencyA: currencyAKey, currencyB: currencyBKey, period, start, end }) => {
  const currencyA = await getCurrencyByKey(currencyAKey);
  const currencyB = await getCurrencyByKey(currencyBKey);

  const queryResult = await store.getAdapter("rethinkdb").r.table('candlesticks')
    .between(start, end)

  if (queryResult && queryResult.length) {
    return sanitize(queryResult)
  }

  const currencyPair = `${currencyA.key}_${currencyB.key}`;

  const apiResultJSON = await fetchPoloniex(`command=returnChartData&currencyPair=${currencyPair}&start=${start / 1000}&end=${end / 1000}&period=${period}`);

  const documents = sanitizePoloniex(apiResultJSON, currencyA, currencyB)

  // Upsert.
  await store.getAdapter("rethinkdb").r.table('candlesticks')
    .insert(documents, { conflict: "update" })
    .run();

  return documents;
};
