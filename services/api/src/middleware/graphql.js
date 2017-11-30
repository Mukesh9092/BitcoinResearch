"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tools_1 = require("graphql-tools");
var graphql_server_express_1 = require("graphql-server-express");
var resolvers_1 = require("../graphql/resolvers");
var schema_1 = require("../graphql/schema");
module.exports = function (app) {
    app.all("/api/graphql", function (req, res, next) {
        // console.log("GRAPHQL REQUEST", req.url);
        // console.log("GRAPHQL HEADERS", req.headers);
        // console.log("GRAPHQL BODY", req.body);
        // console.log("GRAPHQL SESSION", req.session);
        // console.log("GRAPHQL USER", req.user);
        graphql_server_express_1.graphqlExpress({
            schema: graphql_tools_1.makeExecutableSchema({
                typeDefs: schema_1.default,
                resolvers: resolvers_1.default
            })
        })(req, res, next);
    });
    app.use("/api/graphiql", graphql_server_express_1.graphiqlExpress({
        endpointURL: "/api/graphql"
    }));
};
