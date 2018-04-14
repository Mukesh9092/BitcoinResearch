import { createServer } from 'http'

import unhandledError from 'unhandled-error'
import { graphiqlExpress } from 'apollo-server-express'

import expressServiceWithMiddleware from '../../common/middleware/expressServiceWith'
import genericExpressService from '../../common/middleware/genericExpressService'
import loggerMiddleware from '../../common/middleware/logger'
import { log } from '../../common/log'

const { API_GRAPHIQL_HOST, API_GRAPHIQL_PORT } = process.env

expressServiceWithMiddleware(
  async app => {
    genericExpressService(app)
    loggerMiddleware(app)

    const graphiqlMiddleware = graphiqlExpress({
      endpointURL: 'http://graphql.api.docker.localhost',
    })

    app.use(graphiqlMiddleware)

    return app
  },
  String(API_GRAPHIQL_HOST),
  Number(API_GRAPHIQL_PORT),
)

unhandledError(console.log)
