let result

export default function isDevelopment() {
  if (result) {
    return result
  }

  result = process.env.NODE_ENV === 'develop'

  return result
}
