import unhandledError from 'unhandled-error'
import { graphqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import * as RootSubscription from './resolvers/RootSubscription'
import RootQuery from './resolvers/RootQuery'
import schema from './schema'

import expressServiceWithMiddleware from './common/middleware/expressServiceWith'
import genericExpressService from './common/middleware/genericExpressService'
import loggerMiddleware from './common/middleware/logger'
import { log } from './common/log'

log.setLevel('debug')

const { API_GRAPHQL_HOST, API_GRAPHQL_PORT, API_GRAPHQL_WS_PORT } = process.env

expressServiceWithMiddleware(
  async (app) => {
    genericExpressService(app)
    loggerMiddleware(app)

    const graphqlSchema = makeExecutableSchema({
      typeDefs: String(schema),
      resolvers: {
        RootQuery,
        RootSubscription,
      },
    })

    const graphqlMiddleware = graphqlExpress({
      schema: graphqlSchema,
      debug: true,
    })

    app.use(graphqlMiddleware)

    /*
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
    */

    return app
  },
  String(API_GRAPHQL_HOST),
  Number(API_GRAPHQL_PORT),
)

unhandledError(console.log)
