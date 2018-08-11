import { log } from '../log'

function ema(array) {
  // log.debug('ema', array.length)

  const weight = 2 / (array.length + 1)

  // log.debug('ema weight', weight)

  const recurse = (t) => {
    // log.debug('ema recurse', t)

    if (t === 0) {
      return array[0]
    }

    return weight * array[t - 1] + (1 - weight) * recurse(t - 1)
  }

  return recurse(array.length - 1)
}

export function exponentialMovingAverage(array, input, length) {
  // log.debug('exponentialMovingAverage', array.length, input, length)

  const values = array.map((x) => {
    return x[input]
  })

  return values.map((x, i) => {
    if (i < length) {
      return null
    }

    return ema(values.slice(i - length, i))
  })
}
