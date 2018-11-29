import gql from 'graphql-tag'

export const getUserWithDashboardByUserId = gql`
  query getUserWithDashboardById($userId: ID!) {
    user(where: { id: $userId }) {
      dashboard {
        id
      }
    }
  }
`
