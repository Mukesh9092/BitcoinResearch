import { log } from '../log'

// w = 3
// i v b e result
// 0 1 0 0 1
// 1 2 b e 1.5
// 2 3 b e 2
// 3 4 b e 4.5
// 4 5 b e 6
export function simpleMovingAverage(
  array,
  window = array.length,
  input = 'close',
) {
  if (!array.length || window > array.length) {
    return NaN
  }
  
  log.debug('simpleMovingAverage', array, window, input)

  const result = array.map((v, i) => {
    log.debug('simpleMovingAverage map', i, v)

    const end = i + 1
    let beginning = 0
    if (i + 1 - window > 0) {
      beginning = i + 1 - window
    }

    log.debug('simpleMovingAverage beginning', beginning)
    log.debug('simpleMovingAverage end', end)

    const loopWindow = Math.max(1, end - beginning)

    log.debug('simpleMovingAverage loopWindow', loopWindow)

    const set = array.slice(beginning, end)

    log.debug('simpleMovingAverage set', set)

    const setResult =
      set.reduce((m, x) => {
        return m + x[input]
      }, 0) / loopWindow

    log.debug('simpleMovingAverage setResult', setResult)

    return {
      sma: setResult,
    }
  })

  log.debug('simpleMovingAverage result', result)

  return result
}
