import pThrottle from 'p-throttle'

// TODO: Get this from an environment variable.
const PROMISE_THROTTLE_INTERVAL = 1000
const PROMISE_THROTTLE_REQUESTS_PER_INTERVAL = 2

let throttle

export function getThrottledPromise() {
  if (throttle) {
    return throttle
  }

  throttle = pThrottle(
    (fn) => {
      return fn()
    },
    PROMISE_THROTTLE_REQUESTS_PER_INTERVAL,
    PROMISE_THROTTLE_INTERVAL,
  )

  return throttle
}

export function sleep(ms) {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms)
  })
}
