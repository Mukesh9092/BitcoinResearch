import pThrottle from 'p-throttle';

// TODO: Get this from an environment variable.
const PROMISE_THROTTLE_INTERVAL = 1000;
const PROMISE_THROTTLE_REQUESTS_PER_INTERVAL = 2;

let throttle: Function;

export const getThrottledPromise: Function = () => {
  if (throttle) {
    return throttle;
  }

  throttle = pThrottle(
    (fn: Function): Promise<any> => fn(),
    PROMISE_THROTTLE_REQUESTS_PER_INTERVAL,
    PROMISE_THROTTLE_INTERVAL
  );

  return throttle;
};
