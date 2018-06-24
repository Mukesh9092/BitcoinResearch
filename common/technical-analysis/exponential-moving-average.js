export function exponentialMovingAverage(array, input = 'close') {
  if (!array.length) {
    return NaN
  }

  const weight = 2 / (array.length + 1)

  const recurse = (t) => {
    if (t === 0) {
      return array[0][input]
    }

    return weight * array[t - 1][input] + (1 - weight) * recurse(t - 1)
  }

  return recurse(array.length - 1)
}
