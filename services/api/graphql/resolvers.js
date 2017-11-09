const { Kind } = require("graphql/language");

const store = require('../lib/models/store');
const candlestick = require("../lib/models/candlestick");
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
  Date: {
    __serialize: value => {
      return value.getTime();
    },

    __parseValue: value => {
      if (isNumber(value)) {
        return value;
      }

      if (isDate(value)) {
        return Math.ceil(value.valueOf() / 1000);
      }

      return Math.ceil(new Date(value).valueOf() / 1000);
    },

    __parseLiteral: ast => {
      if (ast.kind === Kind.INT) {
        return ast.value;
      }
    }
  },

  Candlestick: {
    currencyA: ({ currencyA }) => {
      return store.find('currency', currencyA)
    },

    currencyB: ({ currencyB }) => {
      return store.find('currency', currencyB)
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

    currencies: async () => {
      const queryResult = await store.findAll('currency');

      if (queryResult && queryResult.length) {
        return queryResult;
      }

      const queryURL = `https://poloniex.com/public?command=returnCurrencies`;

      const apiResult = await fetch(queryURL)
      const apiResultJSON = await apiResult.json()

      if (apiResultJSON.error) {
        throw new Error(apiResultJSON.error)
      }

      const keys = Object.keys(apiResultJSON);

      const documents = Object.values(apiResultJSON).map((v, i) => {
        delete v.id;
        delete v.depositAddress;

        v.key = keys[i];

        v.frozen = !!v.frozen;
        v.delisted = !!v.delisted;
        v.disabled = !!v.disabled;

        return v;
      });

      await store.destroyAll('currency');

      const createResult = await store.createMany('currency', documents);

      return createResult;
    },

    currencyById: (root, { id }) => {
      return currency.getCurrencyById(id);
    },

    candlesticks: async (root, { currencyA: currencyAKey, currencyB: currencyBKey, period, start, end }) => {
      const currencyAResult = await store.findAll('currency', {
        where: {
          key: currencyAKey,
        },
      })

      if (currencyAResult.length !== 1) {
        throw new Error(`Invalid currency: ${currencyA}.`)
      }

      const [currencyA] = currencyAResult;

      const currencyBResult = await store.findAll('currency', {
        where: {
          key: currencyBKey,
        },
      })

      if (currencyBResult.length !== 1) {
        throw new Error(`Invalid currency: ${currencyB}.`)
      }

      const [currencyB] = currencyBResult;

      // Efficient between query.
      const queryResult = await store.getAdapter("rethinkdb").r.table('candlesticks').between(start, end)

      if (queryResult && queryResult.length) {
        return queryResult;
      }

      const currencyPair = `${currencyA.key}_${currencyB.key}`;

      const queryURL = `https://poloniex.com/public?command=returnChartData&currencyPair=${currencyPair}&start=${start}&end=${end}&period=${period}`;

      const apiResult = await fetch(queryURL)
      const apiResultJSON = await apiResult.json()

      if (apiResultJSON.error) {
        throw new Error(apiResultJSON.error)
      }

      const documents = apiResultJSON
        .map(x => {
          x.id = x.date
          delete x.date

          x.currencyA = currencyA.id
          x.currencyB = currencyB.id

          return x
        })

      // Upsert.
      await store.getAdapter("rethinkdb").r.table('candlesticks').insert(documents, { conflict: "update" }).run();

      return documents;
    },
  },

  RootMutation: {
    // TODO: Remove.
    loginWithEmailPassword: (root, args) => {
      return null;
    }
  }
};
