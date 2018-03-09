import { sortBy } from 'lodash';

import {
  SanitizedPoloniexCurrencyPair,
  UnsanitizedPoloniexCurrencies,
  UnsanitizedPoloniexVolumes,
} from '../../types/poloniex';
import { getKnexClient } from '../../database/knex-client';
import { return24Volume, returnCurrencies } from '../../poloniex/client';

export function sanitize(
  volumes: UnsanitizedPoloniexVolumes,
  currencies: UnsanitizedPoloniexCurrencies,
): SanitizedPoloniexCurrencyPair[] {
  const volumeKeys = Object.keys(volumes)
    .filter(x => !x.match(/^total/))
    .sort();

  const currencyPairs = volumeKeys.map(key => {
    const [currencyAKey, currencyBKey] = key.split('_');
    const currencyA = currencies[currencyAKey];
    const currencyB = currencies[currencyBKey];

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
    };
  });

  const sortedCurrencyPairs = sortBy(currencyPairs, [
    'key',
    'volume24h.currencyAVolume',
  ]);

  return sortedCurrencyPairs;
}

export async function importCurrencyPairs() {
  try {
    const knexClient = getKnexClient();
    const volumes = await return24Volume();
    const currencies = await returnCurrencies();

    const currencyPairDocuments = sanitize(volumes, currencies);

    await knexClient('currency_pair')
      .where({})
      .delete();

    console.log('documents', currencyPairDocuments);

    const result = await knexClient('currency_pair')
      .insert(currencyPairDocuments)
      .returning('*');

    console.log('##### RESULT', result.length);

    return result;
  } catch (error) {
    throw error;
  }
}
