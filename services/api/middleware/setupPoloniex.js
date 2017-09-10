const Poloniex = require('poloniex.js')

const poloniex = new Poloniex()

const currency = require('../lib/models/currency')

module.exports = (app) => {
  app.get('/api/poloniex/currencies', (req, res, next) => {
    currency.getCurrencies()
      .then((result) => res.json(result))
      .catch(next)
  })

  app.get('/api/poloniex/currencies/update', (req, res, next) => {
    poloniex.returnCurrencies((error, currencies) => {
      if (error) {
        return next(error)
      }

      currency.updateCurrencies(Object.values(currencies))
        .then(() => res.end())
        .catch(next)
    })
  })

  app.get('/api/poloniex/currencies/destroy', (req, res, next) => {
    currency.destroy()

      .then(() => res.end())
      .catch(next)
  })
}
