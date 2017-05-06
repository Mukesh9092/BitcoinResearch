import _ from 'lodash'
import log from 'loglevel'
import passport from 'passport'
import { Kind } from 'graphql/language'

import Article from '../models/Article'
import Comment from '../models/Comment'
import Tag from '../models/Tag'
import User from '../models/User'

const firstResult = a => a[0]
const jsonResult = (a) => {
  return _.isArray(a) ? _.invokeMap(a, 'toJSON') : a.toJSON()
}

export default {
  Date: {
    __parseValue(value) {
      return new Date(value) // value from the client
    },

    __serialize(value) {
      return value.getTime() // value sent to the client
    },

    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return +ast.value
      }

      return null
    },
  },

  Article: {
    user(root, args, context) {
      return User.query()
        .where({ id: root.userId })
        .then(firstResult)
        .then(jsonResult)
    },

    tags(root, args, context) {
      return Article.query()
        .findById(root.id)
        .then(result => result.$relatedQuery('tags'))
        .then(jsonResult)
    },

    comments(root, args, context) {
      return Comment.query().where({ articleId: root.id }).then(jsonResult)
    },
  },

  Comment: {
    article(root, args, context) {
      return Article.query().findById(root.articleId).then(jsonResult)
    },

    user(root, args, context) {
      return User.query().findById(root.userId).then(jsonResult)
    },
  },

  Tag: {
    articles(root, args, context) {
      return Tag.query()
        .findById(root.id)
        .then(result => result.$relatedQuery('articles'))
        .then(jsonResult)
    },
  },

  User: {
    articles(root, args, context) {
      return Article.getArticlesByUserId(root.id)
    },

    comments(root, args, context) {
      return Comment.getCommentsByUserId(root.id)
    },
  },

  Query: {
    articles(root, args, context) {
      const { offset, limit } = args

      log.debug('GraphQL.Resolvers.Query.articles', offset, limit)

      return Article.getArticles(offset, limit).then(jsonResult)
    },

    articlesByUser(root, args, context) {
      const { username, offset, limit } = args

      log.debug('GraphQL.Resolvers.Query.articlesByUser', tag, offset, limit)

      return Article.getArticlesByUsername(username, offset, limit).then(
        jsonResult,
      )
    },

    articlesByTag(root, args, context) {
      const { tag, offset, limit } = args

      log.debug('GraphQL.Resolvers.Query.articlesByUser', tag, offset, limit)

      return Article.getArticlesByTag(tag, offset, limit).then(jsonResult)
    },

    articleById(root, args, context) {
      log.debug('GraphQL.Resolvers.Query.articlesById')

      return Article.getArticleById(args.id).then(jsonResult)
    },

    articleBySlug(root, args, context) {
      log.debug('GraphQL.Resolvers.Query.articleBySlug')

      return Article.getArticleBySlug(args.slug).then(jsonResult)
    },

    tags(root, args, context) {
      log.debug('GraphQL.Resolvers.Query.tags')

      return Tag.getTags().then(jsonResult)
    },

    users(root, args, context) {
      log.debug('GraphQL.Resolvers.Query.users')

      return User.getUsers().then(jsonResult)
    },

    userById(root, args, context) {
      log.debug('GraphQL.Resolvers.Query.userById')

      return User.getUserById(args.id).then(jsonResult)
    },

    userByEmail(root, args, context) {
      log.debug('GraphQL.Resolvers.Query.userByEmail')

      return User.getUserByEmail(args.email).then(jsonResult)
    },

    userByUsername(root, args, context) {
      log.debug('GraphQL.Resolvers.Query.userByUsername')

      return User.getUserByUsername(args.username).then(jsonResult)
    },
  },

  Mutation: {
    sessionWithEmail(root, args, context) {
      const { email, password } = args

      log.debug('GraphQL.Resolvers.Mutation.sessionWithEmail', email, password)

      passport.authenticate('local')

      // TODO: Hashing function?
      return User.query().where({ email, password })

      return false
    },
  },
}
