const { Kind } = require('graphql/language')
const { isArray, invokeMap } = require('lodash')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress } = require('graphql-server-express')

const user = require('../lib/models/user')
const { Article } = require('../lib/models/article')

const jsonResult = (a) => isArray(a) ? invokeMap(a, 'toJSON') : a.toJSON()

const schema = `
  scalar Date

  type Article {
    id: String!
    title: String!
    slug: String!
    body: String!
    created: Date!
    updated: Date!
    user: User!
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
    articles(offset: Int!, limit: Int!, token: String!): [Article]
    articleById(id: String!, token: String!): Article
    articleBySlug(slug: String!, token: String!): Article

    users(token: String!): [User]
    userById(id: String!, token: String!): User
    userByEmail(email: String!, token: String!): User
  }

  type RootMutation {
    loginWithEmailPassword(email: String!, password: String!): Session
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

const resolvers = {
  Article: {
    user: (root) => {
      return user.getUserById(root.userId)
    },
  },

  Date: {
    __serialize: (value) => {
      return value.getTime()
    },

    __parseValue: (value) => {
      return new Date(value)
    },

    __parseLiteral: (ast) => {
      if (ast.kind === Kind.INT) {
        return ast.value
      }
    },
  },

  RootQuery: {
    articles: (root, { offset, limit }) => {
      return Article
        .getArticles(offset, limit)
        .then(jsonResult)
    },

    articleById: (root, { id }) => {
      return Article.getArticleById(id)
        .then(jsonResult)
    },

    articleBySlug: (root, { slug }) => {
      return Article.getArticleBySlug(slug)
        .then(jsonResult)
    },

    users: () => {
      return user.getUsers()
    },

    userById: (root, { id }) => {
      return user.getUserById(id)
    },

    userByEmail: (root, { email }) => {
      return user.getUserByEmail(email)
    },
  },

  RootMutation: {
    // TODO: Remove.
    loginWithEmailPassword: (root, args) => {
      return null
    },
  },
}

function setupGraphQL(app) {
  app.all('/api/graphql', graphqlExpress({
    schema: makeExecutableSchema({
      typeDefs: schema,
      resolvers,
    })
  }))
}

module.exports = {
  setupGraphQL,
}
