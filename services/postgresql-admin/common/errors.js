export function formatError(error) {
  return error.stack || error.message || error;
}
