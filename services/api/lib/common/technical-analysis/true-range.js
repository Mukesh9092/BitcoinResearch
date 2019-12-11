import * as math from 'mathjs';
export function trueRange(array, precision) {
    return array.map((v, i) => {
        if (i === 0)
            return null;
        const result = math.eval(`max(
      abs(${v.high} - ${v.low}),
      abs(${v.high} - ${array[i - 1].close}),
      abs(${v.low} - ${array[i - 1].close})
    )`);
        return Number(math.format(result, {
            notation: 'fixed',
            precision,
        }));
    });
}
