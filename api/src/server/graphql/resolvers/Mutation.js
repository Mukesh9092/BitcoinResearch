import util from 'util'

import log from 'loglevel'
import passport from 'passport'

import User from '../../models/User'

const {
  SESSIONS_HOST,
  SESSIONS_PORT,
  SESSIONS_APP,
} = process.env

const SESSIONS_URL = `${SESSIONS_HOST}:${SESSIONS_PORT}/${SESSIONS_APP}`

export default {
  sessionCreate(root, args) {
    log.debug('GraphQL.Resolvers.Mutation.sessionCreate')

    let url = `${SESSIONS_URL}/create/${args.userId}`
    let queryString = ''

    if (args.up) {
      queryString += `ip=${args.ip}`
    }

    if (args.ttl) {
      queryString += `&ttl=${args.ttl}`
    }

    if (queryString !== '') {
      url += `?${queryString}`
    }

    return fetch(url, { method: 'PUT' })
      .then((result) => {
        console.log('RESULT', result);

        return result
      })
  },

  sessionUpdate(root, args) {
    log.debug('GraphQL.Resolvers.Mutation.sessionUpdate')
    return null
  },

  sessionDestroy(root, args) {
    log.debug('GraphQL.Resolvers.Mutation.sessionDestroy')
    return null
  },

  sessionDestroyUser(root, args) {
    log.debug('GraphQL.Resolvers.Mutation.sessionDestroyUser')
    return null
  },

  sessionDestroyAll(root, args) {
    log.debug('GraphQL.Resolvers.Mutation.sessionDestroyAll')
    return null
  },
}
