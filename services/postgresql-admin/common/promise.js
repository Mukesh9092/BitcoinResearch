import pThrottle from 'p-throttle';

// TODO: Get this from an environment variable.
const PROMISE_THROTTLE_INTERVAL = 1000;
const PROMISE_THROTTLE_REQUESTS_PER_INTERVAL = 2;

let throttle;

export const getThrottledPromise = () => {
  if (throttle) {
    return throttle;
  }

  throttle = pThrottle(
    (fn) => fn(),
    PROMISE_THROTTLE_REQUESTS_PER_INTERVAL,
    PROMISE_THROTTLE_INTERVAL
  );

  return throttle;
};
