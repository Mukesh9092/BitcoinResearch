import { GraphQLError, NetworkStatus } from 'apollo-client'

export interface IApolloMutationResult<T> {
  data: T
  errors?: GraphQLError[]
  called: boolean
  loading: boolean
  networkStatus: NetworkStatus
  stale: boolean
}
