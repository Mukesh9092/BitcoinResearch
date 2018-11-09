import dotenv from 'dotenv'
import unhandledError from 'unhandled-error'
import { Market } from 'ccxt'

import { IApplicationWithHTTPServer } from '../common/express/types'
import { expressServiceWith } from '../common/express/middleware/expressServiceWith'
import { genericExpressService } from '../common/express/middleware/genericExpressService'
import { logger } from '../common/express/middleware/logger'

import { ensureInitialData } from './ensure-initial-data'
import { ensureMarkets } from './ensure-markets'
import { ensureOHLCVs } from './ensure-ohlcvs'

dotenv.config()

const { API_HOST, API_PORT } = process.env

console.log('API_HOST', API_HOST)
console.log('API_PORT', API_PORT)

expressServiceWith(
  async (app: IApplicationWithHTTPServer) => {
    try {
      genericExpressService(app)
      logger(app)

      await ensureMarkets()
      // await ensureInitialData()

      // Purposefully put this on the background
      ensureOHLCVs()

      return app
    } catch (error) {
      console.error(error)
    }
  },
  String(API_HOST),
  Number(API_PORT),
)

unhandledError((error: Error) => {
  console.error(error)
})
