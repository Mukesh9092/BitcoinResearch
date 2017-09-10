const express = require('express')

const setupGenericExpressService = require('./lib/services/setupGenericExpressService')
const setupGraphQL = require('./middleware/setupGraphQL')
const setupPassport = require('./lib/services/setupPassport')
const setupPoloniex = require('./middleware/setupPoloniex')
const setupSessions = require('./lib/services/setupSessions')
const { formatError } = require('./lib/errors')

const {
  API_HOST,
  API_PORT,
} = process.env

const app = express()

setupGenericExpressService(app)
setupSessions(app)
setupPassport(app)
setupGraphQL(app)
setupPoloniex(app)

app.listen(API_PORT, API_HOST, (error) => {
  if (error) {
    console.log(formatError(error))
    return
  }

  console.log(`HTTP Server listening at http://${API_HOST}:${API_PORT}`)
})
