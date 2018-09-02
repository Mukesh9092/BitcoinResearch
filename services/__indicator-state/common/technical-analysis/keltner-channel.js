import { exponentialMovingAverage } from './exponential-moving-average'
import { averageTrueRange } from './average-true-range'

import { log } from '../log'

export function keltnerChannel(array, input, length, atrLength, atrMultiplier) {
  const exponentialMovingAverages = exponentialMovingAverage(
    array,
    input,
    length,
  )

  const averageTrueRanges = averageTrueRange(array, atrLength)

  // log.debug('keltnerChannel averageTrueRanges', averageTrueRanges)

  return array.map((x, i) => {
    // log.debug('keltnerChannel map', i, length)

    if (i < length) {
      return [null, null, null]
    }

    const ma = exponentialMovingAverages[i]

    // log.debug('keltnerChannel map ma', ma)

    const atr = averageTrueRanges[i]

    // log.debug('keltnerChannel map atr', atr)

    const upper = ma + atr * atrMultiplier
    const lower = ma - atr * atrMultiplier

    // log.debug('keltnerChannel map upper', upper)
    // log.debug('keltnerChannel map lower', lower)

    return [ma, upper, lower]
  })
}
