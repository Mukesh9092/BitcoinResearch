import { simpleMovingAverage } from './simple-moving-average'
import { standardDeviation } from './standard-deviation'

import { log } from '../log'

export function bollingerBand(array, input, length, multiplier) {
  const simpleMovingAverages = simpleMovingAverage(array, input)
  const standardDeviations = standardDeviation(array, input, length)

  return array.map((x, i) => {
    const movingAverage = simpleMovingAverages[i]
    const deviation = standardDeviations[i]

    if (!deviation) {
      return [null, null, null]
    }

    return [
      movingAverage,
      movingAverage + deviation * multiplier,
      movingAverage - deviation * multiplier,
    ]
  })
}
