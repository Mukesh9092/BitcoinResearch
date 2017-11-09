const schema = `
  scalar Date

  type Currency {
    id: String!
    key: String!
    name: String!
    txFee:  String!
    minConf: Int!
    depositAddress: String
    disabled: Boolean!
    delisted: Boolean!
    frozen: Boolean!
  }

  type OrderBook {
    currencyA: Currency!
    currencyB: Currency!
    asks: [OrderBookEntry]
    bids: [OrderBookEntry]
  }

  type OrderBookEntry {
    price: Float!
    amount: Int!
  }

  type Candlestick {
    id: Int!
    currencyA: Currency!
    currencyB: Currency!
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

    currencies: [Currency]
    currencyById(id: Int!): Currency

    candlesticks(currencyA: String!, currencyB: String!, period: Int!, start: Date!, end: Date!): [Candlestick]
  }

  type RootMutation {
    loginWithEmailPassword(email: String!, password: String!): Session
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

module.exports = schema;
