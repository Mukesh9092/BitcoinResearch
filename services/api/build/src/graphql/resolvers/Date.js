"use strict";
var _a = require("lodash"), isDate = _a.isDate, isString = _a.isString, isNumber = _a.isNumber;
module.exports = {
    __serialize: function (value) {
        return value;
    },
    __parseValue: function (value) {
        if (isNumber(value)) {
            return value;
        }
        if (isDate(value)) {
            return value.valueOf();
        }
        return new Date(value).valueOf();
    },
    __parseLiteral: function (ast) {
        return ast.value;
    }
};
//# sourceMappingURL=Date.js.map