import Article from '../../models/Article'
import Tag from '../../models/Tag'
import User from '../../models/User'

import jsonResult from '../helpers/jsonResult'

import fetch from 'node-fetch'

const {
  SESSIONS_HOST,
  SESSIONS_PORT,
  SESSIONS_APP,
} = process.env

const SESSIONS_URL = `${SESSIONS_HOST}:${SESSIONS_PORT}/${SESSIONS_APP}`

export default {
  articles(root, args) {
    const { offset, limit } = args

    log.debug('GraphQL.Resolvers.Query.articles', offset, limit)

    return Article.getArticles(offset, limit).then(jsonResult)
  },

  articlesByUser(root, args) {
    const { username, offset, limit } = args

    log.debug('GraphQL.Resolvers.Query.articlesByUser', username, offset, limit)

    return Article.getArticlesByUsername(username, offset, limit).then(
      jsonResult,
    )
  },

  articlesByTag(root, args) {
    const { tag, offset, limit } = args

    log.debug('GraphQL.Resolvers.Query.articlesByUser', tag, offset, limit)

    return Article.getArticlesByTag(tag, offset, limit).then(jsonResult)
  },

  articleById(root, args) {
    log.debug('GraphQL.Resolvers.Query.articlesById')

    return Article.getArticleById(args.id).then(jsonResult)
  },

  articleBySlug(root, args) {
    log.debug('GraphQL.Resolvers.Query.articleBySlug')

    return Article.getArticleBySlug(args.slug).then(jsonResult)
  },

  tags() {
    log.debug('GraphQL.Resolvers.Query.tags')

    return Tag.getTags().then(jsonResult)
  },

  users() {
    log.debug('GraphQL.Resolvers.Query.users')

    return User.getUsers().then(jsonResult)
  },

  userById(root, args) {
    log.debug('GraphQL.Resolvers.Query.userById')

    return User.getUserById(args.id).then(jsonResult)
  },

  userByEmail(root, args) {
    log.debug('GraphQL.Resolvers.Query.userByEmail')

    return User.getUserByEmail(args.email).then(jsonResult)
  },

  userByUsername(root, args) {
    log.debug('GraphQL.Resolvers.Query.userByUsername', root, args)

    return User.getUserByUsername(args.username).then(jsonResult)
  },

  sessionGet(root, args) {
    log.debug('GraphQL.Resolvers.Query.sessionGet', root, args)

    return fetch(`${SESSIONS_URL}/get/${args.token}`)
      .then((result) => {
        console.log('RESULT', result);

        return result
      })
  },

  sessionGetActive(root, args) {
    log.debug('GraphQL.Resolvers.Query.sessionGetActive', root, args)
    return null
  },

  sessionGetActivity(root, args) {
    log.debug('GraphQL.Resolvers.Query.sessionGetActivity', root, args)
    return null
  },

  sessionGetUser(root, args) {
    log.debug('GraphQL.Resolvers.Query.sessionGetUser', root, args)
    return null
  },
}
