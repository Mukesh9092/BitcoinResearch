import { log } from '../log'

import { mean } from './mean'

export function standardDeviation(array, input = 'close') {
  const inputValues = array.map((x) => {
    return x[input]
  })

  const mu = mean(inputValues)

  const result = Math.sqrt(
    mean(
      inputValues.map((x) => {
        return (x - mu) ** 2
      }),
    ),
  )

  return {
    stddev: result,
  }
}
