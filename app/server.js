const path = require('path')

const express = require('express')
const log     = require('loglevel')
const next    = require('next')

const {
  NODE_ENV,
  APP_HOST,
  APP_PORT,
} = process.env

const dev = process.env.NODE_ENV !== 'production'
const logLevel = dev ? 'debug' : 'info'
log.info(`Setting loglevel to: ${logLevel}`)
log.setLevel(logLevel)

const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('*', handle)

    log.info(`> Starting server...`)

    server.listen(APP_PORT, APP_HOST, error => {
      if (error) {
        throw error
      }

      log.info(`> Ready on http://${APP_HOST}:${APP_PORT}`)
    })
  })
