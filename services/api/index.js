import unhandledError from 'unhandled-error'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import expressServiceWithMiddleware from './common/middleware/expressServiceWith'
import genericExpressService from './common/middleware/genericExpressService'
import loggerMiddleware from './common/middleware/logger'
import { importMarkets } from './common/database/repositories/market'
import { log } from './common/log'
import RootQuery from './resolvers/RootQuery'
import schema from './schema'

import apiKeys from './apiKeys.json'

log.setLevel('debug')

const { API_HOST, API_PORT } = process.env

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24

expressServiceWithMiddleware(
  async (app) => {
    genericExpressService(app)
    loggerMiddleware(app)

    const graphqlSchema = makeExecutableSchema({
      typeDefs: String(schema),
      resolvers: {
        RootQuery,
      },
    })

    app.use(
      '/graphql',
      graphqlExpress({
        schema: graphqlSchema,
        debug: true,
      }),
    )

    app.use(
      '/graphiql',
      graphiqlExpress({
        endpointURL: '/graphql',
      }),
    )

    return app
  },
  String(API_HOST),
  Number(API_PORT),
)

setInterval(() => {
  return importMarkets(apiKeys)
}, ONE_DAY_IN_MILLISECONDS)
importMarkets(apiKeys)

unhandledError(log.debug)
