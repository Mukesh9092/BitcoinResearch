import gql from 'graphql-tag'

export const deleteManyDashboards: string = gql`
  mutation deleteManyDashboards {
    deleteManyDashboards {
      count
    }
  }
`
