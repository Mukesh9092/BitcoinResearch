module.exports = (fn) => {
  let memoized;

  return async (...args) => {
    if (memoized) {
      return memoized;
    }

    const result = await fn(...args);

    memoized = result;

    return memoized;
  }
};
