import * as math from 'mathjs'

export const mean = (array, precision) =>
  Number(
    math.format(math.eval(`${math.sum(...array)} / ${array.length}`), {
      notation: 'fixed',
      precision,
    }),
  )
