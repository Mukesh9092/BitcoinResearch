const schema = `
  scalar Date

  type Currency {
    id: Int!
    key: String!
    name: String!
    txFee:  String!
    minConf: Int!
    depositAddress: String
    disabled: Boolean!
    delisted: Boolean!
    frozen: Boolean!
  }

  type Candlestick {
    date: Date!
    high: Float!
    low: Float!
    open: Float!
    close: Float!
    volume: Float!
    quoteVolume: Float!
    weightedAverage: Float!
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

    candlesticks(currencyA: String!, currencyB: String!, period: Int!, start: String!, end: String!): [Candlestick]
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
