"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_data_1 = require("js-data");
exports.default = new js_data_1.Schema({
    $schema: "http://json-schema.org/draft-04/schema#",
    title: "OrderBook",
    description: "OrderBook",
    type: "object",
    properties: {
        id: {
            type: "string"
        },
        currencyA: {
            type: "string"
        },
        currencyB: {
            type: "string"
        },
        type: {
            type: "string"
        },
        price: {
            type: "number"
        },
        amount: {
            type: "number"
        }
    }
});
