import { ApolloClient, ApolloQueryResult } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

import { getServerApolloClient } from '../common/apollo/client'

import { getUserIds } from '../common/domain/queries/getUserIds'

import { createUserWithDashboard } from '../common/domain/mutations/createUserWithDashboard'
import { deleteManyDashboards } from '../common/domain/mutations/deleteManyDashboards'
import { deleteManyUsers } from '../common/domain/mutations/deleteManyUsers'

interface IUserId {
  id?: string
}

interface ICreateUserWithDashboardResult {
  createUser: {
    id: string;
    dashboard: {
      id: string;
    };
  }
}

export async function ensureInitialData (): Promise<void> {
  console.log('ensureInitialData')

  const apolloClient: ApolloClient<NormalizedCacheObject> = getServerApolloClient()

  const getUserIdsQueryResult: ApolloQueryResult<IUserId> = await apolloClient.query({ query: getUserIds })

  console.log('ensureInitialData userIds', getUserIdsQueryResult)

  const users: IUserId[] = []

  await apolloClient.mutate({ mutation: deleteManyDashboards })
  await apolloClient.mutate({ mutation: deleteManyUsers })

  const createUserWithDashboardResult: ApolloQueryResult<ICreateUserWithDashboardResult> = await apolloClient.mutate({
    mutation: createUserWithDashboard,
    variables: {
      name: 'admin',
    },
  })

  console.log('ensureInitialData createUserWithDashboardResult', createUserWithDashboardResult)
}
