parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"hq0Q":[function(require,module,exports) {
"use strict";function e(){return Boolean("undefined"!=typeof window)}function o(){return Boolean("undefined"==typeof window)}function n(){return Boolean("develop"===process.env.NODE_ENV)}function r(){return Boolean("production"===process.env.NODE_ENV)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.isBrowser=e,exports.isServer=o,exports.isDevelopment=n,exports.isProduction=r;
},{}],"liCR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getApolloClient=void 0;var e=s(require("dotenv")),r=s(require("cross-fetch")),t=require("lodash"),o=s(require("apollo-client")),i=require("apollo-link-http"),n=require("apollo-cache-inmemory"),l=require("../environment");function s(e){return e&&e.__esModule?e:{default:e}}e.default.config();const{API_HOST:c,API_PORT:u}=process.env,a=(0,t.memoize)((e={})=>{const t=(0,l.isServer)(),s=e.cache||new n.InMemoryCache,a=e.uri||t&&`http://${c}:${u}/`||"http://api.localtest.me";t||s.restore(window.__APOLLO_STATE__);const p=e.link||new i.HttpLink({uri:a,fetch:r.default});return new o.default({cache:s,link:p,ssrMode:(0,l.isServer)()})});exports.getApolloClient=a;
},{"../environment":"hq0Q"}],"tfaT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createUserWithDashboard=void 0;var e=a(require("graphql-tag"));function a(e){return e&&e.__esModule?e:{default:e}}const r=e.default`
  mutation createUserWithDashboard($name: String!) {
    createUser(data: { name: $name, dashboard: { create: {} } }) {
      id
      name
      dashboard {
        id
      }
    }
  }
`;exports.createUserWithDashboard=r;
},{}],"BWKC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.deleteManyCharts=void 0;var e=t(require("graphql-tag"));function t(e){return e&&e.__esModule?e:{default:e}}const r=e.default`
  mutation {
    deleteManyCharts(where: {}) {
      count
    }
  }
`;exports.deleteManyCharts=r;
},{}],"ld7y":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getUserIds=void 0;var e=r(require("graphql-tag"));function r(e){return e&&e.__esModule?e:{default:e}}const t=e.default`
  query {
    users {
      id
    }
  }
`;exports.getUserIds=t;
},{}],"oLo9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ensureInitialData=l;var e=o(require("dotenv")),t=require("../common/apollo/client"),a=require("./mutations/createUserWithDashboard"),r=require("./mutations/deleteManyCharts"),n=require("./queries/getUserIds");function o(e){return e&&e.__esModule?e:{default:e}}e.default.config();const{PRISMA_HOST:s,PRISMA_PORT:i}=process.env;async function l(){var e,o;console.log("ensureInitialData");const l=(0,t.getApolloClient)({uri:`http://${s}:${i}`}),u=await l.query({query:n.getUserIds});if((null==u?void 0:null===(e=u.data)||void 0===e?void 0:null===(o=e.users)||void 0===o?void 0:o.length)>0)console.log("ensureInitialData users exist, removing charts"),await l.mutate({mutation:r.deleteManyCharts}),console.log("ensureInitialData charts removed");else{console.log("ensureInitialData creating new users");const e=await l.mutate({mutation:a.createUserWithDashboard,variables:{name:"admin"}});console.log("ensureInitialData createUserWithDashboardResult",e)}console.log("ensureInitialData done")}
},{"../common/apollo/client":"liCR","./mutations/createUserWithDashboard":"tfaT","./mutations/deleteManyCharts":"BWKC","./queries/getUserIds":"ld7y"}],"zxsU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const{MARKETSTORE_API_HOST:e,MARKETSTORE_API_PORT:t}=process.env,s="BTC";var a=async(s,a,r,o)=>{const p=`http://${e}:${t}/markets`,T=await fetch(p),c=await T.text();return JSON.parse(c).map(e=>({base:e,quote:"BTC"}))};exports.default=a;
},{}],"iMHQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./getMarkets"));function t(e){return e&&e.__esModule?e:{default:e}}var r={getMarkets:e.default};exports.default=r;
},{"./getMarkets":"zxsU"}],"Wa2H":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./Query"));function r(e){return e&&e.__esModule?e:{default:e}}var t={Query:e.default};exports.default=t;
},{"./Query":"iMHQ"}],"QCba":[function(require,module,exports) {
"use strict";var e=a(require("@babel/runtime/helpers/defineProperty")),r=require("apollo-server"),t=a(require("dotenv")),n=require("graphql-import"),o=require("prisma-binding"),i=require("./importer/ensure-initial-data"),s=a(require("./resolvers"));function a(e){return e&&e.__esModule?e:{default:e}}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function p(r){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){(0,e.default)(r,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(n,e))})}return r}t.default.config();const l=Number(process.env.APP_PORT_IN),u=String(process.env.PRISMA_HOST),f=Number(process.env.PRISMA_PORT),b=s.default,d=(0,n.importSchema)("./src/datamodel.graphql"),O=e=>p({},e,{prisma:new o.Prisma({typeDefs:"src/datamodel.prisma.gen.graphql",endpoint:`http://${u}:${f}`,debug:!0})}),g=new r.ApolloServer({typeDefs:d,resolvers:b,context:O}),m=async()=>{try{const{url:r}=await g.listen({port:l});console.log(`GraphQL server is running on ${r}`),await(0,i.ensureInitialData)(),console.log("Seeded initial data")}catch(e){console.error(e)}};m();
},{"./importer/ensure-initial-data":"oLo9","./resolvers":"Wa2H"}]},{},["QCba"], null)
//# sourceMappingURL=/index.js.map