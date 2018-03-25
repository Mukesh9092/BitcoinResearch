export default function memoizeAsync(fn) {
  let result;

  return async function memoizedAsync(...args) {
    if (result) {
      return result;
    }

    result = await fn(...args);

    return result;
  };
}
