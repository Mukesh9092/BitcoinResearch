// import express from 'express'
import faviconMiddleware from 'serve-favicon'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import { join } from 'path'

import unhandledError from 'unhandled-error'

import expressServiceWithMiddleware from '../../common/middleware/expressServiceWith'
import genericExpressService from '../../common/middleware/genericExpressService'
import loggerMiddleware from '../../common/middleware/logger'
import { isDevelopment } from '../../common/environment'
import { log } from '../../common/log'

import webpackConfig from './webpack.config'
import serverRendererMiddleware from './server'

const { WEB_HOST, WEB_PORT } = process.env

expressServiceWithMiddleware(
  async (app) => {
    genericExpressService(app)
    loggerMiddleware(app)
    app.use(faviconMiddleware(join(__dirname, 'public/favicon.ico')))

    if (isDevelopment()) {
      const compiler = webpack(webpackConfig)

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

      const compilerDonePromise = new Promise((resolve) => {
        compiler.hooks.done.tap('ApplicationStart', resolve)
      })

      await compilerDonePromise

      return app
    }

    app.use(serverRendererMiddleware())

    /*
    const CLIENT_ASSETS_DIR = join(__dirname, '../build/client')
    const CLIENT_STATS_PATH = join(CLIENT_ASSETS_DIR, 'stats.json')

    const stats = require(CLIENT_STATS_PATH)

    app.use(express.static(CLIENT_ASSETS_DIR))
    */

    return app
  },
  String(WEB_HOST),
  Number(WEB_PORT),
)

unhandledError((error) => {
  log.error(error)
})
