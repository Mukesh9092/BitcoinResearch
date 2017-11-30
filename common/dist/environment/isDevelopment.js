"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDevelopment() {
    return process.env.NODE_ENV === "develop";
}
exports.default = isDevelopment;
