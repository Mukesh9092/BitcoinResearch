import * as moment from 'moment';
import H from 'highland';
import Poloniex from 'poloniex-api-node';
import { Application } from 'express';

import { importCurrencyPairs } from '../common/database/repositories/currency-pair';
import { getInfluxClient } from '../common/influxdb/client';
import { insert } from '../common/influxdb/entities/order-book';
import {
  SanitizedOrderBookMessage,
  SanitizedOrderBookModifyMessage,
  SanitizedOrderBookNewTradeMessage,
  SanitizedOrderBookRemoveMessage,
  UnsanitizedOrderBookMessage,
  UnsanitizedOrderBookModifyMessage,
  UnsanitizedOrderBookNewTradeMessage,
  UnsanitizedOrderBookRemoveMessage,
  UnsanitizedOrderBookStateMessage,
} from '../common/types/order-book';

const INSERT_INTERVAL = 1000;
const INSERT_BATCH_SIZE = 1000;

let messages: (
  | SanitizedOrderBookModifyMessage
  | SanitizedOrderBookRemoveMessage
  | SanitizedOrderBookNewTradeMessage)[] = [];
setInterval(async () => {
  try {
    if (messages.length >= INSERT_BATCH_SIZE) {
      await insert(messages);
      console.log(`Inserted messages: ${messages.length}`);
      messages = [];
    }
  } catch (error) {
    console.log('error oh noes', error);
  }
}, INSERT_INTERVAL);

function logUnknownMessage(message: object) {
  console.log(`Unknown: `, JSON.stringify(message));
}

async function handleOrderBookStateMessage(
  message: UnsanitizedOrderBookStateMessage,
) {
  Object.keys(message.data.bids).forEach((key: string) => {
    messages.push({
      mutationType: 'modify',
      mutationSide: 'bid',
      rate: Number(key),
      amount: Number(message.data.bids[key]),
    });
  });

  Object.keys(message.data.asks).forEach((key: string) => {
    messages.push({
      mutationType: 'modify',
      mutationSide: 'ask',
      rate: Number(key),
      amount: Number(message.data.asks[key]),
    });
  });
}

async function handleOrderBookModifyMessage(
  message: UnsanitizedOrderBookModifyMessage,
) {
  messages.push({
    mutationType: 'modify',
    mutationSide: message.data.type,
    rate: Number(message.data.rate),
    amount: Number(message.data.amount),
  });
}

async function handleOrderBookRemoveMessage(
  message: UnsanitizedOrderBookRemoveMessage,
) {
  messages.push({
    mutationType: 'remove',
    mutationSide: message.data.type,
    rate: Number(message.data.rate),
    amount: Number(message.data.amount),
  });
}

async function handleNewTradeMessage(
  message: UnsanitizedOrderBookNewTradeMessage,
) {
  messages.push({
    mutationType: 'trade',
    mutationSide: message.data.type,
    tradeID: message.data.tradeID,
    rate: Number(message.data.rate),
    amount: Number(message.data.amount),
    total: Number(message.data.total),
    date: new Date(message.data.date),
  });
}

async function handleMessages(
  channelName: string,
  unsanitizedMessages: any[],
  seq: number,
) {
  // console.log(`Messages: `, unsanitizedMessages.length);

  for (let index = 0; index < unsanitizedMessages.length; index++) {
    const message = unsanitizedMessages[index];

    switch (message.type) {
      case 'orderBook':
        handleOrderBookStateMessage(
          message as UnsanitizedOrderBookStateMessage,
        );
        break;

      case 'orderBookModify':
        handleOrderBookModifyMessage(
          message as UnsanitizedOrderBookModifyMessage,
        );
        break;

      case 'orderBookRemove':
        handleOrderBookRemoveMessage(
          message as UnsanitizedOrderBookRemoveMessage,
        );
        break;

      case 'newTrade':
        handleNewTradeMessage(message as UnsanitizedOrderBookNewTradeMessage);
        break;

      default:
        logUnknownMessage(message);
        break;
    }
  }
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

  poloniexClient.on('message', handleMessages);

  poloniexClient.openWebSocket({ version: 2 });
}
