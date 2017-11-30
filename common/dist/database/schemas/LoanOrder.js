"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_data_1 = require("js-data");
exports.default = new js_data_1.Schema({
    $schema: "http://json-schema.org/draft-04/schema#",
    title: "LoanOrder",
    description: "LoanOrder",
    type: "object",
    properties: {
        id: {
            type: "string"
        },
        rate: {
            type: "number"
        },
        amount: {
            type: "number"
        },
        rangeMin: {
            type: "number"
        },
        rangeMax: {
            type: "number"
        }
    }
});
