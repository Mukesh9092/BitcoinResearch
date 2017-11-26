"use strict";
var makeExecutableSchema = require("graphql-tools").makeExecutableSchema;
var _a = require("graphql-server-express"), graphqlExpress = _a.graphqlExpress, graphiqlExpress = _a.graphiqlExpress;
var resolvers = require("../graphql/resolvers");
var schema = require("../graphql/schema");
module.exports = function (app) {
    app.all("/api/graphql", function (req, res, next) {
        // console.log("GRAPHQL REQUEST", req.url);
        // console.log("GRAPHQL HEADERS", req.headers);
        // console.log("GRAPHQL BODY", req.body);
        // console.log("GRAPHQL SESSION", req.session);
        // console.log("GRAPHQL USER", req.user);
        graphqlExpress({
            schema: makeExecutableSchema({
                typeDefs: schema,
                resolvers: resolvers
            })
        })(req, res, next);
    });
    app.use("/api/graphiql", graphiqlExpress({
        endpointURL: "/api/graphql"
    }));
};
//# sourceMappingURL=graphql.js.map