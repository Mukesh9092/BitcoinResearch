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

console.log(`http://${API_GRAPHQL_HOST}:${API_GRAPHQL_PORT}`);

expressServiceWithMiddleware(
  async app => {
    genericExpressService(app);
    loggerMiddleware(app);
    // authenticationHeaderExtractionMiddleware(app);

    const graphqlSchema = makeExecutableSchema({
      typeDefs: String(schema),
      resolvers: {
        RootQuery,
        // RootMutation,
      },
    });

    const graphiqlMiddleware = graphiqlExpress({
      endpointURL: '/api/graphql',
    });

    const graphqlMiddleware = graphqlExpress({
      schema: graphqlSchema,
    });

    app.use('/api/graphql/graphiql', graphiqlMiddleware);
    app.all('/api/graphql', (req, res, next) => {
      graphqlMiddleware(req, res, next);
    });

    return app;
  },
  String(API_GRAPHQL_HOST),
  Number(API_GRAPHQL_PORT),
);

unhandledError(console.log);
