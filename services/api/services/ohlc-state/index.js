import fetch from 'cross-fetch'

import { getHemeraClient } from '../../common/hemera/client'
import { log } from '../../common/log'

const markets = {}

const ensureMarket = key => {
  markets[key] = markets[key] || {
    '5m': [],
    '15m': [],
    '30m': [],
    '2h': [],
    '4h': [],
    '24h': [],
  }

  return markets[key]
}

const formatDateIntoMilliseconds = m => Math.ceil(m.valueOf() / 1000)

const getPeriodForSize = s =>
  ({
    '5m': 300,
    '15m': 900,
    '30m': 1800,
    '2h': 7200,
    '4h': 14400,
    '24h': 86400,
  }[s])

const getPeriodMultiplicatorForSize = s =>
  ({
    '5m': 72,
    '15m': 48,
    '30m': 48,
    '2h': 84,
    '4h': 42,
    '24h': 30,
  }[s])

const importMarket = async (key, size) => {
  const market = ensureMarket(key)
  const now = new Date()
  const period = getPeriodForSize(size)
  const end = formatDateIntoMilliseconds(now)
  const start = end - period * getPeriodMultiplicatorForSize(size)
  const uri = `https://poloniex.com/public?command=returnChartData&currencyPair=${key}&start=${start}&end=${end}&period=${period}`
  const result = await fetch(uri)
  const resultJSON = await result.json()

  market[size] = market[size].concat(resultJSON)

  log.debug({ market })
}

const importUpdate = async (key, size) => {
  const market = ensureMarket(key)
  const now = new Date()
  const period = getPeriodForSize(size)
  const end = formatDateIntoMilliseconds(now)
  const start = end - period * 2
  const uri = `https://poloniex.com/public?command=returnChartData&currencyPair=${key}&start=${start}&end=${end}&period=${period}`
  const result = await fetch(uri)
  const resultJSON = await result.json()

  const marketAtSize = market[size]

  marketAtSize[marketAtSize.length] = resultJSON[0]
  marketAtSize.push(resultJSON[1])

  log.debug({ key, size, market })
}

const start = async () => {
  try {
    const hemera = await getHemeraClient()

    const marketKey = 'BTC_ETH'
    const size = '5m'

    await importMarket(marketKey, size)

    const interval = setInterval(importUpdate, getPeriodForSize(size) * 1000)
  } catch (error) {
    console.error(error)
  }
}

start()
