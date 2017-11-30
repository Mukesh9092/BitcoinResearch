"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatError(error) {
    return error.stack || error.message || error;
}
exports.formatError = formatError;
