const schema = `
  scalar Date

  type Market {
    trader: String!
    base: String!
    quote: String!
    category: String!
    type: String!
  }

  type OrderBookEntry {
    rate: String!
    amount: String!
  }

  type OrderBook {
    key: String!

    bids: [OrderBookEntry]
    asks: [OrderBookEntry]
  }

  type OHLCV {
    time: Date!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Float!
  }

  type PointIndicator {
    time: Date!
    value: Float!
  }

  type LineIndicator {
    time: Date!
    value: Float!
  }

  type BandIndicator {
    time: Date!
    upper: Float!
    middle: Float!
    lower: Float!
  }

  union Indicator = PointIndicator | LineIndicator | BandIndicator

  type RootQuery {
    market: Market
    markets: [Market]
    orderBook(key: String!): OrderBook
    getOHLCV(key: String!, period: String!, from: Date!, to: Date!): [OHLCV]
    getIndicator(name: String, key: String!, period: String!, from: Date!, to: Date!): [Indicator]
  }

  type OrderBookModifyEvent {
    key: String!
    mutationType: String!
    mutationSide: String!
    rate: String!
    amount: String!
  }

  type OrderBookRemoveEvent {
    key: String!
    mutationType: String!
    mutationSide: String!
    rate: String!
    amount: String!
  }

  type OrderBookNewTradeEvent {
    key: String!
    mutationType: String!
    mutationSide: String!
    rate: String!
    amount: String!
  }

  type RootSubscription {
    orderBookModify(key: String!): OrderBookModifyEvent
    orderBookRemove(key: String!): OrderBookRemoveEvent
    orderBookNewTrade(key: String!): OrderBookNewTradeEvent
  }

  schema {
    query: RootQuery
    subscription: RootSubscription
  }
`

export default schema
