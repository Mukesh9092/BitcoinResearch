import gql from 'graphql-tag'

export const getUserIdsAndDashboardIds: string = gql`
  query {
    users {
      id
      dashboard {
        id
      }
    }
  }
`
