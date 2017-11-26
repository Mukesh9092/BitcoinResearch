"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fetch = require("isomorphic-fetch");
var store = require("../lib/database/store");
var MILLISECOND_MULTIPLIER = 1000;
var INTERVAL = 5;
var INTERVAL_IN_SECONDS = INTERVAL * 60;
var INTERVAL_IN_MILLISECONDS = INTERVAL_IN_SECONDS * MILLISECOND_MULTIPLIER;
function requestMarket(currencyPair, period, start, end) {
    return __awaiter(this, void 0, void 0, function () {
        var queryURL, apiResult, apiResultJSON;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryURL = [
                        "https://poloniex.com/public?",
                        "command=returnChartData",
                        "&currencyPair=" + currencyPair,
                        "&start=" + start,
                        "&end=" + end,
                        "&period=" + period
                    ].join("");
                    return [4 /*yield*/, fetch(queryURL)];
                case 1:
                    apiResult = _a.sent();
                    return [4 /*yield*/, apiResult.json()];
                case 2:
                    apiResultJSON = _a.sent();
                    return [2 /*return*/, apiResultJSON];
            }
        });
    });
}
function requestData() {
    return __awaiter(this, void 0, void 0, function () {
        var currencies, currencyPairs, end, start, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("requestData");
                    return [4 /*yield*/, store.findAll("currency", {
                            where: {
                                delisted: false,
                                disabled: false,
                                frozen: false
                            }
                        })];
                case 1:
                    currencies = _a.sent();
                    currencyPairs = currencies
                        .filter(function (x) { return x.key !== "BTC"; })
                        .map(function (x) { return "BTC_" + x.key; });
                    end = new Date().valueOf();
                    start = end - INTERVAL_IN_MILLISECONDS * 2;
                    return [4 /*yield*/, Promise.all(currencyPairs.map(function (currencyPair) {
                            return requestMarket(currencyPair, INTERVAL_IN_SECONDS, start, end);
                        }))];
                case 2:
                    results = _a.sent();
                    console.log("requestData results", results);
                    setTimeout(requestData, INTERVAL_IN_MILLISECONDS);
                    return [2 /*return*/];
            }
        });
    });
}
// requestData();
module.exports = function poloniex(app) {
    // Create a timeout system to scrape poloniex of data.
};
//# sourceMappingURL=poloniex.js.map