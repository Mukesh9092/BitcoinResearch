const fetch = require("isomorphic-fetch");

const store = require("../lib/database/store");

const MILLISECOND_MULTIPLIER = 1000;
const INTERVAL = 5;
const INTERVAL_IN_SECONDS = INTERVAL * 60;
const INTERVAL_IN_MILLISECONDS = INTERVAL_IN_SECONDS * MILLISECOND_MULTIPLIER;

async function requestMarket(currencyPair, period, start, end) {
  const queryURL = [
    "https://poloniex.com/public?",
    "command=returnChartData",
    `&currencyPair=${currencyPair}`,
    `&start=${start}`,
    `&end=${end}`,
    `&period=${period}`
  ].join("");

  const apiResult = await fetch(queryURL);
  const apiResultJSON = await apiResult.json();

  return apiResultJSON;
}

async function requestData() {
  console.log("requestData");

  const currencies = await store.findAll("currency", {
    where: {
      delisted: false,
      disabled: false,
      frozen: false
    }
  });

  const currencyPairs = currencies
    // .toJSON()
    .filter(x => x.key !== "BTC")
    .map(x => `BTC_${x.key}`);

  const end = new Date().valueOf();
  // Use INTERVAL_IN_MILLISECONDS * 2 to get at least one interval back every time.
  const start = end - INTERVAL_IN_MILLISECONDS * 2;

  const results = await Promise.all(
    currencyPairs.map(currencyPair =>
      requestMarket(currencyPair, INTERVAL_IN_SECONDS, start, end)
    )
  );

  console.log("requestData results", results);

  setTimeout(requestData, INTERVAL_IN_MILLISECONDS);
}

// requestData();

module.exports = function poloniex(app) {
  // Create a timeout system to scrape poloniex of data.
};
