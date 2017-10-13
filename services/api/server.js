const express = require("express");

const authenticationHeaderExtraction = require("./lib/middleware/authenticationHeaderExtraction");
const expressServiceWith = require("./lib/middleware/expressServiceWith");
const genericExpressService = require("./lib/middleware/genericExpressService");
const graphql = require("./middleware/graphql");
const logger = require("./lib/middleware/logger");
const poloniex = require("./middleware/poloniex");

expressServiceWith(app => {
  genericExpressService(app);
  logger(app);
  authenticationHeaderExtraction(app);
  graphql(app);
  poloniex(app);
});
