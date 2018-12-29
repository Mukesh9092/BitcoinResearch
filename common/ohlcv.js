export function periodToMilliSeconds(period) {
  const [_, amount, timeframe] = period.match(/(\d+)([wdhm])/)

  const result = Number(amount) * 1000

  switch (timeframe) {
    case 'm':
      return result * 60

    case 'h':
      return result * 60 * 60

    case 'd':
      return result * 60 * 60 * 24

    case 'w':
      return result * 60 * 60 * 24 * 7

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
