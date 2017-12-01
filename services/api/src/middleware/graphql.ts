import { makeExecutableSchema } from "graphql-tools";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { Application } from "express";

import resolvers from "../graphql/resolvers";
import schema from "../graphql/schema";

export default function graphql(app: Application): void {
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
}
