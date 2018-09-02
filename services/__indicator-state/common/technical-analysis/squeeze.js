import { bollingerBand } from './bollinger-band'
import { keltnerChannel } from './keltner-channel'

import { log } from '../log'

export function squeeze(
  array,
  input,
  bbLength,
  bbMultiplier,
  kcLength,
  kcAtrLength,
  kcAtrMultiplier,
) {
  const bb = bollingerBand(array, input, bbLength, bbMultiplier)
  const kc = keltnerChannel(
    array,
    input,
    kcLength,
    kcAtrLength,
    kcAtrMultiplier,
  )

  return array.map((x, i) => {
    const [bbMid, bbUpper, bbLower] = bb[i]
    const [kcMid, kcUpper, kcLower] = kc[i]

    if (!bbMid || !kcMid) {
      return null
    }

    return bbUpper >= kcUpper || bbLower <= kcLower
  })
}
