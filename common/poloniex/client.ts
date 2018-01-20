import * as Poloniex from "poloniex-api-node";
import * as pThrottle from "p-throttle";

import { getThrottledPromise } from "../promise";

let client;

const throttle = pThrottle((fn: Function): Promise => fn(), 1, 10000);

export async function getClient() {
  try {
    // console.log("client");

    if (client) {
      // console.log("client cached");

      return client;
    }

    // console.log("client not cached");

    client = new Poloniex();

    // console.log("client new", client);

    return client;
  } catch (error) {
    throw error;
  }
}

export async function returnChartData(currencyAKey: string, currencyBKey: string, period: number, start: number, end: number) {
  const client = await getClient();

  const currencyPairKey = `${currencyAKey}_${currencyBKey}`;

  return throttle(() => {
    return client.returnChartData(currencyPairKey, period, start, end)
  });
}

export async function return24Volume() {
  const client = await getClient();

  return throttle(() => client.return24Volume());
}

export async function returnCurrencies() {
  const client = await getClient();

  return throttle(() => client.returnCurrencies());
}
