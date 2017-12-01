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

    email: {
      type: "string"
    },

    username: {
      type: "string"
    },

    password_seed: {
      type: "string"
    },

    password_hash: {
      type: "string"
    },

    disabled: {
      type: "boolean"
    },

    frozen: {
      type: "boolean"
    },

    delisted: {
      type: "boolean"
    }
  }
});
