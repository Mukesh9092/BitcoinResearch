import { Schema } from "js-data";

export default new Schema({
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "OrderBook",
  description: "OrderBook",

  type: "object",
  properties: {
    id: {
      type: "string"
    },

    currencyA: {
      type: "string"
    },

    currencyB: {
      type: "string"
    },

    type: {
      type: "string"
    },

    price: {
      type: "number"
    },

    amount: {
      type: "number"
    }
  }
});
