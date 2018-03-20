import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { Application } from 'express';

import schema from '../graphql/schema';

import Date from '../graphql/resolvers/Date';

import RootQuery from '../graphql/resolvers/RootQuery';
// import RootMutation from '../graphql/resolvers/RootMutation';

export default function graphql(app: Application): void {
  app.all('/api/graphql', (req, res, next) => {
    // console.log("GRAPHQL REQUEST", req.url);
    // console.log("GRAPHQL HEADERS", req.headers);
    // console.log("GRAPHQL BODY", req.body);
    // console.log("GRAPHQL SESSION", req.session);
    // console.log("GRAPHQL USER", req.user);

    graphqlExpress({
      schema: makeExecutableSchema({
        typeDefs: String(schema),
        resolvers: {
          RootQuery,
          // RootMutation,
        },
      }),
    })(req, res, next);
  });

  app.use(
    '/api/graphiql',
    graphiqlExpress({
      endpointURL: '/api/graphql',
    }),
  );
}
