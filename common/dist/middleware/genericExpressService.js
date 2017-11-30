"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_parser_1 = require("cookie-parser");
var body_parser_1 = require("body-parser");
function genericExpressService(app) {
    app.use(cookie_parser_1.default()).use(body_parser_1.default.json());
}
exports.default = genericExpressService;
