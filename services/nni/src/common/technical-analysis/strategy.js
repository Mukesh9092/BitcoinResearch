import { squeeze } from './squeeze'
import { exponentialMovingAverageCross } from './exponential-moving-average-cross'

export function strategy(
  array,
  precision,
  input,
  emaShortLength,
  emaLongLength,
  bbLength,
  bbMultiplier,
  kcLength,
  kcAtrLength,
  kcAtrMultiplier,
) {
  const sq = squeeze(array, precision, input, bbLength, bbMultiplier, kcLength, kcAtrLength, kcAtrMultiplier)

  const emaCross = exponentialMovingAverageCross(array, precision, input, emaShortLength, emaLongLength)

  const result = []

  for (let i = 0, l = array.length; i < l; i += 1) {
    if (i === 0) {
      result.push(false)
    } else {
      const squeezeCurrent = sq[i]
      const emaCrossCurrent = emaCross[i]

      if (typeof squeezeCurrent !== 'boolean' || typeof emaCrossCurrent !== 'boolean') {
        result.push(false)
      } else {
        result.push(!squeezeCurrent || emaCrossCurrent)
      }
    }
  }

  return result
}
