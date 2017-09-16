const express = require('express')

const setupGenericExpressService = require('./lib/services/setupGenericExpressService')
const setupGraphQL = require('./middleware/setupGraphQL')
const setupPassport = require('./lib/services/setupPassport')
const setupPoloniex = require('./middleware/setupPoloniex')
const setupSessions = require('./lib/services/setupSessions')
const { startExpressServiceWith } = require('./lib/service')

startExpressServiceWith((app) => {
  setupGenericExpressService(app)
  setupSessions(app)
  setupPassport(app)
  setupGraphQL(app)
  setupPoloniex(app)
})
