function tr(previous, current) {
  return Math.max(
    current.high - current.low,
    Math.abs(current.high - previous.close),
    Math.abs(current.low - previous.close),
  )
}

export function trueRange(array) {
  return array.map((v, i) => {
    if (i === 0) {
      return null
    }

    return tr(array[i - 1], array[i])
  })
}
