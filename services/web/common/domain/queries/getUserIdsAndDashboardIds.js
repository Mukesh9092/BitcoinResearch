import gql from 'graphql-tag'

export const getUserIdsAndDashboardIds = gql`
  query {
    users {
      id
      dashboard {
        id
      }
    }
  }
`
