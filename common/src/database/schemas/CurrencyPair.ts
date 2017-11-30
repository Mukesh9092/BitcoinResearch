import { Schema } from "js-data";

export default new Schema({
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "CurrencyPair",
  description: "Represents one market of currencies",

  type: "object",
  properties: {
    id: {
      type: "string"
    },

    key: {
      type: "string"
    },

    currencyA: {
      type: "object",

      properties: {
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
        }
      }
    },

    currencyB: {
      type: "object",

      properties: {
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
        }
      }
    },

    volume24h: {
      type: "object",

      properties: {
        currencyAVolume: {
          type: "string"
        },

        currencyBVolume: {
          type: "string"
        }
      }
    }
  }
});
