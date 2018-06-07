import { log } from '../log'

export function trueRange(array) {
  if (!array.length) {
    return NaN
  }
  
  log.debug('trueRange', array)
  
  const current = array[array.length - 1]
  const previous = array[array.length - 2]

  log.debug('trueRange current', current)
  log.debug('trueRange previous', previous)

  const result = Math.max(
    current.high - current.low,
    current.high - (previous || current).close,
    current.high - (previous || current).close,
  )

  log.debug('trueRange result', previous)
  
  return result
}
