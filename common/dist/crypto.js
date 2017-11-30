"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
function genRandomString(length) {
    return crypto_1.randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
}
exports.genRandomString = genRandomString;
function sha512(password, salt) {
    return {
        salt: salt,
        passwordHash: crypto_1.createHmac("sha512", salt)
            .update(password)
            .digest("hex")
    };
}
exports.sha512 = sha512;
