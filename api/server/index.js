const path = require('path')
const zlib = require('zlib')

const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const express = require('express')

const { formatError } = require('../lib/error')
const { getDatabase } = require('../lib/database')
const { setupGraphQL } = require('./graphql')
const { setupPassport } = require('./passport')

const {
  API_EVENT_STORE_DATA_PATH,
  API_HOST,
  API_KEYS,
  API_PORT,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
} = process.env

const debugLevel = NODE_ENV === 'develop' ? 'debug' : 'info'

const app = express()
app.keys = API_KEYS.split(',')

app
  // .use(cookieParser())
  .use(bodyParser.json())

setupPassport(app)
setupGraphQL(app)

app.listen(API_PORT, API_HOST, (error) => {
  if (error) {
    console.log(formatError(error))
    return
  }

  console.log(`HTTP Server listening at http://${API_HOST}:${API_PORT}`)
})