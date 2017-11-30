"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function memoize(fn) {
    var result;
    return function memoized() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (result) {
            return result;
        }
        result = fn.apply(void 0, args);
        return result;
    };
}
exports.default = memoize;
