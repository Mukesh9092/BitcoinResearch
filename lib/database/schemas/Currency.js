const { Schema } = require("js-data");

const Currency = new Schema({
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "Currency",
  description: "Represents one virtual coin",

  type: "object",
  properties: {
    id: {
      type: "string"
    },

    key: {
      type: "string"
    },

    name: {
      type: "string"
    },

    txFee: {
      type: "string"
    },

    minConf: {
      type: "number"
    },

    disabled: {
      type: "boolean"
    },

    delisted: {
      type: "boolean"
    },

    frozen: {
      type: "boolean"
    }
  }
});

module.exports = Currency;
