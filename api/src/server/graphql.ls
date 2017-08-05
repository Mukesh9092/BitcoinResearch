{ Kind }                   = require 'graphql/language'
{ is-array, invoke-map }   = require 'lodash'
{ make-executable-schema } = require 'graphql-tools'

user        = require '../lib/models/user'
{ Article } = require '../lib/models/article'

export first-result = ([a]) -> a

export json-result = (a) ->
  if is-array a
    invoke-map a, 'toJSON'
  else
    a.to-JSON!

export schema = """
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
"""

export resolvers =
  Article:
    user: (root) ->
      user.get-user-by-id root.user-id

  Date:
    __serialize: (value) ->
      value.getTime()

    __parse-value: (value) ->
      new Date value

    __parse-literal: (ast) ->
      if ast.kind is Kind.INT
        Number ast.value

  RootQuery:
    articles: (root, { offset, limit }) ->
      Article.get-articles offset, limit
        .then json-result

    article-by-id: (root, { id }) ->
      Article.get-article-by-id id
        .then json-result

    article-by-slug: (root, { slug }) ->
      Article.get-article-by-slug slug
        .then json-result

    users: ->
      user.get-users!

    user-by-id: (root, { id }) ->
      user.get-user-by-id id

    user-by-email: (root, { email }) ->
      user.get-user-by-email email

  RootMutation:
    # TODO: Remove.
    login-with-email-password: (root, args) ->
      null

export executable-schema = make-executable-schema do
  type-defs: schema
  resolvers: resolvers
