const express = require('express')
const { formatError } = require('./errors')

const {
  SERVICE_HOST,
  SERVICE_PORT,
} = process.env

const startExpressServiceWith = (middleware) => {
  const app = express()

  middleware(app)

  app.listen(SERVICE_PORT, SERVICE_HOST, (error) => {
    if (error) {
      console.log(formatError(error))
      return
    }

    console.log(`HTTP Server listening at http://${SERVICE_HOST}:${SERVICE_PORT}`)
  })
}

module.exports = {
  startExpressServiceWith,
}
