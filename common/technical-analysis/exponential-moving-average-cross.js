import { exponentialMovingAverage } from './exponential-moving-average'

import { log } from '../log'

export function exponentialMovingAverageCross(
  array,
  precision,
  input,
  emaShortLength,
  emaLongLength,
) {
  const emaShort = exponentialMovingAverage(
    array,
    precision,
    input,
    emaShortLength,
  )
  const emaLong = exponentialMovingAverage(
    array,
    precision,
    input,
    emaLongLength,
  )

  return array.map((x, i) => {
    const short = emaShort[i]
    const long = emaLong[i]

    if (!short || !long) {
      return null
    }

    return short >= long
  })
}
