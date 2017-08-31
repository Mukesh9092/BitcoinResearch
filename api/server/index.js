const express = require('express')

const { formatError } = require('../lib/error')
const { getDatabase } = require('../commonLibrary/database')
const { setupGraphQL } = require('./graphql')
const {
  setupPassport,
  setupPassportLocalEndpoint,
} = require('../commonLibrary/passport')

const {
  API_HOST,
  API_KEYS,
  API_PORT,
  NODE_ENV,
  PROXY_HOST,
} = process.env

const debugLevel = NODE_ENV === 'develop' ? 'debug' : 'info'

const app = express()

// app.set('trust proxy', PROXY_HOST)

setupPassport(app)
setupPassportLocalEndpoint(app)
setupGraphQL(app)

app.listen(API_PORT, API_HOST, (error) => {
  if (error) {
    console.log(formatError(error))
    return
  }

  console.log(`HTTP Server listening at http://${API_HOST}:${API_PORT}`)
})
