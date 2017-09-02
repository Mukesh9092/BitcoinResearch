const formatError = error => error.stack || error.message || error

module.exports = {
  formatError,
}
