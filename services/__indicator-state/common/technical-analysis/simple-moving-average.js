import { mean } from './mean'

export function simpleMovingAverage(array, input, length) {
  const values = array.map((x) => {
    return x[input]
  })

  return values.map((x, i) => {
    if (i < length) {
      return null
    }

    return mean(values.slice(i - length, i))
  })
}
