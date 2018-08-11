import { act } from '../../common/hemera/client'
import { log } from '../../common/log'

export default async function getOHLCV(obj, args) {
  try {
    const { key, period, from, to } = args

    log.debug('getOHLCV', key, period, from, to)

    const result = await act({
      topic: 'OHLCV',
      cmd: 'getOHLCV',
      key,
      period,
      from,
      to,
    })

    log.debug('getOHLCV result', result)

    return result
  } catch (error) {
    log.error(error)
    throw error
  }
}
