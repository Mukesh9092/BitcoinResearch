const MINUTE_MODIFIER: number = 60
const HOUR_MODIFIER: number = 60
const DAY_MODIFIER: number = 24
const WEEK_MODIFIER: number = 7
const MILLISECOND_MODIFIER: number = 1000

export function periodToMilliSeconds (period: string): number {
  const [_, amount, timeframe] = period.match(/(\d+)([wdhm])/)

  const result: number = Number(amount) * MILLISECOND_MODIFIER

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

export function getExpectedLengthForPeriod (period: string, from: string, to: string): number {
  const f: number = new Date(from).valueOf()
  const t: number = new Date(to).valueOf()

  const difference: number = t - f

  return Math.ceil(difference / periodToMilliSeconds(period))
}
