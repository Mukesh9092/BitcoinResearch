const authenticationHeaderExtraction = require("./authenticationHeaderExtraction");
const authenticationHeaderInjection = require("./authenticationHeaderInjection");
const expressServiceWith = require("./expressServiceWith");
const genericExpressService = require("./genericExpressService");
const logger = require("./logger");
const passport = require("./passport");
const sessions = require("./sessions");

module.exports = {
  authenticationHeaderExtraction,
  authenticationHeaderInjection,
  expressServiceWith,
  genericExpressService,
  logger,
  passport,
  sessions
};
