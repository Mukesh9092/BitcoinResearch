import { Schema } from "js-data";

export default new Schema({
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "Candlestick",
  description: "Represents one period of the chart",

  type: "object",
  properties: {
    id: {
      type: "number"
    },

    currencyA: {
      type: "string"
    },

    currencyB: {
      type: "string"
    },

    high: {
      type: "number"
    },

    low: {
      type: "number"
    },

    open: {
      type: "number"
    },

    close: {
      type: "number"
    },

    volume: {
      type: "number"
    },

    quoteVolume: {
      type: "number"
    },

    weightedAverage: {
      type: "number"
    }
  }
});
