export default function memoizeAsync(fn: Function) {
  let result: any;

  return async function memoizedAsync(...args: any[]) {
    if (result) {
      return result;
    }

    result = await fn(...args);

    return result;
  };
}
