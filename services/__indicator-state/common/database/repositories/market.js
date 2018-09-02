import ccxt from 'ccxt'

import { getKnexClient } from '../../database/knex-client'
import { log } from '../../log'

const Binance = ccxt.binance
const OneBroker = ccxt._1broker

export async function getMarket(where) {
  try {
    const knexClient = getKnexClient()

    const result = await knexClient('market').where(where)

    return result
  } catch (error) {
    throw error
  }
}

export async function getMarkets() {
  try {
    const knexClient = getKnexClient()

    const result = await knexClient('market').where({})

    return result
  } catch (error) {
    throw error
  }
}

export function sanitizeBinance(markets) {
  return Object.values(markets)
    .filter((m) => {
      return m.active
    })
    .map((m) => {
      return {
        trader: 'binance',
        base: m.base,
        quote: m.quote,
        category: 'CRYPTO',
        type: 'CFD',
      }
    })
}

export function sanitizeOneBroker(markets) {
  return Object.values(markets).map((m) => {
    return {
      trader: 'onebroker',
      base: m.base,
      quote: m.quote,
      category: m.info.category,
      type: m.info.type,
    }
  })
}

export async function importTrader(name, exchange, sanitizer) {
  try {
    log.debug('importTrader', name, exchange)

    const knexClient = getKnexClient()
    const markets = await exchange.loadMarkets()

    log.debug('importTrader markets', Object.keys(markets).length)

    const sanitizedMarkets = sanitizer(markets)

    log.debug('importTrader sanitizedMarkets.length', sanitizedMarkets.length)

    await knexClient('market').insert(sanitizedMarkets)
  } catch (error) {
    log.error(error)
  }
}

export async function importMarkets(apiKeys) {
  try {
    const knexClient = getKnexClient()

    await knexClient('market')
      .where({})
      .delete()

    await importTrader('binance', new Binance(), sanitizeBinance)
    await importTrader(
      'onebroker',
      new OneBroker({
        apiKey: apiKeys.onebroker.apiKey,
      }),
      sanitizeOneBroker,
    )

    const result = await getMarkets()

    return result
  } catch (error) {
    log.error(error)
  }
}
