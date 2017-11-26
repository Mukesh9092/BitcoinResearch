const { makeExecutableSchema } = require("graphql-tools");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");

const resolvers = require("../graphql/resolvers");
const schema = require("../graphql/schema");

module.exports = app => {
  app.all("/api/graphql", (req, res, next) => {
    // console.log("GRAPHQL REQUEST", req.url);
    // console.log("GRAPHQL HEADERS", req.headers);
    // console.log("GRAPHQL BODY", req.body);
    // console.log("GRAPHQL SESSION", req.session);
    // console.log("GRAPHQL USER", req.user);

    graphqlExpress({
      schema: makeExecutableSchema({
        typeDefs: schema,
        resolvers
      })
    })(req, res, next);
  });

  app.use(
    "/api/graphiql",
    graphiqlExpress({
      endpointURL: "/api/graphql"
    })
  );
};
