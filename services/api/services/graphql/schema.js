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
    marketKey: String!

    bids: [OrderBookEntry]
    asks: [OrderBookEntry]
  }

  type RootQuery {
    currencyPairs: [CurrencyPair]
    orderBook(marketKey: String!): OrderBook
  }
  
  type OrderBookModifyEvent {
    marketKey: String!
    mutationType: String!
    mutationSide: String!
    rate: String!
    amount: String!
  }

  type OrderBookRemoveEvent {
    marketKey: String!
    mutationType: String!
    mutationSide: String!
    rate: String!
    amount: String!
  }

  type OrderBookNewTradeEvent {
    marketKey: String!
    mutationType: String!
    mutationSide: String!
    rate: String!
    amount: String!
  }

  type RootSubscription {
    orderBookModify(marketKey: String!): OrderBookModifyEvent
    orderBookRemove(marketKey: String!): OrderBookRemoveEvent
    orderBookNewTrade(marketKey: String!): OrderBookNewTradeEvent
  }

  schema {
    query: RootQuery
    subscription: RootSubscription
  }
`

export default schema
