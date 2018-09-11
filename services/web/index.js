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

const CLIENT_ASSETS_DIR = join(__dirname, '.hmr')
const PUBLIC_DIR_PATH = join(__dirname, 'public')
const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24
const { WEB_HOST, WEB_PORT, PUBLIC_ASSET_PATH } = process.env

log.setLevel('debug')

expressServiceWithMiddleware(
  async (app) => {
    try {
      // log.debug('index isDevelopment', isDevelopment())

      const apolloServer = new ApolloServer({
        typeDefs: schema,
        resolvers: {
          RootQuery,
        },
      })
      // log.debug('index apolloServer?', !!apolloServer)

      genericExpressService(app)
      loggerMiddleware(app)

      app.use(PUBLIC_ASSET_PATH, staticMiddleware(CLIENT_ASSETS_DIR))
      app.use(PUBLIC_ASSET_PATH, staticMiddleware(PUBLIC_DIR_PATH))
      app.use(faviconMiddleware(`${PUBLIC_DIR_PATH}/favicon.ico`))

      apolloServer.applyMiddleware({ app, path: '/graphql' })
      // app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

      // log.debug(`index apolloServerMiddleware /graphql`)

      const compiler = webpack(webpackConfig)
      // log.debug('index webpack compiler?', !!compiler)

      // Webpack middleware MUST precede serverRendererMiddleware for correct
      // collection of assets. There is also another way supposedly that uses a
      // JSON manifest file.
      if (isDevelopment()) {
        // log.debug('index webpack in development')

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
// setInterval(() => importMarkets(apiKeys), ONE_DAY_IN_MILLISECONDS)
// importMarkets(apiKeys)

unhandledError(log.debug)
