import { Container } from "js-data";

import adapter from "./adapter";

import Candlestick from "./schemas/Candlestick";
import CurrencyPair from "./schemas/CurrencyPair";
import LoanOrder from "./schemas/LoanOrder";
import OrderBookEntry from "./schemas/OrderBookEntry";
import User from "./schemas/User";

const store = new Container();

store.registerAdapter("rethinkdb", adapter, { default: true });

store.defineMapper("candlestick", {
  table: "candlesticks",
  schema: Candlestick
});

store.defineMapper("currencyPair", {
  table: "currencyPairs",
  schema: CurrencyPair
});

store.defineMapper("loanorder", {
  table: "loanorders",
  schema: LoanOrder
});

store.defineMapper("orderbookentry", {
  table: "orderbookentries",
  schema: OrderBookEntry
});

store.defineMapper("user", {
  table: "users",
  schema: User
});

export default store;
