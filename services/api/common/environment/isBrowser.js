let result

export default function isBrowser() {
  if (result) {
    return result
  }

  result = typeof window !== 'undefined'

  return result
}
