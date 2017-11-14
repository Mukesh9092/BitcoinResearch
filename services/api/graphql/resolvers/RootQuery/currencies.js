const fetch = require("isomorphic-fetch");
const { filter, sortBy } = require("lodash");

const store = require("../../../lib/database/store");

const fetchPoloniex = require("../fetchPoloniex");

const sanitize = a => {
  return sortBy(filter(a, x => !x.frozen && !x.delisted && !x.disabled), [
    "key"
  ]);
};

const sanitizePoloniex = a => {
  const keys = Object.keys(a);
  const values = Object.values(a);

  return sanitize(
    values.map((v, i) => {
      delete v.id;
      delete v.depositAddress;

      v.key = keys[i];

      v.frozen = !!v.frozen;
      v.delisted = !!v.delisted;
      v.disabled = !!v.disabled;

      return v;
    })
  );
};

module.exports = async () => {
  const queryResult = await store.findAll("currency");

  if (queryResult && queryResult.length) {
    return sanitize(queryResult);
  }

  const apiResultJSON = await fetchPoloniex(`command=returnCurrencies`);

  const documents = sanitizePoloniex(apiResultJSON);

  await store.destroyAll("currency");

  const createResult = await store.createMany("currency", documents);

  return documents;
};
