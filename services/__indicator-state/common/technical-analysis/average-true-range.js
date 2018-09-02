import { mean } from './mean'
import { trueRange } from './true-range'

export function averageTrueRange(array, length) {
  const trueRanges = trueRange(array)

  let i = 0
  const result = array.reduce((m, x) => {
    // Start at +1 because True Range needs 2 values and returns 1 null.
    if (i < length + 1) {
      m.push(null)
      i += 1
      return m
    }

    if (i === length + 1) {
      m.push(mean(trueRanges.slice(1, i)))
      i += 1
      return m
    }

    // Calculate the rest of the values.
    m.push((m[i - 1] * (length - 1) + trueRanges[i]) / length)
    i += 1
    return m
  }, [])

  return result
}
