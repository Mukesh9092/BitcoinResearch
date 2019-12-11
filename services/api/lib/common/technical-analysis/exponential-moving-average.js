import * as math from 'mathjs';
function ema(array, precision) {
    if (array.length <= 0)
        return NaN;
    const weight = math.eval(`2 / (${array.length} + 1)`);
    const recurse = (t) => {
        if (t === 0)
            return array[0];
        return Number(math.format(math.eval(`${weight} * ${array[t - 1]} + (1 - ${weight}) * ${recurse(t - 1)}`), {
            notation: 'fixed',
            precision,
        }));
    };
    return recurse(array.length - 1);
}
export function exponentialMovingAverage(array, precision, input, length) {
    const values = array.map((x) => {
        return x[input];
    });
    return values.map((x, i) => {
        if (i < length) {
            return null;
        }
        return ema(values.slice(i - length, i), precision);
    });
}
