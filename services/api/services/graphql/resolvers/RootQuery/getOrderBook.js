import { act } from '../../../../common/hemera/client';

export default async function getOrderBook(obj, args, context, info) {
  try {
    const { marketKey } = args;

    const orderBook = await act({
      topic: 'OrderBook',
      cmd: 'getOrderBook',
      marketKey,
    });

    return {
      marketKey,

      bids: Object.keys(orderBook.bids).map(rate => {
        return {
          rate,
          amount: orderBook.bids[rate],
        };
      }),

      asks: Object.keys(orderBook.asks).map(rate => {
        return {
          rate,
          amount: orderBook.asks[rate],
        };
      }),
    };
  } catch (error) {
    throw error;
  }
}
