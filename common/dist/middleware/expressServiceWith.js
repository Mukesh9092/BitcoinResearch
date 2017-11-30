"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var errors_1 = require("../errors");
function expressServiceWith(middleware, host, port) {
    var app = express_1.default();
    middleware(app);
    app.listen(port, host, function (error) {
        if (error) {
            console.log(errors_1.formatError(error));
            return;
        }
        console.log("HTTP Server listening at http://" + host + ":" + port + ".");
    });
}
exports.default = expressServiceWith;
