import { pubsub } from '../../pubsub'

export const orderBookModify = {
  subscribe: () => {
    pubsub.asyncIterator('OrderBookEvents:orderBookModify')
  },
}

export const orderBookRemove = {
  subscribe: () => {
    pubsub.asyncIterator('OrderBookEvents:orderBookRemove')
  },
}

export const orderBookNewTrade = {
  subscribe: () => {
    pubsub.asyncIterator('OrderBookEvents:orderBookNewTrade')
  },
}
