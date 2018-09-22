import { log } from '../../common/log'
import { find, fetchOHLCVFromAPI, upsert } from '../../common/database/repositories/ohlcv'
import { getExpectedLengthForPeriod } from '../../common/ohlcv'

import apiKeys from '../../apiKeys'

export default async function getOHLCV(obj, args) {
  try {
    const { trader, base, quote, period, from, to } = args
    let data

    const expectedLength = getExpectedLengthForPeriod(period, from, to)

    log.debug('getOHLCV expectedLength', expectedLength)

    data = await find(trader, base, quote, period, from, to)

    log.debug('getOHLCV data', data.length)

    if (data && data.length === expectedLength) {
      return data
    }

    const points = await fetchOHLCVFromAPI(apiKeys, trader, base, quote, period, from, to)

    log.debug('getOHLCV import points', points)

    await upsert(points)

    log.debug('getOHLCV import imported!')

    data = await find(trader, base, quote, period, from, to)

    log.debug('getOHLCV data', data.length)

    log.debug('getOHLCV data[0]', data[0])

    return data
  } catch (error) {
    log.error(error)
    throw error
  }
}
