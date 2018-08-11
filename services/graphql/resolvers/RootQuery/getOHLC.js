import { act } from '../../common/hemera/client'
import { log } from '../../common/log'

export default async function getOHLC(obj, args) {
  try {
    const { key, period, from, to } = args

    log.debug('getOHLC', key, period, from, to)

    const result = await act({
      topic: 'OHLC',
      cmd: 'getOHLC',
      key,
      period,
      from,
      to,
    })

    log.debug('getOHLC result', result)

    return result
  } catch (error) {
    log.error(error)
    throw error
  }
}
