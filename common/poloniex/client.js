import Poloniex from 'poloniex-api-node'

import { getThrottledPromise } from '../promise'

export const client = new Poloniex()

export const throttle = getThrottledPromise()

export async function returnChartData(
  currencyAKey,
  currencyBKey,
  period,
  start,
  end,
) {
  const currencyPairKey = `${currencyAKey}_${currencyBKey}`

  return throttle(() => {
    return client.returnChartData(currencyPairKey, period, start, end)
  })
}

export async function return24Volume() {
  return throttle(() => {
    return client.return24Volume()
  })
}

export async function returnCurrencies() {
  return throttle(() => {
    return client.returnCurrencies()
  })
}
