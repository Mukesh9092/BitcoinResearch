export default function memoize(fn) {
  let result

  return function memoized(...args) {
    if (result) {
      return result
    }

    result = fn(...args)

    return result
  }
}
