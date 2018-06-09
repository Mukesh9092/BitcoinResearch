import { log } from '../log'

export function trueRange(previous, current) {
  return Math.max(
    Math.abs(current.high - current.low),
    Math.abs(current.high - previous.close),
    Math.abs(current.low - previous.close),
  )
}
