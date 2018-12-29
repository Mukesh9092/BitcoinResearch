import dotenv from 'dotenv'

import { ensureInitialData } from './ensure-initial-data'
import { ensureMarkets } from './ensure-markets'
import { ensureOHLCVs } from './ensure-ohlcvs'

dotenv.config()

async function start() {
  await ensureInitialData()
  await ensureMarkets()
  await ensureOHLCVs()

  console.log('All done!')
}

start()
