"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_apollo_1 = require("react-apollo");
var isomorphic_fetch_1 = require("isomorphic-fetch");
var environment_1 = require("../environment");
// Polyfill fetch() on the server (used by apollo-client)
if (!environment_1.isBrowser()) {
    global.fetch = isomorphic_fetch_1.default;
}
var apolloClient = null;
function createApolloClient(initialState) {
    if (apolloClient) {
        return apolloClient;
    }
    var uri;
    if (environment_1.isBrowser()) {
        uri = "/api/graphql";
    }
    else {
        var _a = process.env, API_HOST = _a.API_HOST, API_PORT = _a.API_PORT;
        uri = "http://" + API_HOST + ":" + API_PORT + "/api/graphql";
    }
    apolloClient = new react_apollo_1.ApolloClient({
        initialState: initialState,
        // Disables forceFetch on the server (so queries are only run once)
        ssrMode: !environment_1.isBrowser(),
        networkInterface: react_apollo_1.createNetworkInterface({
            // Server URL (must be absolute)
            uri: uri,
            opts: {
                // Additional fetch() options like `credentials` or `headers`
                credentials: "same-origin"
            }
        })
    });
    return apolloClient;
}
exports.default = createApolloClient;
