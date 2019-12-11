// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"context.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _prismaBinding = require("prisma-binding");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const PRISMA_HOST = String(process.env.PRISMA_HOST);
const PRISMA_PORT = Number(process.env.PRISMA_PORT);
const prismaClientOptions = {
  typeDefs: 'src/datamodel.prisma.gen.graphql',
  endpoint: `http://${PRISMA_HOST}:${PRISMA_PORT}`,
  debug: true
};

const context = req => {
  return _objectSpread({}, req, {
    prisma: new _prismaBinding.Prisma(prismaClientOptions)
  });
};

var _default = context;
exports.default = _default;
},{}],"common/environment.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBrowser = isBrowser;
exports.isServer = isServer;
exports.isDevelopment = isDevelopment;
exports.isProduction = isProduction;

function isBrowser() {
  return Boolean(typeof window !== 'undefined');
}

function isServer() {
  return Boolean(typeof window === 'undefined');
}

function isDevelopment() {
  return Boolean(process.env.NODE_ENV === 'develop');
}

function isProduction() {
  return Boolean(process.env.NODE_ENV === 'production');
}
},{}],"common/apollo/client.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApolloClient = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

var _lodash = require("lodash");

var _apolloClient = _interopRequireDefault(require("apollo-client"));

var _apolloLinkHttp = require("apollo-link-http");

var _apolloCacheInmemory = require("apollo-cache-inmemory");

var _environment = require("../environment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const {
  API_HOST,
  API_PORT
} = process.env;
const getApolloClient = (0, _lodash.memoize)((options = {}) => {
  const server = (0, _environment.isServer)();
  const cache = options.cache || new _apolloCacheInmemory.InMemoryCache();
  const uri = options.uri || server && `http://${API_HOST}:${API_PORT}/` || `http://api.localtest.me`;

  if (!server) {
    // eslint-disable-next-line no-underscore-dangle
    cache.restore(window.__APOLLO_STATE__);
  }

  const link = options.link || new _apolloLinkHttp.HttpLink({
    uri,
    fetch: _crossFetch.default
  });
  const client = new _apolloClient.default({
    cache,
    link,
    ssrMode: (0, _environment.isServer)()
  });
  return client;
});
exports.getApolloClient = getApolloClient;
},{"../environment":"common/environment.ts"}],"importer/mutations/createUserWithDashboard.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUserWithDashboard = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUserWithDashboard = _graphqlTag.default`
  mutation createUserWithDashboard($name: String!) {
    createUser(data: { name: $name, dashboard: { create: {} } }) {
      id
      name
      dashboard {
        id
      }
    }
  }
`;
exports.createUserWithDashboard = createUserWithDashboard;
},{}],"importer/queries/getUserIds.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserIds = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUserIds = _graphqlTag.default`
  query {
    users {
      id
    }
  }
`;
exports.getUserIds = getUserIds;
},{}],"importer/ensure-initial-data.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureInitialData = ensureInitialData;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _client = require("../common/apollo/client");

var _createUserWithDashboard = require("./mutations/createUserWithDashboard");

var _getUserIds = require("./queries/getUserIds");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const {
  PRISMA_HOST,
  PRISMA_PORT
} = process.env;

async function ensureInitialData() {
  var _usersResult$data, _usersResult$data$use;

  console.log('ensureInitialData');
  const apolloClient = (0, _client.getApolloClient)({
    uri: `http://${PRISMA_HOST}:${PRISMA_PORT}`
  });
  const usersResult = await apolloClient.query({
    query: _getUserIds.getUserIds
  });
  const usersExist = (usersResult === null || usersResult === void 0 ? void 0 : (_usersResult$data = usersResult.data) === null || _usersResult$data === void 0 ? void 0 : (_usersResult$data$use = _usersResult$data.users) === null || _usersResult$data$use === void 0 ? void 0 : _usersResult$data$use.length) > 0;

  if (usersExist) {// console.log('ensureInitialData users exist, removing charts')
    // await apolloClient.mutate({ mutation: deleteManyCharts })
    // console.log('ensureInitialData charts removed')
  } else {
    console.log('ensureInitialData creating new users');
    const createUserWithDashboardResult = await apolloClient.mutate({
      mutation: _createUserWithDashboard.createUserWithDashboard,
      variables: {
        name: 'admin'
      }
    });
    console.log('ensureInitialData createUserWithDashboardResult', createUserWithDashboardResult);
  }

  console.log('ensureInitialData done');
}
},{"../common/apollo/client":"common/apollo/client.js","./mutations/createUserWithDashboard":"importer/mutations/createUserWithDashboard.ts","./queries/getUserIds":"importer/queries/getUserIds.ts"}],"resolvers/Query/getMarkets.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const {
  MARKETSTORE_API_HOST,
  MARKETSTORE_API_PORT
} = process.env; // TODO: Get from somewhere.

const quote = 'BTC';

var _default = async (_parent, _args, _context, _info) => {
  const host = MARKETSTORE_API_HOST;
  const port = MARKETSTORE_API_PORT;
  const url = `http://${host}:${port}/markets`;
  console.log('getMarkets:url', url);
  const fetchResult = await fetch(url);
  console.log('getMarkets:fetchResult', fetchResult);
  const fetchResultText = await fetchResult.text();
  console.log(`getMarkets:fetchResultText "${fetchResultText}"`, typeof fetchResultText);
  const fetchResultJSON = JSON.parse(fetchResultText);
  console.log('getMarkets:fetchResultJSON', fetchResultJSON);
  const output = fetchResultJSON.map(base => {
    return {
      base,
      quote
    };
  });
  console.log('getMarkets:output', output);
  return output;
};

exports.default = _default;
},{}],"resolvers/Query/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getMarkets = _interopRequireDefault(require("./getMarkets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import getChartById from './getChartById'
// import getCurrentUser from './getCurrentUser'
// import getDashboard from './getDashboard'
// import getOHLCVs from './getOHLCVs'
var _default = {
  // getChartById,
  // getCurrentUser,
  // getDashboard,
  getMarkets: _getMarkets.default // getOHLCVs,

};
exports.default = _default;
},{"./getMarkets":"resolvers/Query/getMarkets.ts"}],"resolvers/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Query = _interopRequireDefault(require("./Query"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Chart from './Chart'
// import Mutation from './Mutation'
// import Market from './Market'
var _default = {
  // Chart,
  // Mutation,
  // Market,
  Query: _Query.default
};
exports.default = _default;
},{"./Query":"resolvers/Query/index.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _apolloServer = require("apollo-server");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _graphqlImport = require("graphql-import");

var _context = _interopRequireDefault(require("./context"));

var _ensureInitialData = require("./importer/ensure-initial-data");

var _resolvers = _interopRequireDefault(require("./resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const main = async () => {
  try {
    console.log('main');
    const API_PORT_IN = Number(process.env.API_PORT_IN);
    console.log('main:API_PORT_IN', API_PORT_IN);
    console.log('main:initial-data');
    await (0, _ensureInitialData.ensureInitialData)();
    console.log('main:initial-data:complete');
    const apolloServer = new _apolloServer.ApolloServer({
      typeDefs: (0, _graphqlImport.importSchema)('./src/datamodel.graphql'),
      resolvers: _resolvers.default,
      context: _context.default
    });
    const {
      url
    } = await apolloServer.listen({
      port: API_PORT_IN
    });
    console.log('main:url', url);
  } catch (error) {
    console.error(error);
  }
};

main();
},{"./context":"context.ts","./importer/ensure-initial-data":"importer/ensure-initial-data.ts","./resolvers":"resolvers/index.ts"}]},{},["index.ts"], null)
//# sourceMappingURL=/index.js.map