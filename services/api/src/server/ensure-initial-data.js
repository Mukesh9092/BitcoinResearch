import dotenv from 'dotenv'
import gql from 'graphql-tag'

import { debug } from '../common/log'
import { createUserWithDashboard } from '../common/domain/mutations/createUserWithDashboard'
import { deleteManyDashboards } from '../common/domain/mutations/deleteManyDashboards'
import { deleteManyUsers } from '../common/domain/mutations/deleteManyUsers'
import { getApolloClient } from '../common/apollo/client'

dotenv.config()

const { PRISMA_HOST, PRISMA_PORT } = process.env

export async function ensureInitialData() {
  console.log('ensureInitialData')

  const apolloClient = getApolloClient({
    uri: `http://${PRISMA_HOST}:${PRISMA_PORT}`
  })

  const usersExistQuery = (await apolloClient.query({
    query: gql`
      query {
        users {
          id
        }
      }
    `
  }))

  const usersExist = usersExistQuery?.data?.users?.length > 0

  if (usersExist) {
    console.log('ensureInitialData users exist, skipping')
    return
  }

  console.log('ensureInitialData creating new users')

  const createUserWithDashboardResult = await apolloClient.mutate({
    mutation: createUserWithDashboard,
    variables: {
      name: 'admin',
    },
  })

  debug('ensureInitialData createUserWithDashboardResult', createUserWithDashboardResult)
}
