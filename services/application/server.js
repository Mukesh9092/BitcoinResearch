const express = require("express");
const next = require("next");

const setupGenericExpressService = require('./lib/services/setupGenericExpressService')
const setupSessions = require('./lib/services/setupSessions')
const setupPassport = require('./lib/services/setupPassport')
const { formatError } = require("./lib/errors");

const {
  NODE_ENV,
  APPLICATION_HOST,
  APPLICATION_PORT
} = process.env;

const nextApp = next({
  dev: NODE_ENV !== "production"
});

const app = express();

setupGenericExpressService(app);
setupSessions(app);
setupPassport(app);

app.get("*", nextApp.getRequestHandler())

console.log(`> Preparing app...`);

nextApp
  .prepare()
  .then(() => {
    console.log(`> Starting server...`);

    app.listen(APPLICATION_PORT, APPLICATION_HOST, error => {
      if (error) {
        throw error;
      }

      console.log(`> Ready on http://${APPLICATION_HOST}:${APPLICATION_PORT}`);
    });
  })
  .catch(error => {
    console.log(`! ${formatError(error)}`)
  });
