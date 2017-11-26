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
var sortBy = require("lodash").sortBy;
var store = require("../../../lib/database/store");
var ensureTable = require("../../../lib/database/helpers").ensureTable;
var fetchPoloniex = require("../fetchPoloniex");
var rethinkDBAdapter = store.getAdapter("rethinkdb").r;
var MILLISECOND_MULTIPLIER = 1000;
function sanitize(a) {
    return sortBy(a, ["id"]);
}
function sanitizePoloniex(a) {
    return a.map(function (x) {
        x.id = x.date * MILLISECOND_MULTIPLIER;
        delete x.date;
        console.log("X", x);
        return x;
    });
}
function getCurrencyByKey(key) {
    return __awaiter(this, void 0, void 0, function () {
        var currencyAResult, currency;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.findAll("currency", {
                        where: {
                            key: key
                        }
                    })];
                case 1:
                    currencyAResult = _a.sent();
                    currency = currencyAResult[0];
                    if (!currency) {
                        throw new Error("Invalid currency: \"" + key + "\".");
                    }
                    return [2 /*return*/, currency];
            }
        });
    });
}
function getCurrencyPair(currencyPairKey) {
    return __awaiter(this, void 0, void 0, function () {
        var currencyPairResult, currencyPair;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.findAll("currencyPair", {
                        where: {
                            key: currencyPairKey
                        }
                    })];
                case 1:
                    currencyPairResult = _a.sent();
                    currencyPair = currencyPairResult[0];
                    if (!currencyPair) {
                        throw new Error("Invalid currency pair: \"" + currencyPairKey + "\"");
                    }
                    return [2 /*return*/, currencyPair];
            }
        });
    });
}
module.exports = function candlesticks(root, _a) {
    var currencyA = _a.currencyA, currencyB = _a.currencyB, period = _a.period, start = _a.start, end = _a.end;
    return __awaiter(this, void 0, void 0, function () {
        var currencyPairKey, currencyPair, tableName, queryResult, expectedDataSetSize, actualDataSetSize, dataPointsToQuery, apiEnd, apiStart, uri, apiResultJSON, documents;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    currencyPairKey = currencyA + "_" + currencyB;
                    return [4 /*yield*/, getCurrencyPair(currencyPairKey)];
                case 1:
                    currencyPair = _b.sent();
                    tableName = "candlesticks_" + currencyPairKey + "_" + period;
                    return [4 /*yield*/, ensureTable(rethinkDBAdapter, tableName)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, rethinkDBAdapter
                            .table(tableName)
                            .between(start, end)];
                case 3:
                    queryResult = _b.sent();
                    expectedDataSetSize = (end - start) / MILLISECOND_MULTIPLIER / period;
                    actualDataSetSize = queryResult.length;
                    console.log("expectedDataSetSize", expectedDataSetSize);
                    console.log("actualDataSetSize", actualDataSetSize);
                    if (actualDataSetSize >= expectedDataSetSize) {
                        return [2 /*return*/, sanitize(queryResult)];
                    }
                    dataPointsToQuery = expectedDataSetSize - actualDataSetSize;
                    apiEnd = end / MILLISECOND_MULTIPLIER;
                    apiStart = apiEnd - period * dataPointsToQuery;
                    uri = [
                        "command=returnChartData",
                        "&currencyPair=" + currencyPairKey,
                        "&start=" + apiStart,
                        "&end=" + apiEnd,
                        "&period=" + period
                    ].join("");
                    return [4 /*yield*/, fetchPoloniex(uri)];
                case 4:
                    apiResultJSON = _b.sent();
                    documents = sanitizePoloniex(apiResultJSON);
                    return [4 /*yield*/, rethinkDBAdapter
                            .table(tableName)
                            .insert(documents, { conflict: "update" })
                            .run()];
                case 5:
                    _b.sent();
                    return [2 /*return*/, documents];
            }
        });
    });
};
//# sourceMappingURL=candlesticks.js.map