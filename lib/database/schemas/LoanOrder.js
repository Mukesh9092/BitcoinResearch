const { Schema } = require("js-data");

const LoanOrder = new Schema({
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'LoanOrder',
  description: 'LoanOrder',

  type: 'object',
  properties: {
    id: {
      type: 'string',
    },

    rate: {
      type: 'number',
    },

    amount: {
      type: 'number',
    },

    rangeMin: {
      type: 'number',
    },

    rangeMax: {
      type: 'number',
    },
  }
});

module.exports = LoanOrder;
