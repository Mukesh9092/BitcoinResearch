import { squeeze } from './squeeze'
import { exponentialMovingAverageCross } from './exponential-moving-average-cross.js'

import { log } from '../log'

export function strategy(
  array,
  input,
  emaShortLength,
  emaLongLength,
  bbLength,
  bbMultiplier,
  kcLength,
  kcAtrLength,
  kcAtrMultiplier,
) {
  const sq = squeeze(
    array,
    input,
    bbLength,
    bbMultiplier,
    kcLength,
    kcAtrLength,
    kcAtrMultiplier,
  )

  const emaCross = exponentialMovingAverageCross(
    array,
    input,
    emaShortLength,
    emaLongLength,
  )

  return array.map((x, i) => {
    if (i === 0) {
      return null
    }

    const squeezePrevious = sq[i - 1]
    const squeezeCurrent = sq[i]

    const emaCrossPrevious = emaCross[i - 1]
    const emaCrossCurrent = emaCross[i]

    if (
      !squeezePrevious ||
      !squeezeCurrent ||
      !emaCrossPrevious ||
      !emaCrossCurrent
    ) {
      return null
    }

    if (squeezePrevious === squeezeCurrent) {
      return null
    }

    if (emaCrossPrevious === emaCrossCurrent) {
      return null
    }

    if (squeezeCurrent === false && emaCrossCurrent === true) {
      return true
    }

    if (emaCrossCurrent === false) {
      return false
    }

    return '???'
  })
}
