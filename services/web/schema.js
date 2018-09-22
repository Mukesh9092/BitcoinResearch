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
    timestamp: Date!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Float
  }

  type PointIndicator {
    timestamp: Date!
    value: Float!
  }

  type LineIndicator {
    timestamp: Date!
    value: Float!
  }

  type BandIndicator {
    timestamp: Date!
    upper: Float!
    middle: Float!
    lower: Float!
  }

  type RootQuery {
    market: Market
    markets: [Market]
    orderBook(key: String!): OrderBook
    getOHLCV(trader: String!, base: String!, quote: String!, period: String!, from: Date!, to: Date!): [OHLCV]
    getPointIndicator(trader: String!, name: String!, base: String!, quote: String!, period: String!, from: Date!, to: Date!): [PointIndicator]
    getLineIndicator(trader: String!, name: String!, base: String!, quote: String!, period: String!, from: Date!, to: Date!): [LineIndicator]
    getBandIndicator(trader: String!, name: String!, base: String!, quote: String!, period: String!, from: Date!, to: Date!): [BandIndicator]
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
