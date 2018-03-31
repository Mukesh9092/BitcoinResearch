import { getCurrencyPairs } from '../../common/database/repositories/currency-pair';
import { getHemeraClient } from '../../common/hemera/client';
import { readEvents } from '../../common/eventstore/client';

async function start() {
  try {
    const hemera = await getHemeraClient();

    const currencyPairs = await getCurrencyPairs();
    const currencyPairKeys = currencyPairs.map(
      currencyPair => currencyPair.key,
    );
    const orderBooks = currencyPairKeys.reduce((object, key) => {
      object[key] = {
        bids: [],
        asks: [],
      };
      return object;
    }, {});

    hemera.add({ topic: 'OrderBook', cmd: 'getOrderBook' }, async event => {
      console.log('GETORDERBOOK', event);

      return orderBooks[event.marketKey];
    });

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBook' },
      async event => {
        const { marketKey, asks, bids } = event.data;
        const orderBook = orderBooks[marketKey];

        orderBook.asks = asks;
        orderBook.bids = bids;

        return true;
      },
    );

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookModify' },
      async event => {
        try {
          const {
            marketKey,
            mutationType,
            mutationSide,
            rate,
            amount,
          } = event.data;

          const orderBook = orderBooks[marketKey];
          const side = orderBook[`${mutationSide}s`];

          side[rate] = amount;

          return true;
        } catch (error) {
          throw error;
        }
      },
    );

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookRemove' },
      async event => {
        try {
          const {
            marketKey,
            mutationType,
            mutationSide,
            rate,
            amount,
          } = event.data;

          const orderBook = orderBooks[marketKey];
          delete orderBook[`${mutationSide}s`][rate];

          return true;
        } catch (error) {
          throw error;
        }
      },
    );

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'newTrade' },
      async event => {
        const {
          marketKey,
          mutationType,
          mutationSide,
          rate,
          amount,
        } = event.data;

        const orderBook = orderBooks[marketKey];

        let side = 'asks';

        if (mutationSide === 'buy') {
          side = 'bids';
        }

        const oldValue = Number(orderBook[side][rate]);
        const newValue = oldValue - Number(amount);

        console.log(
          'OrderBook#newTrade',
          mutationType,
          mutationSide,
          side,
          rate,
          amount,
          oldValue,
          newValue,
        );

        orderBook[side][rate] = String(newValue);

        return true;
      },
    );
  } catch (error) {
    console.error(error);
  }
}

start();
