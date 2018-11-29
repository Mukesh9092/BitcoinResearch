const MINUTE_MODIFIER = 60
const HOUR_MODIFIER = 60
const DAY_MODIFIER = 24
const WEEK_MODIFIER = 7
const MILLISECOND_MODIFIER = 1000

export function periodToMilliSeconds(period) {
  const [_, amount, timeframe] = period.match(/(\d+)([wdhm])/)

  const result = Number(amount) * MILLISECOND_MODIFIER

  switch (timeframe) {
    case 'm':
      return result * MINUTE_MODIFIER

    case 'h':
      return result * MINUTE_MODIFIER * HOUR_MODIFIER

    case 'd':
      return result * MINUTE_MODIFIER * HOUR_MODIFIER * DAY_MODIFIER

    case 'w':
      return result * MINUTE_MODIFIER * HOUR_MODIFIER * DAY_MODIFIER * WEEK_MODIFIER

    default:
      return result
  }
}

export function getExpectedLengthForPeriod(period, from, to) {
  const f = new Date(from).valueOf()
  const t = new Date(to).valueOf()

  const difference = t - f

  return Math.ceil(difference / periodToMilliSeconds(period))
}
