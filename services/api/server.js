const express = require('express')

const setupGenericExpressService = require('./lib/services/setupGenericExpressService')
const setupSessions = require('./lib/services/setupSessions')
const setupPassport = require('./lib/services/setupPassport')
const { formatError } = require('./lib/errors')
const { setupGraphQL } = require('./graphql')

const {
  API_HOST,
  API_PORT,
} = process.env

const app = express()

setupGenericExpressService(app)
setupSessions(app)
setupPassport(app)
setupGraphQL(app)

app.listen(API_PORT, API_HOST, (error) => {
  if (error) {
    console.log(formatError(error))
    return
  }

  console.log(`HTTP Server listening at http://${API_HOST}:${API_PORT}`)
})
