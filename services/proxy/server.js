import * as httpProxy from 'http-proxy'
import unhandledError from 'unhandled-error'

import authenticationHeaderInjectionMiddleware from './common/middleware/authenticationHeaderInjection'
import expressServiceWith from './common/middleware/expressServiceWith'
import genericExpressService from './common/middleware/genericExpressService'
import loggerMiddleware from './common/middleware/logger'
import passportMiddleware from './common/middleware/passport'
import sessionsMiddleware from './common/middleware/sessions'
import { formatError } from './common/errors'
import { log } from './common/log'

const {
  API_GRAPHQL_HOST,
  API_GRAPHQL_PORT,
  API_GRAPHQL_WS_PORT,
  AUTHENTICATION_HOST,
  AUTHENTICATION_PORT,
  // NOFLO_HOST,
  // NOFLO_PORT,
  PROXY_HOST,
  PROXY_PORT,
  WEB_HOST,
  WEB_PORT,
} = process.env

expressServiceWith(
  async app => {
    genericExpressService(app)
    loggerMiddleware(app)
    sessionsMiddleware(app)
    passportMiddleware(app)
    authenticationHeaderInjectionMiddleware(app)

    const proxy = httpProxy.createProxyServer()

    const graphqlSubscriptionsProxy = httpProxy.createProxyServer({
      target: `ws://${API_GRAPHQL_HOST}:${API_GRAPHQL_WS_PORT}`,
      ws: true,
    })

    const proxyRequestToAuthentication = (req, res) => {
      proxy.web(req, res, {
        target: `http://${AUTHENTICATION_HOST}:${AUTHENTICATION_PORT}`,
      })
    }

    const proxyRequestToGraphQL = (req, res) => {
      proxy.web(req, res, {
        target: `http://${API_GRAPHQL_HOST}:${API_GRAPHQL_PORT}`,
      })
    }

    // const proxyRequestToGraphQLSubscriptions = (req, res) => {
    //   proxy.ws(req, res, {
    //     target: `http://${API_GRAPHQL_HOST}:${API_GRAPHQL_WS_PORT}`,
    //   })
    // }

    const proxyRequestToWeb = (req, res) => {
      proxy.web(req, res, {
        target: `http://${WEB_HOST}:${WEB_PORT}`,
      })
    }

    app.all('/api/authentication/*', proxyRequestToAuthentication)
    app.all('/api/authentication', proxyRequestToAuthentication)
    // app.all('/api/graphql/subscriptions', proxyRequestToGraphQLSubscriptions)
    app.all('/api/graphql/*', proxyRequestToGraphQL)
    app.all('/api/graphql', proxyRequestToGraphQL)
    app.all('/*', proxyRequestToWeb)

    app.server.on('upgrade', (req, socket, head) => {
      graphqlSubscriptionsProxy.ws(req, socket, head)
    })

    proxy.on('error', error => {
      log.error(error)
    })

    return app
  },
  String(PROXY_HOST),
  Number(PROXY_PORT),
)

unhandledError(error => log.error(error))
