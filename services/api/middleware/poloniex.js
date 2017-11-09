const Poloniex = require("poloniex.js");

const poloniex = new Poloniex();

const currency = require("../lib/models/currency");

module.exports = app => {
  app.get("/api/poloniex/currencies", (req, res, next) => {
    currency
      .getCurrencies()
      .then(result => res.json(result))
      .catch(next);
  });

  app.get("/api/poloniex/currencies/update", (req, res, next) => {
    poloniex.returnCurrencies((error, currencies) => {
      if (error) {
        return next(error);
      }

      const keys = Object.keys(currencies);
      const values = Object.values(currencies);

      const combined = values.map((currency, i) => {
        const poloniexID = currency.id;
        delete currency.id;

        return {
          ...currency,
          poloniexID,
          key: keys[i]
        };
      });

      currency
        .updateCurrencies(combined)
        .then(() => res.end())
        .catch(next);
    });
  });

  app.get("/api/poloniex/currencies/destroy", (req, res, next) => {
    currency
      .destroy()
      .then(() => res.end())
      .catch(next);
  });
};
