import { log } from '../log'

export function mean(array) {
  const sum = array.reduce((x, y) => {
    return x + y
  }, 0)
  return sum / array.length
}
