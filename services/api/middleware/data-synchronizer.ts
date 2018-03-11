import * as moment from 'moment';
import Poloniex from 'poloniex-api-node';
import { Application } from 'express';

import { importCurrencyPairs } from '../common/database/repositories/currency-pair';
import { getInfluxClient } from '../common/influxdb/client';
import { insert } from '../common/influxdb/entities/order-book';

import {
  OrderBookMessage,
  UnsanitizedMessage,
  UnsanitizedOrderBookMessage,
  UnsanitizedOrderBookRemoveMessage,
  UnsanitizedOrderBookModifyMessage,
} from '../common/types/order-book';

function sanitizeOrderBookMessage(
  message: UnsanitizedOrderBookMessage,
): OrderBookMessage[] {
  const bids = Object.keys(message.data.bids).map((key): OrderBookMessage => {
    return {
      mutationType: 'modify',
      mutationSide: 'bid',
      rate: Number(key),
      amount: Number(message.data.bids[key]),
    };
  });

  const asks = Object.keys(message.data.asks).map((key): OrderBookMessage => {
    return {
      mutationType: 'modify',
      mutationSide: 'ask',
      rate: Number(key),
      amount: Number(message.data.asks[key]),
    };
  });

  return bids.concat(asks);
}

function sanitizeOrderBookModifyMessage(
  message: UnsanitizedOrderBookModifyMessage,
): OrderBookMessage {
  const { type, rate, amount } = message.data;

  if (!(type === 'bid' || type === 'ask')) {
    throw new Error(`Invalid message data type: '${type}'.`);
  }

  return {
    mutationType: 'modify',
    mutationSide: type,
    rate: Number(rate),
    amount: Number(amount),
  };
}

function sanitizeOrderBookRemoveMessage(
  message: UnsanitizedOrderBookRemoveMessage,
): OrderBookMessage {
  const { type, rate, amount } = message.data;

  if (!(type === 'bid' || type === 'ask')) {
    throw new Error(`Invalid message data type: '${type}'.`);
  }

  return {
    mutationType: 'remove',
    mutationSide: type,
    rate: Number(rate),
    amount: Number(amount),
  };
}

function sanitizeMessages(
  unsanitizedMessages: UnsanitizedMessage[],
): OrderBookMessage[] {
  return unsanitizedMessages.reduce(
    (memo: OrderBookMessage[], unsanitizedMessage: UnsanitizedMessage) => {
      let newMessages: OrderBookMessage[];

      switch (unsanitizedMessage.type) {
        case 'orderBook':
          newMessages = sanitizeOrderBookMessage(unsanitizedMessage);
          break;

        case 'orderBookModify':
          newMessages = [sanitizeOrderBookModifyMessage(unsanitizedMessage)];
          break;

        case 'orderBookRemove':
          newMessages = [sanitizeOrderBookRemoveMessage(unsanitizedMessage)];
          break;

        default:
          throw new Error(
            `Invalid message: '${JSON.stringify(unsanitizedMessage)}'.`,
          );
      }

      return memo.concat(newMessages);
    },
    [],
  );
}

export default async function dataSynchronizer(
  app: Application,
): Promise<void> {
  const poloniexClient = new Poloniex();
  const influxClient = await getInfluxClient();

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

  poloniexClient.on(
    'message',
    async (
      channelName: string,
      messages: UnsanitizedOrderBookMessage[],
      seq: number,
    ) => {
      const sanitizedMessages = sanitizeMessages(messages);

      await insert(sanitizedMessages);

      // console.log(sanitizedMessages);
    },
  );

  poloniexClient.subscribe('BTC_ETC');

  poloniexClient.openWebSocket({ version: 2 });
}
