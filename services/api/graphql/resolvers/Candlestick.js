const store = require('../../lib/database/store')

module.exports = {
  currencyA: ({ currencyA }) => {
    return store.find('currency', currencyA)
  },

  currencyB: ({ currencyB }) => {
    return store.find('currency', currencyB)
  },
};
