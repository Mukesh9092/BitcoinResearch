import Poloniex from 'poloniex-api-node';
import pThrottle from 'p-throttle';

import { getThrottledPromise } from '../promise';

export const client = new Poloniex();

export const throttle = getThrottledPromise();

export async function returnChartData(
  currencyAKey: string,
  currencyBKey: string,
  period: number,
  start: number,
  end: number,
) {
  const currencyPairKey = `${currencyAKey}_${currencyBKey}`;

  return throttle(() => {
    return client.returnChartData(currencyPairKey, period, start, end);
  });
}

export async function return24Volume() {
  return throttle(() => client.return24Volume());
}

export async function returnCurrencies() {
  return throttle(() => client.returnCurrencies());
}
