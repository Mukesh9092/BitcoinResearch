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
        email: {
            type: "string"
        },
        username: {
            type: "string"
        },
        password_seed: {
            type: "string"
        },
        password_hash: {
            type: "string"
        },
        disabled: {
            type: "boolean"
        },
        frozen: {
            type: "boolean"
        },
        delisted: {
            type: "boolean"
        }
    }
});
