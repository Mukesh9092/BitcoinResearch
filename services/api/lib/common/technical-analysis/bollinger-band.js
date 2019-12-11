import * as math from 'mathjs';
import { simpleMovingAverage } from './simple-moving-average';
import { standardDeviation } from './standard-deviation';
export function bollingerBand(array, precision, input, length, multiplier) {
    const simpleMovingAverages = simpleMovingAverage(array, precision, input, length);
    const standardDeviations = standardDeviation(array, precision, input, length);
    const result = array.map((x, i) => {
        const ema = simpleMovingAverages[i];
        const dev = standardDeviations[i];
        if (!dev) {
            return [null, null, null];
        }
        const upper = math.eval(`${ema} + ${dev} * ${multiplier}`);
        const middle = math.eval(ema);
        const lower = math.eval(`${ema} - ${dev} * ${multiplier}`);
        return [
            Number(math.format(upper, {
                notation: 'fixed',
                precision,
            })),
            Number(math.format(middle, {
                notation: 'fixed',
                precision,
            })),
            Number(math.format(lower, {
                notation: 'fixed',
                precision,
            })),
        ];
    });
    return result;
}
