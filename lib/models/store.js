const { Container } = require('js-data');

const adapter = require('./adapter');

const Candlestick = require('./Candlestick');
const Currency = require('./Currency');

const store = new Container();

store.registerAdapter('rethinkdb', adapter, { default: true });

store.defineMapper('currency', {
  table: 'currencies',
  schema: Currency,
})

store.defineMapper('candlestick', {
  table: 'candlesticks',
  schema: Candlestick,
})

module.exports = store;
