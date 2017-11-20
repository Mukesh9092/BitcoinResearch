const express = require("express");
const next = require("next");

const authenticationHeaderExtraction = require("./lib/middleware/authenticationHeaderExtraction");
const expressServiceWith = require("./lib/middleware/expressServiceWith");
const genericExpressService = require("./lib/middleware/genericExpressService");
const logger = require("./lib/middleware/logger");
const { formatError } = require("./lib/errors");
const { isDevelopment } = require("./lib/environment");

const { APPLICATION_HOST, APPLICATION_PORT, NODE_ENV } = process.env;

const nextApp = next({
  dev: isDevelopment()
});

nextApp
  .prepare()
  .then(() => {
    expressServiceWith(
      app => {
        genericExpressService(app);
        logger(app);
        authenticationHeaderExtraction(app);

        const nextRequestHandler = nextApp.getRequestHandler();

        /*
        app.get('/cms/currencies/:currencyPair/chart', (req, res) => {
          return nextApp.render(req, res, '/cms/currencies/chart', { currencyPair: req.params.currencyPair });
        });
        */

        app.use(nextRequestHandler);
      },
      APPLICATION_HOST,
      APPLICATION_PORT
    );
  })
  .catch(error => {
    console.log(`! ${formatError(error)}`);
  });
