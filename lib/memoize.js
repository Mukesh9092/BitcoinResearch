module.exports = (fn) => {
  let memoized;

  return (...args) => {
    if (memoized) {
      return memoized;
    }

    const result = fn(...args);

    memoized = result;

    return memoized;
  }
};
