export default function memoize(fn: Function) {
  let result: any;

  return function memoized(...args: any[]) {
    if (result) {
      return result;
    }

    result = fn(...args);

    return result;
  };
}
