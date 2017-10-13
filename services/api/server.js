const express = require("express");

const authenticationHeaderInjection = require("./lib/middleware/authenticationHeaderInjection");
const expressServiceWith = require("./lib/middleware/expressServiceWith");
const genericExpressService = require("./lib/middleware/genericExpressService");
const graphql = require("./middleware/graphql");
const logger = require("./lib/middleware/logger");
const poloniex = require("./middleware/poloniex");

expressServiceWith(app => {
  genericExpressService(app);
  logger(app);
  authenticationHeaderInjection(app);
  graphql(app);
  poloniex(app);
});
