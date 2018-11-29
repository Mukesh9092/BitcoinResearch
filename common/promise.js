export function timedPromise(timeout) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, timeout),
  )
}
