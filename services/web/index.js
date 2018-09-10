import { join } from 'path'

import faviconMiddleware from 'serve-favicon'
import unhandledError from 'unhandled-error'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import { ApolloServer } from 'apollo-server-express'
import { static as staticMiddleware } from 'express'

import expressServiceWithMiddleware from './common/middleware/expressServiceWith'
import genericExpressService from './common/middleware/genericExpressService'
import loggerMiddleware from './common/middleware/logger'
import { importMarkets } from './common/database/repositories/market'
import { isDevelopment } from './common/environment'
import { log } from './common/log'

import RootQuery from './resolvers/RootQuery'
import apiKeys from './apiKeys.json'
import schema from './schema'
import serverRendererMiddleware from './server'
import webpackConfig from './webpack.config'

const CLIENT_ASSETS_DIR = join(__dirname, './.hmr')
const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24
const { WEB_HOST, WEB_PORT, PUBLIC_ASSET_PATH } = process.env

log.setLevel('debug')

expressServiceWithMiddleware(
  async (app) => {
    try {
      log.debug('isDevelopment', isDevelopment())

      const apolloServer = new ApolloServer({
        typeDefs: schema,
        resolvers: {
          RootQuery,
        },
      })

      genericExpressService(app)
      loggerMiddleware(app)

      // app.use(faviconMiddleware(`${PUBLIC_ASSET_PATH}/favicon.ico`))

      apolloServer.applyMiddleware({ app, path: '/graphql' })
      // app.use(
      //   '/graphiql',
      //   graphiqlExpress({
      //     endpointURL: '/graphql',
      //   }),
      // )

      const compiler = webpack(webpackConfig)

      if (isDevelopment()) {
        app.use(
          webpackDevMiddleware(compiler, {
            logLevel: 'debug',
            serverSideRender: true,
            publicPath: webpackConfig[0].output.publicPath,
          }),
        )

        app.use(webpackHotMiddleware(compiler.compilers[0]))

        app.use(
          webpackHotServerMiddleware(compiler, {
            chunkName: 'server',
          }),
        )
      }

      app.use(staticMiddleware(CLIENT_ASSETS_DIR, PUBLIC_ASSET_PATH))
      app.use(serverRendererMiddleware())

      await new Promise((resolve) => {
        compiler.hooks.done.tap('ApplicationStart', resolve)
      })

      return app
    } catch (error) {
      log.error(error)
    }
  },
  String(WEB_HOST),
  Number(WEB_PORT),
)

unhandledError((error) => {
  log.error(error)
})

// TODO: Turn back on!
setInterval(() => {
  return importMarkets(apiKeys)
}, ONE_DAY_IN_MILLISECONDS)
importMarkets(apiKeys)

unhandledError(log.debug)
