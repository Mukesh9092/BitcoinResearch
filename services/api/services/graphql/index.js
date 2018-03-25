import unhandledError from 'unhandled-error';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import schema from './schema';
import Date from './resolvers/Date';
import RootQuery from './resolvers/RootQuery';

import authenticationHeaderExtractionMiddleware from '../../common/middleware/authenticationHeaderExtraction';
import expressServiceWithMiddleware from '../../common/middleware/expressServiceWith';
import genericExpressService from '../../common/middleware/genericExpressService';
import loggerMiddleware from '../../common/middleware/logger';

const { API_GRAPHQL_HOST, API_GRAPHQL_PORT } = process.env;

expressServiceWithMiddleware(
  async app => {
    genericExpressService(app);
    loggerMiddleware(app);
    authenticationHeaderExtractionMiddleware(app);

    app.all('/api/graphql', (req, res, next) => {
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

    return app;
  },
  String(API_GRAPHQL_HOST),
  Number(API_GRAPHQL_PORT),
);

unhandledError(console.log);
