import store from "../../../common/database/store";
import ensureTable from "../../../common/database/helpers/ensureTable";

import fetchPoloniex from "../fetchPoloniex";

const rethinkDBAdapter = store.getAdapter("rethinkdb").r;

const MILLISECOND_MULTIPLIER = 1000;

function byId(x: { id: string }, y: { id: string }): number {
  if (x.id > y.id) {
    return 1;
  }

  if (x.id < y.id) {
    return -1;
  }

  return 0;
}

function sanitize(a: Object[]) {
  return a.sort(byId)
}

function sanitizePoloniex(a) {
  return a.map(x => {
    x.id = x.date * MILLISECOND_MULTIPLIER;
    delete x.date;

    // console.log("X", x);

    return x;
  });
}

async function getCurrencyByKey(key) {
  const currencyAResult = await store.findAll("currency", {
    where: {
      key
    }
  });

  const [currency] = currencyAResult;

  if (!currency) {
    throw new Error(`Invalid currency: "${key}".`);
  }

  return currency;
}

async function getCurrencyPair(currencyPairKey) {
  const currencyPairResult = await store.findAll("currencyPair", {
    where: {
      key: currencyPairKey
    }
  });

  const [currencyPair] = currencyPairResult;

  if (!currencyPair) {
    throw new Error(`Invalid currency pair: "${currencyPairKey}"`);
  }

  return currencyPair;
}

export default async function candlesticks(root, { currencyA, currencyB, period, start, end }) {
  console.log("graphql candlesticks", currencyA, currencyB, period, start, end);

  const currencyPairKey = `${currencyA}_${currencyB}`;

  console.log("graphql candlesticks currencyPairKey", currencyPairKey);

  const currencyPair = await getCurrencyPair(currencyPairKey);

  console.log("graphql candlesticks currencyPair", currencyPair);

  const tableName = `candlesticks_${currencyPairKey}_${period}`;

  console.log("graphql candlesticks tableName", tableName);

  await ensureTable(rethinkDBAdapter, tableName);

  const queryResult = await rethinkDBAdapter
    .table(tableName)
    .between(start * 1000, end * 1000);

  const expectedDataSetSize = (end - start) / period;
  const actualDataSetSize = queryResult.length;

  console.log("graphql candlesticks expectedDataSetSize", expectedDataSetSize);
  console.log("graphql candlesticks actualDataSetSize", actualDataSetSize);

  if (queryResult.length) {
    return sanitize(queryResult);
  }

  const dataPointsToQuery = expectedDataSetSize - actualDataSetSize;

  console.log("graphql candlesticks dataPointsToQuery", dataPointsToQuery);

  const apiEnd = end;
  const apiStart = apiEnd - period * dataPointsToQuery;

  console.log("graphql candlesticks apiStart", apiStart);
  console.log("graphql candlesticks apiEnd", apiEnd);

  const uri = [
    "command=returnChartData",
    `&currencyPair=${currencyPairKey}`,
    `&start=${apiStart}`,
    `&end=${apiEnd}`,
    `&period=${period}`
  ].join("");

  const apiResultJSON = await fetchPoloniex(uri);

  const documents = sanitizePoloniex(apiResultJSON);

  await rethinkDBAdapter
    .table(tableName)
    .insert(documents, { conflict: "update" })
    .run();

  return documents;
};