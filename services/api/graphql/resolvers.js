const { Kind } = require("graphql/language");

const candlestick = require("../lib/models/candlestick");
const currency = require("../lib/models/currency");
const user = require("../lib/models/user");

const { isDate, isString, isNumber } = require('lodash');

const jsonresult = a => {
  if (Array.isArray(a)) {
    return a.map(x => {
      return x.toJSON();
    });
  }

  return a.toJSON();
};

module.exports = {
  /*
  Currency: {
  },
  */

  Date: {
    __serialize: value => {
      console.log('Date#__serialize', value)

      return value.getTime();
    },

    __parseValue: value => {
      console.log('Date#__parseValue', value)

      if (isNumber(value)) {
        return value;
      }

      if (isDate(value)) {
        return Math.ceil(value.valueOf() / 1000);
      }

      return Math.ceil(new Date(value).valueOf() / 1000);
    },

    __parseLiteral: ast => {
      console.log('Date#__parseLiteral', ast)

      if (ast.kind === Kind.INT) {
        return ast.value;
      }
    }
  },

  Candlestick: {
    currencyA: ({ currencyA }) => {
      return currency.getCurrencyById(currencyA)
    },

    currencyB: ({ currencyB }) => {
      return currency.getCurrencyById(currencyB)
    },
  },

  RootQuery: {
    users: () => {
      return user.getUsers();
    },

    userById: (root, { id }) => {
      return user.getUserById(id);
    },

    userByEmail: (root, { email }) => {
      return user.getUserByEmail(email);
    },

    currencies: () => {
      return currency.getCurrencies();
    },

    currencyById: (root, { id }) => {
      return currency.getCurrencyById(id);
    },

    candlesticks: (root, { currencyA, currencyB, period, start, end }) => {
      return candlestick.getCandlesticks(currencyA, currencyB, period, start, end);
    }
  },

  RootMutation: {
    // TODO: Remove.
    loginWithEmailPassword: (root, args) => {
      return null;
    }
  }
};
