const fetch = require("isomorphic-fetch");
const { sortBy } = require("lodash");

const store = require("../../../lib/database/store");

const fetchPoloniex = require("../fetchPoloniex");

function sanitize(a) {
  return sortBy(a, ["key", "volume24h.currencyAVolume"]);
}

function sanitizePoloniex(volumes, currencies) {
  return sanitize(
    Object.keys(volumes)
      .filter(x => !x.match(/^total/))
      .sort()
      .map(key => {
        const [currencyAKey, currencyBKey] = key.split("_");
        const currencyA = currencies[currencyAKey];
        const currencyB = currencies[currencyBKey];

        delete currencyA.id;
        delete currencyA.frozen;
        delete currencyA.delisted;
        delete currencyA.disabled;
        delete currencyA.depositAddress;
        currencyA.key = currencyAKey;

        delete currencyB.id;
        delete currencyB.frozen;
        delete currencyB.delisted;
        delete currencyB.disabled;
        delete currencyB.depositAddress;
        currencyB.key = currencyBKey;

        return {
          key,
          currencyA,
          currencyB,
          volume24h: {
            currencyAVolume: volumes[key][currencyAKey],
            currencyBVolume: volumes[key][currencyBKey]
          }
        };
      })
  );
}

async function currencyPairs() {
  const queryResult = await store.findAll("currencyPair");

  if (queryResult && queryResult.length) {
    return sanitize(queryResult);
  }

  const volumes = await fetchPoloniex("command=return24hVolume");
  const currencies = await fetchPoloniex("command=returnCurrencies");

  const currencyPairDocuments = sanitizePoloniex(volumes, currencies);

  const createResult = await store.createMany(
    "currencyPair",
    currencyPairDocuments
  );

  return currencyPairDocuments;
}

module.exports = currencyPairs;
