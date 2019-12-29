import { useEffect, useState } from 'react'
import { useGetCurrentUserQuery, User } from '../common/graphql/generated/service-api/apollo-client'
import { useAuthentication } from './authentication'

export interface UseDashboardProps {
  userId: string
}

export interface UseDashboardState {
  loading: boolean
  user: null | User
  error: null | Error
}

export const useDashboard = ({ userId }: UseDashboardProps) => {
  const [state, setState] = useState<UseDashboardState>({
    loading: true,
    user: null,
    error: null,
  })

  const authentication = useAuthentication()

  const getCurrentUserQuery = useGetCurrentUserQuery()

  useEffect(() => {
  })
}
