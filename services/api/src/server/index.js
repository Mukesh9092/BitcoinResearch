import dotenv from 'dotenv'
import unhandledError from 'unhandled-error'

import { expressServiceWith, genericExpressService, logger } from '../../common/express/middleware'

import { ensureInitialData } from './ensure-initial-data'
import { ensureMarkets } from './ensure-markets'
import { ensureOHLCVs } from './ensure-ohlcvs'

dotenv.config()

const { API_HOST, API_PORT } = process.env

expressServiceWith(
  async (app) => {
    try {
      genericExpressService(app)
      logger(app)

      await ensureInitialData()
      await ensureMarkets()
      await ensureOHLCVs()

      return app
    } catch (error) {
      console.error(error)
    }
  },
  API_HOST,
  API_PORT,
)

unhandledError((error) => {
  if (error) {
    console.error(error)
  }
})
