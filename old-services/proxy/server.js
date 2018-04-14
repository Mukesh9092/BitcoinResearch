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
  API_GRAPHIQL_HOST,
  API_GRAPHIQL_PORT,
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

    const logRequest = req =>
      log.debug({
        url: req.url,
        method: req.method,
        statusCode: req.statusCode,
        statusMessage: req.statusMessage,
        headers: req.headers,
        trailers: req.trailers,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        params: req.params,
        query: req.query,
        body: req.body,
        sessionID: req.sessionID,
        session: req.session,
        _passport: req._passport,
      })

    const toAuthentication = (req, res) =>
      proxy.web(req, res, {
        target: `http://${AUTHENTICATION_HOST}:${AUTHENTICATION_PORT}`,
      })

    const toGraphiQL = (req, res) =>
      proxy.web(req, res, {
        target: `http://${API_GRAPHIQL_HOST}:${API_GRAPHIQL_PORT}`,
      })

    const toGraphQL = (req, res) =>
      proxy.web(req, res, {
        target: `http://${API_GRAPHQL_HOST}:${API_GRAPHQL_PORT}`,
      })

    const toWeb = (req, res) =>
      proxy.web(req, res, {
        target: `http://${WEB_HOST}:${WEB_PORT}`,
      })

    app.all('/api/authentication/*', (req, res) => {
      logRequest(req)
      toAuthentication(req, res)
    })

    app.all('/api/graphiql', (req, res) => {
      logRequest(req)
      toGraphiQL(req, res)
    })

    app.all('/api/graphql', (req, res) => {
      logRequest(req)
      toGraphQL(req, res)
    })

    app.all('/*', (req, res) => {
      logRequest(req)
      toWeb(req, res)
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
