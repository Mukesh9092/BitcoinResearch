export function timedPromise(timeout) {
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve()
    }, timeout)
  })
}
