import { User } from '../common/graphql/generated/service-api/apollo-client';

export interface Authentication {
  isAuthenticated: boolean
  userId: string
  user: null | User
}
