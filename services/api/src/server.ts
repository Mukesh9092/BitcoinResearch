import * as ccxt from 'ccxt'
import unhandledError from 'unhandled-error'

import createUserWithDashboard from '../common/domain/mutations/createUserWithDashboard'
import deleteManyDashboards from '../common/domain/mutations/deleteManyDashboards'
import deleteManyUsers from '../common/domain/mutations/deleteManyUsers'
import deleteManyMarkets from '../common/domain/mutations/deleteManyMarkets'
import getUserIds from '../common/domain/queries/getUserIds'

import expressServiceWithMiddleware from '../common/express/middleware/expressServiceWith'
import genericExpressService from '../common/express/middleware/genericExpressService'

import loggerMiddleware from '../common/express/middleware/logger'
import { getServerApolloClient } from '../common/apollo/client'

const { API_HOST, API_PORT } = process.env

const Exchange = ccxt.binance

async function ensureMarkets() {
  const apolloClient = getServerApolloClient()

  await apolloClient.mutate({ mutation: deleteManyMarkets })

  const exchange = new Exchange()
  const markets = await exchange.loadMarkets()

  console.log('markets', markets)

  return []
}

async function ensureInitialData() {
  const apolloClient = getServerApolloClient()

  const getUserIdsQueryResult = await apolloClient.query({ query: getUserIds })

  console.log('userIds', getUserIdsQueryResult)

  const users = []

  if (users.length) {
  }

  await apolloClient.mutate({ mutation: deleteManyDashboards })
  await apolloClient.mutate({ mutation: deleteManyUsers })

  const createUserWithDashboardResult = await apolloClient.mutate({
    mutation: createUserWithDashboard,
    variables: {
      name: 'admin',
    },
  })

  return createUserWithDashboardResult.data.createUser
}

expressServiceWithMiddleware(
  async (app) => {
    try {
      genericExpressService(app)
      loggerMiddleware(app)

      const markets = await ensureMarkets()

      console.log('Markets', markets)

      const user = await ensureInitialData()

      console.log('User', user)

      return app
    } catch (error) {
      console.error(error)
    }
  },
  String(API_HOST),
  Number(API_PORT),
)

unhandledError((error) => {
  console.error(error)
})


