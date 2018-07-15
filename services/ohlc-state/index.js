import { add } from './common/hemera/client'
import { log } from './common/log'

import { getClient } from './common/influxdb/client'
import {
  findByMarketAndPeriodBetweenStartAndEnd,
  importForMarketAndPeriodBetweenStartAndEnd,
} from './common/influxdb/entities/ohlc'

log.setLevel('debug')

async function start() {
  try {
    const influxClient = await getClient()

    await add({ topic: 'OHLC', cmd: 'getOHLC' }, async (options) => {
      const { key, period, start, end } = options

      return []

      // return result
    })
  } catch (error) {
    log.error(error)
  }
}

start()
