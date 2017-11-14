const fetch = require("isomorphic-fetch");
const { sortBy } = require("lodash");

const store = require("../../../lib/database/store");
const { ensureTable } = require("../../../lib/database/store");

const fetchPoloniex = require("../fetchPoloniex");

const rethinkDBAdapter = store.getAdapter("rethinkdb").r;

function sanitize(a) {
  return sortBy(a, ["id"]);
}

function sanitizePoloniex(a, currencyA, currencyB) {
  return sanitize(
    a.map(x => {
      x.id = x.date * 1000;
      delete x.date;

      x.currencyA = currencyA.id;
      x.currencyB = currencyB.id;

      return x;
    })
  );
}

async function getCurrencyByKey(key) {
  const currencyAResult = await store.findAll("currency", {
    where: {
      key
    }
  });

  const [currency] = currencyAResult;

  if (!currency) {
    throw new Error(`Invalid currency: ${currencyA}.`);
  }

  return currency;
}

module.exports = async function candlesticks(
  root,
  { currencyA: currencyAKey, currencyB: currencyBKey, period, start, end }
) {
  const currencyA = await getCurrencyByKey(currencyAKey);
  const currencyB = await getCurrencyByKey(currencyBKey);

  const currencyPair = `${currencyA.key}_${currencyB.key}`;
  const tableName = `candlesticks_${currencyPair}_${period}`;

  await ensureTable(rethinkDBAdapter, tableName);

  const queryResult = await rethinkDBAdapter
    .table(tableName)
    .between(start, end);

  if (queryResult && queryResult.length) {
    return sanitize(queryResult);
  }

  const apiResultJSON = await fetchPoloniex(
    `command=returnChartData&currencyPair=${currencyPair}&start=${start /
      1000}&end=${end / 1000}&period=${period}`
  );

  const documents = sanitizePoloniex(apiResultJSON, currencyA, currencyB);

  await ensureTable(rethinkDBAdapter, tableName);

  await rethinkDBAdapter
    .table(tableName)
    .insert(documents, { conflict: "update" })
    .run();

  return documents;
};
