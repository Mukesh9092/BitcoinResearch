import { mean } from './mean'

import { log } from '../log'

export function standardDeviation(array, input, length) {
  // log.debug('standardDeviation', array.length, input, length)

  return array.map((x, i) => {
    // log.debug('standardDeviation map', i, x)

    if (i < length) {
      // log.debug('standardDeviation map returning null')

      return null
    }

    const values = array.slice(i - length, i).map((x) => {
      return x[input]
    })

    // log.debug('standardDeviation map values', values)

    const mu = mean(values)

    // log.debug('standardDeviation map mu', mu)

    const result = Math.sqrt(
      values
        .map((x) => {
          return (x - mu) ** 2
        })
        .reduce((m, x) => {
          return m + x
        }, 0) /
        (values.length - 1),
    )

    // log.debug('standardDeviation map mu', mu)

    return result
  })

  // log.debug('standardDeviation output', output)

  return output
}
