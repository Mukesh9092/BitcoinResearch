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
})({"common/environment.ts":[function(require,module,exports) {
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
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var _bodyParser = require("body-parser");

var _ccxt = _interopRequireDefault(require("ccxt"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _environment = require("./common/environment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = Number(process.env.TRADER_PORT_IN);
console.log(`PORT=${PORT}`);
const expressServer = (0, _express.default)();
expressServer.use((0, _bodyParser.json)());
expressServer.use((0, _cors.default)());

if ((0, _environment.isDevelopment)()) {
  expressServer.use((0, _morgan.default)('dev'));
} else {
  expressServer.use((0, _morgan.default)('common'));
}

expressServer.get('/healthcheck', (_req, res) => {
  res.json({
    health: 'ok'
  });
});
const binance = new _ccxt.default.binance();
const poloniex = new _ccxt.default.poloniex();
const exchanges = {
  binance,
  poloniex
};
expressServer.get('/traders/:name', (req, res) => {
  const name = req.params.name; // TODO: - Fetch the Exchange from the DB.
  //         - GraphQL Client of Keystone Service
  //       - Find Periodic channel in Service to keep DB up to date with ccxt
  //       - Set 24 hour update of exchanges.

  res.json({
    name
  });
});
expressServer.listen(PORT, error => {
  if (error) {
    console.error(error);
  }

  console.log(`Listening on 0.0.0.0:${PORT}`);
});
},{"./common/environment":"common/environment.ts"}]},{},["index.ts"], null)
//# sourceMappingURL=/index.js.map