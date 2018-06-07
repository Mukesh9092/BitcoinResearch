import { log } from '../log'

import { trueRange } from './true-range'

export function averageTrueRange(
  array,
  window = array.length,
  input = 'close',
) {
  if (!array.length || window > array.length) {
    return NaN
  }

  log.debug('averageTrueRange', array, window, input)

  const recurse = (t) => {
    log.debug('averageTrueRange recurse t', t)
    
    if (t === 0) {
      log.debug('averageTrueRange recurse t is 0', array[0][input])
      return array[0][input]
    }
    
    const current = array[t]
    const previous = array[t - 1]
    
    const tr = trueRange(previous ? [previous, current] : [current])

    log.debug('averageTrueRange recurse tr', tr)
    
    const previousValue = recurse(t - 1)

    log.debug('averageTrueRange recurse previousValue', previousValue)
    
    const result = previousValue * window - 1 + tr / window

    log.debug('averageTrueRange recurse result', result)
    
    return result
  }

  const result = array.map((v, i) => {
    return {
      atr: recurse(i),
    }
  })

  log.debug('averageTrueRange result', result)

  return result
}
