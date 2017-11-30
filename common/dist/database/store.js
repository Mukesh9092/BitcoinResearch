"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_data_1 = require("js-data");
var adapter_1 = require("./adapter");
var Candlestick_1 = require("./schemas/Candlestick");
var CurrencyPair_1 = require("./schemas/CurrencyPair");
var LoanOrder_1 = require("./schemas/LoanOrder");
var OrderBookEntry_1 = require("./schemas/OrderBookEntry");
var User_1 = require("./schemas/User");
var store = new js_data_1.Container();
store.registerAdapter("rethinkdb", adapter_1.default, { default: true });
store.defineMapper("candlestick", {
    table: "candlesticks",
    schema: Candlestick_1.default
});
store.defineMapper("currencyPair", {
    table: "currencyPairs",
    schema: CurrencyPair_1.default
});
store.defineMapper("loanorder", {
    table: "loanorders",
    schema: LoanOrder_1.default
});
store.defineMapper("orderbookentry", {
    table: "orderbookentries",
    schema: OrderBookEntry_1.default
});
store.defineMapper("user", {
    table: "users",
    schema: User_1.default
});
exports.default = store;
