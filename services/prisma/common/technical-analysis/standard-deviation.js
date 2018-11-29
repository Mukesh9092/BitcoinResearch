import * as math from 'mathjs'

export function standardDeviation(array, precision, input, length) {
  const output = []

  for (let i = 0, l = array.length; i < l; i += 1) {
    if (i < length) {
      output.push(null)
    } else {
      const values = array.slice(i - length, i).map((x) => x[input])

      let result = math.eval(
        `sqrt(${math.sum(math.map(values, (x) => math.eval(`(${x} - mean(${values})) ^ 2`)))} / ${values.length - 1})`,
      )

      result = Number(
        math.format(result, {
          notation: 'fixed',
          precision,
        }),
      )

      output.push(result)
    }
  }

  return output
}
