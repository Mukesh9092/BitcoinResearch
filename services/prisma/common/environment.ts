export function isBrowser (): Boolean {
  return Boolean(typeof window !== 'undefined')
}

export function isServer (): Boolean {
  return Boolean(typeof window === 'undefined')
}

export function isDevelopment (): Boolean {
  return Boolean(process.env.NODE_ENV === 'develop')
}

export function isProduction (): Boolean {
  return Boolean(process.env.NODE_ENV === 'production')
}
