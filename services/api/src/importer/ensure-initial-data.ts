import dotenv from 'dotenv'
import { getApolloClient } from '../common/apollo/client'
import { createUserWithDashboard } from './mutations/createUserWithDashboard'
import { getUserIds } from './queries/getUserIds'

dotenv.config()

const { PRISMA_HOST, PRISMA_PORT } = process.env

export async function ensureInitialData() {
  console.log('ensureInitialData')

  const apolloClient = getApolloClient({
    uri: `http://${PRISMA_HOST}:${PRISMA_PORT}`,
  })

  const usersResult = await apolloClient.query({ query: getUserIds })
  const usersExist = usersResult?.data?.users?.length > 0

  if (usersExist) {
    // console.log('ensureInitialData users exist, removing charts')
    // await apolloClient.mutate({ mutation: deleteManyCharts })
    // console.log('ensureInitialData charts removed')
  } else {
    console.log('ensureInitialData creating new users')

    const createUserWithDashboardResult = await apolloClient.mutate({
      mutation: createUserWithDashboard,
      variables: {
        name: 'admin',
      },
    })

    console.log('ensureInitialData createUserWithDashboardResult', createUserWithDashboardResult)
  }

  console.log('ensureInitialData done')
}
