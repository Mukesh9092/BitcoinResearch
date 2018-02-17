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

  type OrderBook {
    currencyPair: CurrencyPair
    asks: [OrderBookEntry]
    bids: [OrderBookEntry]
  }

  type OrderBookEntry {
    price: Float!
    amount: Int!
  }

  type Candlestick {
    id: Date!
    currencyAKey: String!
    currencyBKey: String!
    time: Date!
    period: Int!
    high: Float!
    low: Float!
    open: Float!
    close: Float!
    volume: Float!
    quoteVolume: Float!
    weightedAverage: Float!
  }

  type LoanOrders {
    offers: [LoanOrder]
    demands: [LoanOrder]
  }

  type LoanOrder {
    rate: Float!
    amount: Float!
    rangeMin: Int!
    rangeMax: Int!
  }

  type User {
    id: String!
    email: String!
    username: String!
  }

  type Session {
    token: String!
    ttl: Int!
    user: User!
  }

  type RootQuery {
    users: [User]
    userById(id: String!): User
    userByEmail(email: String!): User

    currencyPairs: [CurrencyPair]

    candlesticks(currencyAKey: String!, currencyBKey: String!, period: Int!, start: Date!, end: Date!): [Candlestick]
  }

  type RootMutation {
    loginWithEmailPassword(email: String!, password: String!): Session
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default schema;
