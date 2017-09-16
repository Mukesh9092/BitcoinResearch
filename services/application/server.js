const express = require('express')
const next = require("next");

const setupGenericExpressService = require('./lib/services/setupGenericExpressService')
const setupPassport = require('./lib/services/setupPassport')
const setupSessions = require('./lib/services/setupSessions')
const { formatError } = require("./lib/errors");
const { startExpressServiceWith } = require('./lib/service')

const nextApp = next({
  dev: process.env.NODE_ENV !== "production"
});

nextApp
  .prepare()
  .then(() => {
    startExpressServiceWith((app) => {
      setupGenericExpressService(app);
      setupSessions(app);
      setupPassport(app);

      app.get("*", nextApp.getRequestHandler())
    })
  })
  .catch(error => {
    console.log(`! ${formatError(error)}`)
  });
