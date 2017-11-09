const { promisify } = require("util");

const fetch = require("isomorphic-fetch")
const rethinkdb = require("rethinkdb");

const poloniex = require("../poloniex");

const {
  getCurrencyByKey,
} = require("./currency");

const {
  createInsertMethod,
  createTable,
  ensureTable,
  getDatabase,
  query,
} = require("../database");

const insert = createInsertMethod("candlesticks")

const getCandlesticks = async (currencyAKey, currencyBKey, period, start, end) => {
  console.log("getCandlesticks", currencyAKey, currencyBKey, period, start, end)

  const db = await getDatabase();

  const currencyA = await getCurrencyByKey(currencyAKey)

  if (!currencyA) {
    throw new Error(`Invalid currency: ${currencyAKey}`)
  }

  const currencyB = await getCurrencyByKey(currencyAKey)

  if (!currencyB) {
    throw new Error(`Invalid currency: ${currencyBKey}`)
  }

  const currencyPair = `${currencyAKey}_${currencyBKey}`;

  const tableName = `candlesticks_${currencyPair}_${period}`;

  await ensureTable(tableName);

  const queryResult = await query(tableName, cursor => {
    return cursor.between(start, end)
  });

  const queryResultArray = await queryResult.toArray();

  if (queryResultArray.length) {
    return queryResultArray
  }

  const queryURL = `https://poloniex.com/public?command=returnChartData&currencyPair=${currencyPair}&start=${start}&end=${end}&period=${period}`;

  console.log('QUERYURL', queryURL)

  const apiResult = await fetch(queryURL)
  const apiResultJSON = await apiResult.json()

  if (apiResultJSON.error) {
    throw new Error(apiResultJSON.error)
  }

  console.log('APIRESULTJSON', apiResultJSON)

  const documents = apiResultJSON.map(x => {
    x.id = x.date
    delete x.date

    x.currencyA = currencyA.id
    x.currencyB = currencyB.id

    return x
  })

  console.log('DOCUMENTS', documents)

  // const result = await createInsertMethod(tableName)(documents)

  return documents
}

module.exports = {
  getCandlesticks,
};

/*
    id: 1486339200,
    currencyA: 'b52dc0e6-ec58-4629-9cd6-8b2a187e1636',
    currencyB: 'b52dc0e6-ec58-4629-9cd6-8b2a187e1636',
    period: 86400
    high: 0.01109599,
    low: 0.01085001,
    open: 0.011035,
    close: 0.011025,
    volume: 1421.63501635,
    quoteVolume: 129208.91773172,
    weightedAverage: 0.0110026,
*/

