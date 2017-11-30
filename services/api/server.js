"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authenticationHeaderExtraction_1 = require("./lib/middleware/authenticationHeaderExtraction");
var expressServiceWith_1 = require("./lib/middleware/expressServiceWith");
var genericExpressService_1 = require("./lib/middleware/genericExpressService");
var graphql_1 = require("./middleware/graphql");
var logger_1 = require("./lib/middleware/logger");
var poloniex_1 = require("./middleware/poloniex");
var _a = process.env, API_HOST = _a.API_HOST, API_PORT = _a.API_PORT;
expressServiceWith_1.default(function (app) {
    genericExpressService_1.default(app);
    logger_1.default(app);
    authenticationHeaderExtraction_1.default(app);
    graphql_1.default(app);
    poloniex_1.default(app);
}, API_HOST, API_PORT);
