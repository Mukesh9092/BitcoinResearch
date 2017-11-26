"use strict";
var store = require("../../lib/database/store");
module.exports = {
    currencyA: function (_a) {
        var currencyA = _a.currencyA;
        return store.find("currency", currencyA);
    },
    currencyB: function (_a) {
        var currencyB = _a.currencyB;
        return store.find("currency", currencyB);
    }
};
//# sourceMappingURL=Candlestick.js.map