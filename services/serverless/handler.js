"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
function capitalize(req, res) {
    var body = [];
    req
        .on('error', function (err) {
        console.error(err);
    })
        .on('data', function (chunk) {
        body.push(chunk);
    })
        .on('end', function () {
        var result = Buffer.concat(body).toString();
        res.end(lodash_1.capitalize(result));
    });
}
exports["default"] = {
    capitalize: capitalize
};
