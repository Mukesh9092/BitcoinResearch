import gql from 'graphql-tag'

export const deleteManyDashboards = gql`
  mutation deleteManyDashboards {
    deleteManyDashboards {
      count
    }
  }
`
