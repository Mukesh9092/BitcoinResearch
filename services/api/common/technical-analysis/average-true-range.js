import { log } from '../log'

import { pluck } from '../array'
import { trueRange } from './true-range'

export function averageTrueRange(array, input = 'close') {
  if (!array.length) {
    return NaN
  }

  const window = array.length
  const inputValues = pluck(array, input)

  log.debug('averageTrueRange', window, inputValues)

  const recurse = (i) => {
    if (i === 0) {
      log.debug('averageTrueRange recurse 0 result', inputValues[0])
      return inputValues[0]
    }

    const tr = trueRange(array[i], array[i - 1])

    log.debug('averageTrueRange recurse tr', i, tr)

    const total = recurse(i - 1) * (window - 1) + tr

    log.debug('averageTrueRange recurse total', i, total)

    const result = total / window

    log.debug('averageTrueRange recurse result', i, result)

    return result
  }

  const result = recurse(window - 1)

  log.debug('averageTrueRange result', result)

  return result
}
