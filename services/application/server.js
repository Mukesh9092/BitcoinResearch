const express = require("express");
const next = require("next");

const authenticationHeaderExtraction = require("./lib/middleware/authenticationHeaderExtraction");
const expressServiceWith = require("./lib/middleware/expressServiceWith");
const genericExpressService = require("./lib/middleware/genericExpressService");
const logger = require("./lib/middleware/logger");
const { formatError } = require("./lib/errors");

const nextApp = next({
  dev: process.env.NODE_ENV !== "production"
});

nextApp
  .prepare()
  .then(() => {
    expressServiceWith(app => {
      genericExpressService(app);
      logger(app);
      authenticationHeaderExtraction(app);

      app.use(nextApp.getRequestHandler());
    });
  })
  .catch(error => {
    console.log(`! ${formatError(error)}`);
  });
