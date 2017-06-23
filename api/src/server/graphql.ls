{ Kind }                   = require 'graphql/language'
{ is-array, invoke-map }   = require 'lodash'
{ make-executable-schema } = require 'graphql-tools'

{ get-database } = require '../lib/database'

user        = require './models/user'
{ Article } = require './models/article'
{ Comment } = require './models/comment'

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
    comments: [Comment]
    tags: [Tag]
  }

  type Comment {
    id: String!
    body: String!
    created: Date!
    updated: Date!
    user: User!
    article: Article!
  }

  type Tag {
    id: String!
    label: String!
    articles: [Article]
  }

  type User {
    id: String!
    email: String!
    username: String!
    articles: [Article]
    comments: [Comment]
  }

  type Session {
    token: String!
    ttl: Int!
  }

  # the schema allows the following query:
  type RootQuery {
    articles(offset: Int!, limit: Int!, token: String!): [Article]
    articlesByUser(username: String!, offset: Int!, limit: Int!, token: String!): [Article]
    articlesByTag(tag: String!, offset: Int!, limit: Int!, token: String!): [Article]
    articleById(id: String!, token: String!): Article
    articleBySlug(slug: String!, token: String!): Article

    tags(token: String!): [Tag]

    users(token: String!): [User]
    userById(id: String!, token: String!): User
    userByEmail(email: String!, token: String!): User
    userByUsername(username: String!, token: String!): User
  }

  type RootMutation {
    loginWithEmailPassword(email: String!, password: String!): Session
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: RootQuery
    mutation: RootMutation
  }
"""

export resolvers =
  Article:
    user: (root) ->
      user.get-user-by-id root.user-id

    tags: (root) ->
      # SELECT tags.label FROM articles_tags, tags WHERE articles_tags.tag_id = tags.id AND articles_tags.article_id = 0
      tag.get-tags-by-article-id root.article-id

    comments: (root) ->
      comment.get-comments-by-article-id root.article-id

  Comment:
    article: (root) ->
      article.get-article-by-id root.article-id

    user: (root) ->
      User.get-user-by-id root.user-id

  Date:
    __serialize: (value) ->
      value.getTime()

    __parse-value: (value) ->
      new Date value

    __parse-literal: (ast) ->
      if ast.kind is Kind.INT
        Number ast.value

  Tag:
    articles: (root) ->
      article.get-articles-by-tag root.id

  User:
    # TODO: Remove this. Not needed.
    articles: (root) -> []

    # TODO: Remove this. Not needed.
    comments: (root) -> []

  RootQuery:
    articles: (root, { offset, limit }) ->
      Article.get-articles offset, limit
        .then json-result

    articles-by-user: (root, { username, offset, limit }) ->
      Article.get-articles-by-username username, offset, limit
        .then json-result

    articles-by-tag: (root, { tag, offset, limit }) ->
      Article.get-articles-by-tag tag, offset, limit
        .then json-result

    article-by-id: (root, { id }) ->
      Article.get-article-by-id id
        .then json-result

    article-by-slug: (root, { slug }) ->
      Article.get-article-by-slug slug
        .then json-result

    tags: ->
      Tag.get-tags!
        .then json-result

    users: ->
      user.get-users!

    user-by-id: (root, { id }) ->
      user.get-user-by-id id

    user-by-email: (root, { email }) ->
      user.get-user-by-email email

    # TOOD: Remove.
    user-by-username: (root, { username }) ->

  RootMutation:
    # TODO: Remove.
    login-with-email-password: (root, args) ->
      null

export executable-schema = make-executable-schema do
  type-defs: schema
  resolvers: resolvers
