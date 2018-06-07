import { log } from '../log'

import { trueRange } from './true-range'

export function exponentialMovingAverage(
  array,
  window = array.length,
  input = 'close',
) {
  if (!array.length || window > array.length) {
    return NaN
  }

  log.debug('exponentialMovingAverage', array, window, input)

  const weight = 2 / (window + 1)

  log.debug('exponentialMovingAverage weight', weight)

  const recurse = (t) => {
    log.debug('exponentialMovingAverage recurse t', t)

    if (t === 0) {
      log.debug('exponentialMovingAverage recurse t is 0', array[0][input])
      return array[0][input]
    }

    const previousValue = recurse(t - 1)

    log.debug('exponentialMovingAverage recurse previousValue', previousValue)

    const result = weight * array[t - 1][input] + (1 - weight) * previousValue

    log.debug('exponentialMovingAverage recurse result', result)

    return result
  }

  const result = array.map((v, i) => {
    return {
      ema: recurse(i),
    }
  })

  log.debug('exponentialMovingAverage result', result)

  return result
}
