export function isBrowser() {
  return Boolean(typeof window !== 'undefined')
}

export function isServer() {
  return Boolean(typeof window === 'undefined')
}

export function isDevelopment() {
  return Boolean(process?.env?.NODE_ENV === 'development')
}

export function isProduction() {
  return Boolean(process?.env?.NODE_ENV === 'production')
}
