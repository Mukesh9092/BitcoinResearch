"use strict";
var express = require("express");
var authenticationHeaderExtraction = require("./lib/middleware/authenticationHeaderExtraction");
var expressServiceWith = require("./lib/middleware/expressServiceWith");
var genericExpressService = require("./lib/middleware/genericExpressService");
var graphql = require("./middleware/graphql");
var logger = require("./lib/middleware/logger");
var poloniex = require("./middleware/poloniex");
var _a = process.env, API_HOST = _a.API_HOST, API_PORT = _a.API_PORT;
expressServiceWith(function (app) {
    genericExpressService(app);
    logger(app);
    authenticationHeaderExtraction(app);
    graphql(app);
    poloniex(app);
}, API_HOST, API_PORT);
//# sourceMappingURL=server.js.map