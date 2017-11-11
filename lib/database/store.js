const { Container } = require('js-data');

const adapter = require('./adapter');

const Candlestick = require('./schemas/Candlestick');
const Currency = require('./schemas/Currency');
const LoanOrder = require('./schemas/LoanOrder');
const OrderBookEntry = require('./schemas/OrderBookEntry');
const User = require('./schemas/User');

const store = new Container();

store.registerAdapter('rethinkdb', adapter, { default: true });

store.defineMapper('candlestick', {
  table: 'candlesticks',
  schema: Candlestick,
})

store.defineMapper('currency', {
  table: 'currencies',
  schema: Currency,
})

store.defineMapper('loanorder', {
  table: 'loanorders',
  schema: LoanOrder,
})

store.defineMapper('orderbookentry', {
  table: 'orderbookentries',
  schema: OrderBookEntry,
})

store.defineMapper('user', {
  table: 'users',
  schema: User,
})


module.exports = store;