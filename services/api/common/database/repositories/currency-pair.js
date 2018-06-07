import { sortBy } from 'lodash'

import { getKnexClient } from '../../database/knex-client'
import { return24Volume, returnCurrencies } from '../../poloniex/client'

export function sanitize(volumes, currencies) {
  const volumeKeys = Object.keys(volumes)
    .filter((x) => {
      return !x.match(/^total/)
    })
    .sort()

  const currencyPairs = volumeKeys.map((key) => {
    const [currencyAKey, currencyBKey] = key.split('_')
    const currencyA = currencies[currencyAKey]
    const currencyB = currencies[currencyBKey]

    return {
      key,

      currencyAKey,
      currencyAName: currencyA.name,
      currencyATxFee: currencyA.txFee,
      currencyAMinConf: currencyA.minConf,

      currencyBKey,
      currencyBName: currencyB.name,
      currencyBTxFee: currencyB.txFee,
      currencyBMinConf: currencyB.minConf,

      currencyA24HVolume: volumes[key][currencyAKey],
      currencyB24HVolume: volumes[key][currencyBKey],
    }
  })

  const sortedCurrencyPairs = sortBy(currencyPairs, [
    'key',
    'volume24h.currencyAVolume',
  ])

  return sortedCurrencyPairs
}

export async function importCurrencyPairs() {
  try {
    const knexClient = getKnexClient()
    const volumes = await return24Volume()
    const currencies = await returnCurrencies()

    const currencyPairDocuments = sanitize(volumes, currencies)

    await knexClient('currency_pair')
      .where({})
      .delete()

    const result = await knexClient('currency_pair')
      .insert(currencyPairDocuments)
      .returning('*')

    return result
  } catch (error) {
    throw error
  }
}

export async function getCurrencyPairs() {
  try {
    const knexClient = getKnexClient()

    const result = await knexClient('currency_pair').where({})

    return result
  } catch (error) {
    throw error
  }
}
