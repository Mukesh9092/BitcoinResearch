import { log } from '../log'

import { pluck } from '../array'
import { trueRange } from './true-range'

// 1     2     3     4     5
// 0     0.4   0.52  0.616 0.6928
export function averageTrueRange(array, i = array.length - 1) {
  if (i === 0) {
    return trueRange(array[i], array[i])
  }

  return (
    (averageTrueRange(array, i - 1) * (array.length - 1) +
      trueRange(array[i], array[i - 1])) /
    array.length
  )
}
