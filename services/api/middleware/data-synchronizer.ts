import * as moment from 'moment';
import H from 'highland';
import Poloniex from 'poloniex-api-node';
import { Application } from 'express';

import { importCurrencyPairs } from '../common/database/repositories/currency-pair';
import { getInfluxClient } from '../common/influxdb/client';
import { insert } from '../common/influxdb/entities/order-book';
import { SanitizedOrderBookMessage } from '../common/types/order-book';

let inserted = 0;
setInterval(() => {
  console.log(`Inserted ${inserted} Order Book events.`);
  inserted = 0;
}, 1000);

function logUnknownMessage(message: object) {
  console.log(`Unknown: `, JSON.stringify(message));
}

export default async function dataSynchronizer(
  app: Application,
): Promise<void> {
  const poloniexClient = new Poloniex();
  const influxClient = await getInfluxClient();
  const currencyPairs = await importCurrencyPairs();

  for (let index = 0; index < currencyPairs.length; index++) {
    const element = currencyPairs[index];

    // console.log(`Subscribing to ${element.key}`);

    poloniexClient.subscribe(element.key);
  }

  poloniexClient.on('open', () => {
    console.log('Poloniex Websocket Open');
  });

  poloniexClient.on('close', (reason: any, details: any) => {
    console.log('Poloniex Websocket Closed');

    console.log('reason', reason);
    console.log('details', details);
  });

  poloniexClient.on('error', (error: Error) => {
    console.error(error);
  });

  // poloniexClient.on('message', (...args: any[]) => {
  //   console.log('MESSAGE', args);
  // });

  poloniexClient.on(
    'message',
    async (channelName: string, unsanitizedMessages: any[], seq: number) => {
      // console.log(`Messages: `, unsanitizedMessages.length);

      for (let index = 0; index < unsanitizedMessages.length; index++) {
        const message = unsanitizedMessages[index];

        if (message.type === 'orderBook') {
          const bidKeys = Object.keys(message.data.bids);

          const bidMessages = bidKeys.map(
            (key: string): SanitizedOrderBookMessage => {
              return {
                mutationType: 'modify',
                mutationSide: 'bid',
                rate: Number(key),
                amount: Number(message.data.bids[key]),
              };
            },
          );

          const askKeys = Object.keys(message.data.asks);

          const askMessages = askKeys.map(
            (key: string): SanitizedOrderBookMessage => {
              return {
                mutationType: 'modify',
                mutationSide: 'ask',
                rate: Number(key),
                amount: Number(message.data.asks[key]),
              };
            },
          );

          const allMessages = bidMessages.concat(askMessages);

          await insert(allMessages);

          inserted += allMessages.length;

          return;
        }

        if (
          message.type === 'orderBookModify' ||
          message.type === 'orderBookRemove'
        ) {
          // console.log(message);

          if (!(message.data.type === 'bid' || message.data.type === 'ask')) {
            logUnknownMessage(message);
            return;
          }

          await insert({
            mutationType: 'modify',
            mutationSide: message.data.type,
            rate: Number(message.data.rate),
            amount: Number(message.data.amount),
          });

          inserted += 1;

          return;
        }

        logUnknownMessage(message);
      }
    },
  );

  poloniexClient.openWebSocket({ version: 2 });
}
