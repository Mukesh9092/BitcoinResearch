const express = require('express')
const passport = require('passport')

const setupGenericExpressService = require('./lib/services/setupGenericExpressService')
const setupSessions = require('./lib/services/setupSessions')
const setupPassport = require('./lib/services/setupPassport')
const { formatError } = require('./lib/errors')

const user = require('./lib/models/user')

const {
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
} = process.env

const app = express()

setupGenericExpressService(app)
setupSessions(app)
setupPassport(app)

app.post("/api/authentication/local", passport.authenticate("local"), (req, res) => {
  res.send(req.session);
});

app.listen(AUTHENTICATION_PORT, AUTHENTICATION_HOST, (error) => {
  if (error) {
    console.log(formatError(error))
    return
  }

  console.log(`HTTP Server listening at http://${AUTHENTICATION_HOST}:${AUTHENTICATION_PORT}`)
})
