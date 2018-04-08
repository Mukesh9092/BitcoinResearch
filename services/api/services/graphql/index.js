import { createServer } from 'http'

import unhandledError from 'unhandled-error'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import * as RootSubscription from './resolvers/RootSubscription'
import Date from './resolvers/Date'
import RootQuery from './resolvers/RootQuery'
import schema from './schema'
import { pubsub } from './pubsub'

import authenticationHeaderExtractionMiddleware from '../../common/middleware/authenticationHeaderExtraction'
import expressServiceWithMiddleware from '../../common/middleware/expressServiceWith'
import genericExpressService from '../../common/middleware/genericExpressService'
import loggerMiddleware from '../../common/middleware/logger'
import { getHemeraClient } from '../../common/hemera/client'

const { API_GRAPHQL_HOST, API_GRAPHQL_PORT, API_GRAPHQL_WS_PORT } = process.env

expressServiceWithMiddleware(
  async app => {
    genericExpressService(app)
    loggerMiddleware(app)
    // TODO: Authenticate and authorize all graphql API requests with express through redis and postgresql.
    // authenticationHeaderExtractionMiddleware(app);

    const graphqlSchema = makeExecutableSchema({
      typeDefs: String(schema),
      resolvers: {
        RootQuery,
        RootSubscription,
      },
    })

    const graphiqlMiddleware = graphiqlExpress({
      endpointURL: '/api/graphql',
    })

    const graphqlMiddleware = graphqlExpress({
      schema: graphqlSchema,
    })

    app.use('/api/graphql/graphiql', graphiqlMiddleware)
    app.all('/api/graphql', (req, res, next) => {
      graphqlMiddleware(req, res, next)
    })

    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server: app.server,
        path: '/api/graphql/subscriptions',
      },
    )

    const hemera = await getHemeraClient()

    // Apparently you need to handle all of them in each client.
    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBook' },
      async event => {
        return true
      },
    )

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookModify' },
      async event => {
        try {
          pubsub.publish('OrderBookEvents:orderBookModify', {
            orderBookModify: event.data,
          })

          return true
        } catch (error) {
          throw error
        }
      },
    )

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookRemove' },
      async event => {
        try {
          pubsub.publish('OrderBookEvents:orderBookRemove', {
            orderBookRemove: event.data,
          })

          return true
        } catch (error) {
          throw error
        }
      },
    )

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookNewTrade' },
      async event => {
        try {
          pubsub.publish('OrderBookEvents:orderBookNewTrade', {
            orderBookNewTrade: event.data,
          })

          return true
        } catch (error) {
          throw error
        }
      },
    )

    return app
  },
  String(API_GRAPHQL_HOST),
  Number(API_GRAPHQL_PORT),
)

unhandledError(console.log)
