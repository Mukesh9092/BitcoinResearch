export function periodToMilliseconds(period) {
  const [_, amount, timeframe] = period.match(/(\d+)([wdhm])/)

  let result = amount * 1000

  if (timeframe === 'm') {
    result *= 60
  }

  if (timeframe === 'h') {
    result *= 60 * 60
  }

  if (timeframe === 'd') {
    result *= 60 * 60 * 24
  }

  if (timeframe === 'w') {
    result *= 60 * 60 * 24 * 7
  }

  return result
}

export function getExpectedLengthForPeriod(period, from, to) {
  const f = new Date(from).valueOf()
  const t = new Date(to).valueOf()

  const difference = t - f

  const result = difference / periodToMilliseconds(period)

  return result
}
