// TODO: This is probably pretty bad
export function periodToMilliSeconds(period) {
  const [_, timeframe, amount] = period.match(/([A-Z]+)(\d+)/)

  const result = Number(amount) * 1000

  switch (timeframe) {
    case 'MINUTE':
      return result * 60

    case 'HOUR':
      return result * 60 * 60

    case 'DAY':
      return result * 60 * 60 * 24

    case 'WEEK':
      return result * 60 * 60 * 24 * 7

    case 'MONTH':
      return result * 60 * 60 * 24 * 7 * 4

    default:
      return result
  }
}

export function getExpectedLengthForPeriod(period, from, to) {
  const now = new Date().valueOf()
  const f = new Date(from).valueOf()
  let t = new Date(to).valueOf()

  if (t > now) {
    t = now
  }

  const difference = t - f

  return Math.ceil(difference / periodToMilliSeconds(period))
}
