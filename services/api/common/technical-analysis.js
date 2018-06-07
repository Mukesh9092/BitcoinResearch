import { log } from './log'

log.setLevel('debug')

export function exponentialMovingAverage(
  array,
  window = array.length,
  input = 'close',
) {
  if (!array.length) {
    return NaN
  }
  
  const weight = 2 / (window + 1)
  
  const recurse = (t) => {
    if (t === 0) {
      return array[0][input]
    }
    
    const previousValue = recurse(t - 1)

    const result = weight * array[t - 1][input] + (1 - weight) * previousValue
    
    return result
  }

  const result = recurse(window)

  if (!result) {
    return NaN
  }

  return {
    ema: result,
  }
}

