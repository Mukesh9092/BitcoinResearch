import Poloniex from 'poloniex-api-node';

import { act } from '../../common/hemera/client';
import { importCurrencyPairs } from '../../common/database/repositories/currency-pair';

async function writeMessage(streamName, eventType, data) {
  try {
    const result = await act({
      pubsub$: true,
      topic: 'OrderBookEvents',
      cmd: eventType,
      data: data,
    });

    return result;
  } catch (error) {
    throw error;
  }
}

async function orderBook(streamName, marketKey, message) {
  await writeMessage(streamName, message.type, {
    marketKey,
    bids: message.data.bids,
    asks: message.data.asks,
  });
}

async function orderBookModify(streamName, marketKey, message) {
  await writeMessage(streamName, message.type, {
    marketKey,
    mutationType: 'modify',
    mutationSide: message.data.type,
    rate: message.data.rate,
    amount: message.data.amount,
  });
}

async function orderBookRemove(streamName, marketKey, message) {
  await writeMessage(streamName, message.type, {
    marketKey,
    mutationType: 'remove',
    mutationSide: message.data.type,
    rate: message.data.rate,
    amount: message.data.amount,
  });
}

async function newTrade(streamName, marketKey, message) {
  await writeMessage(streamName, message.type, {
    marketKey,
    mutationType: 'trade',
    mutationSide: message.data.type,
    tradeID: message.data.tradeID,
    rate: message.data.rate,
    amount: message.data.amount,
    total: message.data.total,
    date: message.data.date,
  });
}

const handlers = {
  orderBook,
  orderBookModify,
  orderBookRemove,
  newTrade,
};

async function handleMessages(marketKey, unsanitizedMessages, seq) {
  try {
    for (let index = 0; index < unsanitizedMessages.length; index++) {
      const message = unsanitizedMessages[index];

      const streamName = `OrderBook_${marketKey}`;

      const handler = handlers[message.type];

      if (!handler) {
        return;
      }

      handler(streamName, marketKey, message);
    }
  } catch (error) {
    console.log(error.stack || error.message || error);
  }
}

async function handleOpen() {
  console.log('Poloniex Websocket Open');
}

async function handleClose(reason, details) {
  console.log('Poloniex Websocket Closed');

  console.log('reason', reason);
  console.log('details', details);
}

async function handleError(error) {
  console.error(error.stack || error.message || error);
}

async function start() {
  try {
    const poloniexClient = new Poloniex();
    const currencyPairs = await importCurrencyPairs();

    currencyPairs.forEach(({ key }) => poloniexClient.subscribe(key));

    poloniexClient.on('open', handleOpen);
    poloniexClient.on('close', handleClose);
    poloniexClient.on('error', handleError);
    poloniexClient.on('message', handleMessages);

    console.log('Opening Poloniex Websocket');
    poloniexClient.openWebSocket({ version: 2 });
  } catch (error) {
    throw error;
  }
}

start();
