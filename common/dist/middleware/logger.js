"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var morgan_1 = require("morgan");
var environment_1 = require("../environment");
var preset;
if (environment_1.isDevelopment()) {
    preset = "dev";
}
else {
    preset = "common";
}
function logger(app) {
    app.use(morgan_1.default(preset, {
        skip: function (req, res) {
            if (environment_1.isDevelopment()) {
                if (req.url.match(/^\/_next/)) {
                    return true;
                }
            }
            return false;
        }
    }));
}
exports.default = logger;
