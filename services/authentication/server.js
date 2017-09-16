const express = require('express')
const passport = require('passport')

const setupGenericExpressService = require('./lib/services/setupGenericExpressService')
const setupPassport = require('./lib/services/setupPassport')
const setupSessions = require('./lib/services/setupSessions')
const user = require('./lib/models/user')
const { startExpressServiceWith } = require('./lib/service')

startExpressServiceWith((app) => {
  setupGenericExpressService(app)
  setupSessions(app)
  setupPassport(app)

  app.post("/api/authentication/local", passport.authenticate("local"), (req, res) => {
    res.send(req.session)
  })
})
