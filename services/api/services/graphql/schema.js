const schema = `
  scalar Date

  type CurrencyPair {
    id: String!
    key: String!
    currencyAKey: String!
    currencyAName: String!
    currencyATxFee:  String!
    currencyAMinConf: String!
    currencyBKey: String!
    currencyBName: String!
    currencyBTxFee:  String!
    currencyBMinConf: String!
    currencyA24HVolume: String!
    currencyB24HVolume: String!
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

  type OHLC {
    date: Int!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Float!
    quoteVolume: Float!
    weightedAverage: Float!
  }

  type RootQuery {
    currencyPairs: [CurrencyPair]
    orderBook(key: String!): OrderBook
    getOHLC(key: String!, size: String!, from: Date!, to: Date!): [OHLC]
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
