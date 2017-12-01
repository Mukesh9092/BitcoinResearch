import { Schema } from "js-data";

export default new Schema({
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "LoanOrder",
  description: "LoanOrder",

  type: "object",
  properties: {
    id: {
      type: "string"
    },

    rate: {
      type: "number"
    },

    amount: {
      type: "number"
    },

    rangeMin: {
      type: "number"
    },

    rangeMax: {
      type: "number"
    }
  }
});
