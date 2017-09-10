const schema = `
  scalar Date
  
  type Currency {
    id: Int!
    name: String!
    txFee:  String!
    minConf: Int!
    depositAddress: String
    disabled: Boolean!
    delisted: Boolean!
    frozen: Boolean!
  }

  type User {
    id: String!
    email: String!
  }

  type Session {
    token: String!
    ttl: Int!
  }

  type RootQuery {
    users: [User]
    userById(id: String!): User
    userByEmail(email: String!): User
    
    currencies: [Currency]
    currencyById(id: Int!): Currency
  }

  type RootMutation {
    loginWithEmailPassword(email: String!, password: String!): Session
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

module.exports = schema;
