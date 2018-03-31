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
    getOrderBook(marketKey: String!): OrderBook
  }

  schema {
    query: RootQuery
  }
`;

export default schema;
