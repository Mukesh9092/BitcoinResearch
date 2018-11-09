import { GraphQLError, NetworkStatus } from 'apollo-client'

export interface IApolloQueryResult<T> {
  data: T
  errors?: GraphQLError[]
  loading: boolean
  networkStatus: NetworkStatus
  stale: boolean
}
