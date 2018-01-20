import * as pThrottle from "p-throttle";

// TODO: Get this from an environment variable.
const PROMISE_THROTTLE_INTERVAL = 1000;
const PROMISE_THROTTLE_REQUESTS_PER_INTERVAL = 2;

let throttle = null;

export function getThrottledPromise(): Promise {
  if (throttle) {
    return throttle;
  }

  throttle = pThrottle(
    (fn: Function): Promise => fn(),
    PROMISE_THROTTLE_REQUESTS_PER_INTERVAL,
    PROMISE_THROTTLE_INTERVAL
  );

  return throttle;
}
