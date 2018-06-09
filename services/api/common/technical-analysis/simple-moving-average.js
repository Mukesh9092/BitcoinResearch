import { log } from '../log'

import { mean } from './mean'

export function simpleMovingAverage(array, input = 'close') {
  return mean(
    array.map((x) => {
      return x[input]
    }),
  )
}
