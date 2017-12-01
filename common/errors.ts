export function formatError(error: Error) {
  return error.stack || error.message || error;
}
