export function ensureArray(x) {
  return Array.isArray(x) ? x : [x]
}

export function pluck(array, property) {
  return array.map((x) => {
    return x[property]
  })
}
