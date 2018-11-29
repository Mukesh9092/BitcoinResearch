import * as math from 'mathjs'

export function simpleMovingAverage(array, precision, input, length) {
  const values = array.map((x) => x[input])

  const result = []

  for (let i = 0, l = values.length; i < l; i += 1) {
    if (i < length) {
      result.push(null)
    } else {
      result.push(
        Number(
          math.format(math.mean(values.slice(i - length, i)), {
            notation: 'fixed',
            precision,
          }),
        ),
      )
    }
  }

  return result
}
