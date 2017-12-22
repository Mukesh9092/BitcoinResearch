import { makeExecutableSchema } from "graphql-tools";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { Application } from "express";

import schema from "../graphql/schema";
import store from "../common/database/store";

import * as Date from "../graphql/resolvers/Date"
import * as Candlestick from "../graphql/resolvers/Candlestick"

import {
  userById,
  candlesticks,
  currencyPairs,
} from "../graphql/resolvers/RootQuery"

const resolversObject = {
  Date,

  Candlestick,

  RootQuery: {
    userById,
    candlesticks,
    currencyPairs,
  },

  RootMutation: {
  },
};

// console.log('RESOLVERS', resolversObject);

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
        resolvers: resolversObject,
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
