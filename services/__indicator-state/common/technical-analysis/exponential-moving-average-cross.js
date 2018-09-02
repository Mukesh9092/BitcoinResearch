import { exponentialMovingAverage } from './exponential-moving-average'

import { log } from '../log'

export function exponentialMovingAverageCross(
  array,
  input,
  emaShortLength,
  emaLongLength,
) {
  const emaShort = exponentialMovingAverage(array, input, emaShortLength)
  const emaLong = exponentialMovingAverage(array, input, emaLongLength)

  return array.map((x, i) => {
    const short = emaShort[i]
    const long = emaLong[i]

    if (!short || !long) {
      return null
    }

    return short >= long
  })
}
