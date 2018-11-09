import '@babel/polyfill'

import { resolve } from 'path'
import dotenv from 'dotenv'

import { static as staticMiddleware } from 'express'
import faviconMiddleware from 'serve-favicon'
import unhandledError from 'unhandled-error'

import { IApplicationWithHTTPServer } from '../../../../common/express/types'
import {
  expressServiceWith,
  genericExpressService,
  logger,
} from '../../common/express/middleware'

import middleware from './middleware'

dotenv.config()

const { WEB_HOST, WEB_PORT } = process.env

console.log('dotenv', dotenv)
console.log('procenv', process.env)

expressServiceWith(
  async (app: IApplicationWithHTTPServer) => {
    try {
      genericExpressService(app)
      logger(app)

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

unhandledError((error: Error) => {
  if (error) {
    console.error(error)
  }
})
