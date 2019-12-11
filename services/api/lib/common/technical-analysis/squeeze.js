import { bollingerBand } from './bollinger-band';
import { keltnerChannel } from './keltner-channel';
export function squeeze(array, precision, input, bbLength, bbMultiplier, kcLength, kcAtrLength, kcAtrMultiplier) {
    const bb = bollingerBand(array, precision, input, bbLength, bbMultiplier);
    const kc = keltnerChannel(array, precision, input, kcLength, kcAtrLength, kcAtrMultiplier);
    return array.map((x, i) => {
        const [bbMid, bbUpper, bbLower] = bb[i];
        const [kcMid, kcUpper, kcLower] = kc[i];
        if (!bbMid || !kcMid) {
            return null;
        }
        return bbUpper >= kcUpper || bbLower <= kcLower;
    });
}
