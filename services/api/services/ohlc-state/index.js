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

async function importMarket(key, size) {
  const market = ensureMarket(key)
  const now = new Date()
  const period = getPeriodForSize(size)
  const endTime = formatDateIntoMilliseconds(now)
  const startTime = endTime - period * getPeriodMultiplicatorForSize(size)
  const uri = `https://poloniex.com/public?command=returnChartData&currencyPair=${key}&start=${startTime}&end=${endTime}&period=${period}`

  log.debug({
    message: 'importMarket',
    key,
    size,
    now,
    period,
    startTime,
    endTime,
    uri,
  })

  const response = await fetch(uri)
  const result = await response.json()

  log.debug({ message: 'importMarket result', result })

  market[size] = market[size].concat(result)

  log.debug({ message: 'ImportMarket', key, size })
}

async function importUpdate(key, size) {
  const market = ensureMarket(key)
  const now = new Date()
  const period = getPeriodForSize(size)
  const endTime = formatDateIntoMilliseconds(now)
  const startTime = endTime - period * 2
  const uri = `https://poloniex.com/public?command=returnChartData&currencyPair=${key}&start=${startTime}&end=${endTime}&period=${period}`

  log.debug({
    message: 'importUpdate',
    key,
    size,
    now,
    period,
    startTime,
    endTime,
    uri,
  })

  const response = await fetch(uri)
  const result = await response.json()

  const marketAtSize = market[size]

  marketAtSize.pop()
  marketAtSize.push(result[0])
  marketAtSize.push(result[1])
}

async function startMarketImporter() {
  const marketKey = 'BTC_ETH'
  const size = '5m'

  await importMarket(marketKey, size)

  setInterval(importUpdate, getPeriodForSize(size) * 1000)
}

async function getOHLC(event) {
  log.debug({ message: 'getOHLC', event })

  const { marketKey, size, from, to } = event

  const market = ensureMarket(marketKey)

  const ohlc = market[size]

  const filteredOHLC = ohlc.filter(x => x.date >= from && x.date <= to)

  return filteredOHLC
}

async function start() {
  try {
    const hemera = await getHemeraClient()

    await startMarketImporter()

    hemera.add({ topic: 'OHLC', cmd: 'getOHLC' }, getOHLC)
  } catch (error) {
    log.error(error)
  }
}

start()
