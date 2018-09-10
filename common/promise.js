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

export function allSerially(a) {
  return a.reduce((promiseChain, currentTask) => {
    return promiseChain.then((chainResults) => currentTask.then((currentResult) => [...chainResults, currentResult]))
  }, Promise.resolve([]))
}

export async function allSerially1(a) {
  return a.reduce(async (m, v) => {
    const mResult = await m
    const vResult = await v
    return [...mResult, vResult]
  }, Promise.resolve([]))
}
