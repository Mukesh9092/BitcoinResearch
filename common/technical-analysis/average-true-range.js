import * as math from 'mathjs'

import { trueRange } from './true-range'

export function averageTrueRange(array, precision, length) {
  const trueRanges = trueRange(array, precision)
  const result = []

  for (let i = 0, l = array.length; i < l; i += 1) {
    if (i < length + 1) {
      result.push(null)
    } else if (i === length + 1) {
      result.push(
        Number(
          math.format(math.mean(trueRanges.slice(1, i)), {
            notation: 'fixed',
            precision,
          }),
        ),
      )
    } else {
      const calculation = math.eval(
        `(${result[i - 1]} * (${length} - 1) + ${trueRanges[i]}) / ${length}`,
      )

      const formatted = Number(
        math.format(calculation, {
          notation: 'fixed',
          precision,
        }),
      )

      result.push(formatted)
    }
  }

  return result
}
