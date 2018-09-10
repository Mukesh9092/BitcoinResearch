import * as math from 'mathjs'

import { exponentialMovingAverage } from './exponential-moving-average'
import { averageTrueRange } from './average-true-range'

import { log } from '../log'

export function keltnerChannel(
  array,
  precision,
  input,
  length,
  atrLength,
  atrMultiplier,
) {
  const exponentialMovingAverages = exponentialMovingAverage(
    array,
    precision,
    input,
    length,
  )

  const averageTrueRanges = averageTrueRange(array, precision, atrLength)

  const result = array.map((x, i) => {
    if (i < length) {
      return [null, null, null]
    }

    const ema = exponentialMovingAverages[i]
    const atr = averageTrueRanges[i]

    const upper = math.eval(`${ema} + ${atr} * ${atrMultiplier}`)
    const middle = math.eval(exponentialMovingAverages[i])
    const lower = math.eval(`${ema} - ${atr} * ${atrMultiplier}`)

    return [
      Number(
        math.format(upper, {
          notation: 'fixed',
          precision,
        }),
      ),
      Number(
        math.format(middle, {
          notation: 'fixed',
          precision,
        }),
      ),
      Number(
        math.format(lower, {
          notation: 'fixed',
          precision,
        }),
      ),
    ]
  })

  return result
}
