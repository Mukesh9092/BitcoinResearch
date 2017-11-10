const { Schema } = require("js-data");

const OrderBookEntry = new Schema({
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'OrderBook',
  description: 'OrderBook',

  type: 'object',
  properties: {
    id: {
      type: 'string',
    },

    currencyA: {
      type: 'string',
    },

    currencyB: {
      type: 'string',
    },

    type: {
      type: 'string',
    },

    price: {
      type: 'number',
    },

    amount: {
      type: 'number',
    },
  }
});

module.exports = OrderBookEntry;
