import { createUserWithDashboard } from '../common/domain/mutations/createUserWithDashboard'
import { deleteManyDashboards } from '../common/domain/mutations/deleteManyDashboards'
import { deleteManyUsers } from '../common/domain/mutations/deleteManyUsers'
import { getApolloClient } from '../common/apollo/client'

export async function ensureInitialData() {
  console.log('ensureInitialData')

  const apolloClient = getApolloClient()

  await apolloClient.mutate({ mutation: deleteManyDashboards })
  await apolloClient.mutate({ mutation: deleteManyUsers })

  const createUserWithDashboardResult = await apolloClient.mutate({
    mutation: createUserWithDashboard,
    variables: {
      name: 'admin',
    },
  })

  console.log('ensureInitialData createUserWithDashboardResult', createUserWithDashboardResult)
}
