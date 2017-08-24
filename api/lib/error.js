exports.formatError = (error) => {
  return error.stack || error
}
