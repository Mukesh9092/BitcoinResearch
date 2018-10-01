import '@babel/polyfill'

import { resolve } from 'path'

import faviconMiddleware from 'serve-favicon'
import unhandledError from 'unhandled-error'
import { static as staticMiddleware } from 'express'

import expressServiceWithMiddleware from '../../common/express/middleware/expressServiceWith'
import genericExpressService from '../../common/express/middleware/genericExpressService'
import loggerMiddleware from '../../common/express/middleware/logger'
import { isDevelopment } from '../../common/environment'
import middleware from './middleware'

const { WEB_HOST, WEB_PORT } = process.env

expressServiceWithMiddleware(
  async (app) => {
    try {
      genericExpressService(app)
      loggerMiddleware(app)

      app.use('/dist', staticMiddleware(`${__dirname}/../client`))
      app.use(faviconMiddleware(resolve('./src/app/favicon.ico')))
      app.get('/*', middleware)

      return app
    } catch (error) {
      console.error(error)
    }
  },
  WEB_HOST,
  WEB_PORT,
)

unhandledError((error) => {
  console.error(error)
})
